import { Prisma } from '@/generated/prisma/client';
import { prisma } from '@/shared/api';

import { UpdateProductInput } from '../../model/schemas/mutations';

export async function updateProduct(id: string, data: UpdateProductInput) {
  return prisma.product.update({
    where: { id },
    data: {
      ...data,
      baseSpecs: (data.baseSpecs ?? undefined) as
        | Prisma.InputJsonValue
        | undefined,
    },
  });
}
