import { Prisma } from '@/generated/prisma/client';
import { prisma } from '@/shared/api';

import {
  CreateProductInput,
  CreateProductVariantInput,
  ProductListQuery,
  UpdateProductInput,
  UpdateProductVariantInput,
  productDetailsSchema,
} from '../model/schemas';

export type ProductResult = Prisma.ProductGetPayload<{
  include: {
    brand: true;
    category: true;
    variants: true;
  };
}>;

export async function getProducts(query: ProductListQuery) {
  const { page, limit, sort } = query;
  const offset = (page - 1) * limit;

  const { where, variantConditions } = buildPrismaWhereFilters(query);

  const isPriceSort = sort === 'price_asc' || sort === 'price_desc';

  // We use Raw SQL when sorting by price AND filtering by variants because
  // Prisma cannot currently sort parent models (Product) by an aggregated field
  // (MIN price) of a dynamically filtered relation (ProductVariant).
  // Without this, products would be sorted by their absolute global `minPrice`,
  // which might belong to a variant that is excluded by the user's current filters.
  const needsRawSql = isPriceSort && variantConditions.length > 0;

  // We fallback to standard Prisma query for all other cases (e.g., sorting
  // by rating, newest, or if there are no variant filters) because it is much
  // faster and simpler to rely on native table fields or the pre-calculated `Product.minPrice`.
  const { products, total } = needsRawSql
    ? await fetchProductsWithRawSql(query, variantConditions, limit, offset)
    : await fetchProductsWithPrisma(
        where,
        variantConditions,
        sort,
        limit,
        offset,
      );

  return {
    products,
    metadata: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
}

export async function getProductFilters(categoryId?: string) {
  const where: Prisma.ProductWhereInput = categoryId ? { categoryId } : {};

  const brands = await prisma.brand.findMany({
    where: {
      products: {
        some: where,
      },
    },
    select: {
      id: true,
      name: true,
      _count: {
        select: { products: { where } },
      },
    },
  });

  const priceAgg = await prisma.productVariant.aggregate({
    where: {
      product: where,
    },
    _min: { price: true },
    _max: { price: true },
  });

  const specs = await getCategoryDynamicSpecs(categoryId);

  return {
    brands,
    priceRange: {
      min: priceAgg._min.price ? Number(priceAgg._min.price) : 0,
      max: priceAgg._max.price ? Number(priceAgg._max.price) : 10000,
    },
    specs,
  };
}

// Doing complex JSON aggregations in Prisma is not directly supported,
// so we fetch raw SQL or just a subset. Since we agreed on 'static', we can run raw SQL.
async function getCategoryDynamicSpecs(categoryId?: string) {
  if (!categoryId) return [];

  const rawSpecs = await prisma.$queryRaw<
    Array<{ key: string; value: string }>
  >`
    SELECT
      key,
      value
    FROM "ProductVariant" pv
    JOIN "Product" p ON pv."productId" = p.id,
    jsonb_each_text(pv.attributes)
    WHERE p."categoryId" = ${categoryId}
    GROUP BY key, value
  `;

  const specsMap: Record<string, string[]> = {};
  rawSpecs.forEach(({ key, value }) => {
    if (!specsMap[key]) specsMap[key] = [];
    specsMap[key].push(value);
  });

  return Object.entries(specsMap).map(([key, values]) => ({
    name: key,
    options: values,
  }));
}

export async function createProduct(data: CreateProductInput) {
  return prisma.product.create({
    data: {
      name: data.name,
      description: data.description,
      categoryId: data.categoryId,
      brandId: data.brandId,
      baseSpecs: (data.baseSpecs || {}) as Prisma.InputJsonValue,
    },
  });
}

export async function updateProduct(id: string, data: UpdateProductInput) {
  return prisma.product.update({
    where: { id },
    data: {
      ...data,
      baseSpecs: (data.baseSpecs ?? undefined) as
        | Prisma.InputJsonValue
        | undefined,
    },
  });
}

export async function deleteProduct(id: string) {
  try {
    return await prisma.product.delete({
      where: { id },
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2003'
    ) {
      throw new Error(
        'This product appears in the order history and cannot be fully deleted. Please set it to inactive to archive it.',
      );
    }
    throw error;
  }
}

export async function createProductVariant(
  productId: string,
  data: CreateProductVariantInput,
) {
  return prisma.$transaction(async (tx) => {
    const variant = await tx.productVariant.create({
      data: {
        productId,
        sku: data.sku,
        price: data.price,
        stock: data.stock,
        attributes: data.attributes as Prisma.InputJsonValue,
        images: data.images,
        allowedShipping: data.allowedShipping,
      },
    });
    await updateProductMinPrice(productId, tx);
    return variant;
  });
}

export async function updateProductVariant(
  id: string,
  data: UpdateProductVariantInput,
) {
  return prisma.$transaction(async (tx) => {
    const variant = await tx.productVariant.update({
      where: { id },
      data: {
        ...data,
        attributes: (data.attributes ?? undefined) as
          | Prisma.InputJsonValue
          | undefined,
        images: data.images ?? undefined,
        allowedShipping: data.allowedShipping ?? undefined,
      },
    });
    await updateProductMinPrice(variant.productId, tx);
    return variant;
  });
}

export async function deleteProductVariant(id: string) {
  try {
    return await prisma.$transaction(async (tx) => {
      const variant = await tx.productVariant.delete({
        where: { id },
      });
      await updateProductMinPrice(variant.productId, tx);
      return variant;
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2003'
    ) {
      throw new Error(
        'This variant appears in the order history and cannot be deleted.',
      );
    }
    throw error;
  }
}

async function updateProductMinPrice(
  productId: string,
  tx: Prisma.TransactionClient,
) {
  await tx.$executeRaw`SELECT id FROM "Product" WHERE id = ${productId} FOR UPDATE`;

  const minPriceAgg = await tx.productVariant.aggregate({
    where: { productId },
    _min: { price: true },
  });

  const minPrice = minPriceAgg._min.price ?? 0;

  await tx.product.update({
    where: { id: productId },
    data: { minPrice },
  });
}

export async function getProductById(id: string) {
  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      brand: true,
      category: true,
      variants: true,
    },
  });

  if (!product) {
    return null;
  }

  const availableOptions: Record<string, string[]> = {};

  for (const variant of product.variants) {
    if (variant.attributes && typeof variant.attributes === 'object') {
      for (const [key, value] of Object.entries(
        variant.attributes as Record<string, unknown>,
      )) {
        if (!availableOptions[key]) {
          availableOptions[key] = [];
        }
        const strValue = String(value);
        if (!availableOptions[key].includes(strValue)) {
          availableOptions[key].push(strValue);
        }
      }
    }
  }

  const data = {
    ...product,
    availableOptions,
  };

  return productDetailsSchema.parse(data);
}

