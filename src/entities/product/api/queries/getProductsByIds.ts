import { prisma } from '@/shared/api';

import { productSummarySchema } from '../../model/schemas/core';

export async function getProductsByIds(variantIds: string[]) {
  if (!variantIds.length) return [];

  const variants = await prisma.productVariant.findMany({
    where: {
      id: { in: variantIds },
    },
    include: {
      product: {
        select: {
          name: true,
        },
      },
    },
  });

  return variants.map((v) =>
    productSummarySchema.parse({
      id: v.productId,
      name: v.product.name,
      price: v.price,
      imageUrl: v.images[0] || undefined,
    }),
  );
}
