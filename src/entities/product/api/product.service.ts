import { Prisma } from '@/generated/prisma/client';
import { prisma } from '@/shared/lib';
import {
  ProductListQuery,
  CreateProductInput,
  UpdateProductInput,
  CreateProductVariantInput,
  UpdateProductVariantInput,
} from '../model/schemas';

export async function getProducts(query: ProductListQuery) {
  const { page, limit, categoryId, brandIds, minPrice, maxPrice, sort, specs } =
    query;

  const where: Prisma.ProductWhereInput = {};

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

  const offset = (page - 1) * limit;

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
          take: 1, // Get the first matching variant to show default price/image
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
  return prisma.product.delete({
    where: { id },
  });
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
  return prisma.$transaction(async (tx) => {
    const variant = await tx.productVariant.delete({
      where: { id },
    });
    await updateProductMinPrice(variant.productId, tx);
    return variant;
  });
}

async function updateProductMinPrice(
  productId: string,
  tx: Prisma.TransactionClient,
) {
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
