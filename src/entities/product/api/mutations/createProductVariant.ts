import { Prisma } from '@/generated/prisma/client';
import { prisma } from '@/shared/api';

import { CreateProductVariantInput } from '../../model/schemas/mutations';
import { updateProductMinPrice } from './updateProductMinPrice';

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
