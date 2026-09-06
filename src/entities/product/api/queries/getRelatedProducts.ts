import type { Prisma } from '@/generated/prisma/client';
import { prisma } from '@/shared/api';

import { productWithRelationsSchema } from '../../model/schemas/details';

export type ProductResult = Prisma.ProductGetPayload<{
  include: {
    brand: true;
    category: true;
    variants: true;
  };
}>;

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

  const rawProducts = productWithRelated?.category?.products || [];
  return rawProducts.map((p) => productWithRelationsSchema.parse(p));
}
