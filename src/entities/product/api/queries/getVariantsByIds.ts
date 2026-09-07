import { prisma } from '@/shared/api';

import {
  type ProductVariantWithProduct,
  productVariantWithProductSchema,
} from '../../model/schemas/details';

export async function getVariantsByIds(
  variantIds: string[],
): Promise<ProductVariantWithProduct[]> {
  if (!variantIds.length) return [];

  const variants = await prisma.productVariant.findMany({
    where: {
      id: { in: variantIds },
    },
    include: {
      product: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  return variants.map((v) => productVariantWithProductSchema.parse(v));
}
