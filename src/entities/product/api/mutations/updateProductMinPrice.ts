import { Prisma } from '@/generated/prisma/client';

export async function updateProductMinPrice(
  productId: string,
  tx: Prisma.TransactionClient,
) {
  await tx.$executeRaw`SELECT id FROM "Product" WHERE id = ${productId} FOR UPDATE`;

  const minPriceAgg = await tx.productVariant.aggregate({
    where: { productId },
    _min: { price: true },
  });

  const minPrice = minPriceAgg._min.price ?? 0;

  await tx.product.update({
    where: { id: productId },
    data: { minPrice },
  });
}