export async function getRelatedProducts(productId: string, limit: number = 4) {
  const safeLimit = Math.min(Math.max(1, limit), 20);
  // To ensure atomicity and performance, we use a single nested Prisma query.
  // This fetches the target product, navigates up to its Category, and then
  // fetches other active products within that same category (excluding the target itself).
  const productWithRelated = await prisma.product.findUnique({
    where: { id: productId },
    select: {
      category: {
        select: {
          products: {
            where: {
              id: { not: productId },
              isActive: true,
            },
            take: safeLimit,
            orderBy: { averageRating: 'desc' },
            include: {
              brand: true,
              category: true,
              variants: {
                take: 1,
                orderBy: { price: 'asc' },
              },
            },
          },
        },
      },
    },
  });

  return productWithRelated?.category?.products || [];
}

// Handle dynamic specs via JSON path on variants attributes or product baseSpecs
// Assuming 'specs' is { "memory": ["128GB", "256GB"], "color": ["Red"] }
// To be safe and simple, we check variant attributes
function buildSpecsFilter(
  specs?: Record<string, string[]>,
): Prisma.ProductVariantWhereInput[] {
  if (!specs || Object.keys(specs).length === 0) return [];

  const conditions: Prisma.ProductVariantWhereInput[] = [];
  for (const [key, values] of Object.entries(specs)) {
    if (values.length > 0) {
      conditions.push({
        OR: values.map((val) => ({
          attributes: {
            path: [key],
            equals: val,
          },
        })),
      });
    }
  }
  return conditions;
}

function buildPrismaWhereFilters(query: ProductListQuery) {
  const { categoryId, brandIds, minPrice, maxPrice, specs, includeHidden } =
    query;
  const where: Prisma.ProductWhereInput = {};

  if (!includeHidden) {
    where.isActive = true;
  }

  if (categoryId) {
    where.categoryId = categoryId;
  }

  if (brandIds && brandIds.length > 0) {
    where.brandId = { in: brandIds };
  }

  const variantConditions: Prisma.ProductVariantWhereInput[] = [];

  if (minPrice !== undefined) {
    variantConditions.push({ price: { gte: minPrice } });
  }
  if (maxPrice !== undefined) {
    variantConditions.push({ price: { lte: maxPrice } });
  }

  const specConditions = buildSpecsFilter(specs);
  if (specConditions.length > 0) {
    variantConditions.push(...specConditions);
  }

  if (variantConditions.length > 0) {
    where.variants = {
      some: {
        AND: variantConditions,
      },
    };
  }

  return { where, variantConditions };
}

