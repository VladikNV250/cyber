import { Prisma } from '@/generated/prisma/client';
import { prisma } from '@/shared/api';

import { updateProductMinPrice } from './updateProductMinPrice';

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
