import { Prisma } from '@/generated/prisma/client';
import { prisma } from '@/shared/api';

import { UpdateProductVariantInput } from '../../model/schemas/mutations';
import { updateProductMinPrice } from './updateProductMinPrice';

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
