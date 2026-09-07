import { Prisma } from '@/generated/prisma/client';
import { prisma } from '@/shared/api';

import { productWithRelationsSchema } from '../../model/schemas/details';
import { ProductListQuery } from '../../model/schemas/queries';
import { ProductResult } from './getRelatedProducts';

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
      .filter(
        (p): p is (typeof unsortedProducts)[0] => p !== undefined,
      ) as ProductResult[];
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

  return { products: products as ProductResult[], total };
}

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
    products: products.map((p) => productWithRelationsSchema.parse(p)),
    metadata: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
}
