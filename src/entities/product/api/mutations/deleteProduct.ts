import { Prisma } from '@/generated/prisma/client';
import { prisma } from '@/shared/api';

export async function deleteProduct(id: string) {
  try {
    return await prisma.product.delete({
      where: { id },
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2003'
    ) {
      throw new Error(
        'This product appears in the order history and cannot be fully deleted. Please set it to inactive to archive it.',
      );
    }
    throw error;
  }
}
