import { prisma } from '@/shared/api';

import {
  type ProductWithRelations,
  productWithRelationsSchema,
} from '../../model/schemas/details';

export async function getProductsByIds(
  productIds: string[],
): Promise<ProductWithRelations[]> {
  if (!productIds.length) return [];

  const products = await prisma.product.findMany({
    where: {
      id: { in: productIds },
    },
    include: {
      brand: true,
      category: true,
      variants: true,
    },
  });

  return products.map((p) => productWithRelationsSchema.parse(p));
}
