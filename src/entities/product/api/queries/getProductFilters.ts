import { Prisma } from '@/generated/prisma/client';
import { prisma } from '@/shared/api';

import { catalogFiltersDataSchema } from '../../model/schemas/queries';

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

  return catalogFiltersDataSchema.parse({
    brands,
    priceRange: {
      min: priceAgg._min.price ? Number(priceAgg._min.price) : 0,
      max: priceAgg._max.price ? Number(priceAgg._max.price) : 10000,
    },
    specs,
  });
}
