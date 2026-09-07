import { Prisma } from '@/generated/prisma/client';
import { prisma } from '@/shared/api';

import { CreateProductInput } from '../../model/schemas/mutations';

export async function createProduct(data: CreateProductInput) {
  return prisma.product.create({
    data: {
      name: data.name,
      description: data.description,
      categoryId: data.categoryId,
      brandId: data.brandId,
      baseSpecs:
        data.baseSpecs === null
          ? Prisma.DbNull
          : (data.baseSpecs as Prisma.InputJsonValue | undefined),
      isActive: data.isActive,
    },
  });
}