async function fetchProductsWithRawSql(
  query: ProductListQuery,
  variantConditions: Prisma.ProductVariantWhereInput[],
  limit: number,
  offset: number,
): Promise<{ products: ProductResult[]; total: number }> {
  const {
    categoryId,
    brandIds,
    minPrice,
    maxPrice,
    sort,
    specs,
    includeHidden,
  } = query;
  const sqlConditions: Prisma.Sql[] = [];

  if (!includeHidden) {
    sqlConditions.push(Prisma.sql`p."isActive" = true`);
  }

  if (categoryId) {
    sqlConditions.push(Prisma.sql`p."categoryId" = ${categoryId}::uuid`);
  }

  if (brandIds && brandIds.length > 0) {
    const brandIdsSql = Prisma.join(
      brandIds.map((id) => Prisma.sql`${id}::uuid`),
    );
    sqlConditions.push(Prisma.sql`p."brandId" IN (${brandIdsSql})`);
  }

  if (minPrice !== undefined) {
    sqlConditions.push(Prisma.sql`pv."price" >= ${minPrice}`);
  }

  if (maxPrice !== undefined) {
    sqlConditions.push(Prisma.sql`pv."price" <= ${maxPrice}`);
  }

  if (specs && Object.keys(specs).length > 0) {
    for (const [key, values] of Object.entries(specs)) {
      if (values.length > 0) {
        sqlConditions.push(
          Prisma.sql`pv."attributes"->>${key} IN (${Prisma.join(values)})`,
        );
      }
    }
  }

  const whereClause =
    sqlConditions.length > 0
      ? Prisma.sql`WHERE ${Prisma.join(sqlConditions, ' AND ')}`
      : Prisma.empty;

  const orderBySql =
    sort === 'price_asc'
      ? Prisma.sql`ORDER BY MIN(pv."price") ASC`
      : Prisma.sql`ORDER BY MIN(pv."price") DESC`;

  const rawQuery = Prisma.sql`
    SELECT p."id"
    FROM "Product" p
    JOIN "ProductVariant" pv ON p."id" = pv."productId"
    ${whereClause}
    GROUP BY p."id"
    ${orderBySql}
    LIMIT ${limit} OFFSET ${offset}
  `;

  const countQuery = Prisma.sql`
    SELECT COUNT(DISTINCT p."id")::int as count
    FROM "Product" p
    JOIN "ProductVariant" pv ON p."id" = pv."productId"
    ${whereClause}
  `;

  const [idsResult, countResult] = await Promise.all([
    prisma.$queryRaw<{ id: string }[]>(rawQuery),
    prisma.$queryRaw<{ count: number }[]>(countQuery),
  ]);

  const orderedIds = idsResult.map((r) => r.id);
  const total = countResult[0] ? Number(countResult[0].count) : 0;

  let products: ProductResult[] = [];

  if (orderedIds.length > 0) {
    const unsortedProducts = await prisma.product.findMany({
      where: { id: { in: orderedIds } },
      include: {
        brand: true,
        category: true,
        variants: {
          take: 1,
          where: { AND: variantConditions },
          orderBy: { price: 'asc' },
        },
      },
    });

    const productsMap = new Map(unsortedProducts.map((p) => [p.id, p]));
    products = orderedIds
      .map((id) => productsMap.get(id))
      .filter((p): p is (typeof unsortedProducts)[0] => p !== undefined);
  }

  return { products, total };
}

async function fetchProductsWithPrisma(
  where: Prisma.ProductWhereInput,
  variantConditions: Prisma.ProductVariantWhereInput[],
  sort: string,
  limit: number,
  offset: number,
): Promise<{ products: ProductResult[]; total: number }> {
  let orderBy: Prisma.ProductOrderByWithRelationInput = {};
  switch (sort) {
    case 'price_asc':
      orderBy = { minPrice: 'asc' };
      break;
    case 'price_desc':
      orderBy = { minPrice: 'desc' };
      break;
    case 'newest':
      orderBy = { createdAt: 'desc' };
      break;
    case 'rating_desc':
    default:
      orderBy = { averageRating: 'desc' };
      break;
  }

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,
      skip: offset,
      take: limit,
      orderBy,
      include: {
        brand: true,
        category: true,
        variants: {
          take: 1,
          where:
            variantConditions.length > 0
              ? { AND: variantConditions }
              : undefined,
          orderBy: { price: 'asc' },
        },
      },
    }),
    prisma.product.count({ where }),
  ]);

  return { products, total };
}
