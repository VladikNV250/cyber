import { z } from 'zod';

import { prisma } from '@/shared/api';

import {
  CreateBrandInput,
  UpdateBrandInput,
  brandSchema,
} from '../model/schemas';

export async function getBrands() {
  const brands = await prisma.brand.findMany({
    orderBy: { name: 'asc' },
  });
  return z.array(brandSchema).parse(brands);
}

export async function createBrand(data: CreateBrandInput) {
  const brand = await prisma.brand.create({
    data: {
      name: data.name,
    },
  });
  return brandSchema.parse(brand);
}

export async function updateBrand(id: string, data: UpdateBrandInput) {
  const brand = await prisma.brand.update({
    where: { id },
    data,
  });
  return brandSchema.parse(brand);
}

export async function deleteBrand(id: string) {
  const brand = await prisma.brand.delete({
    where: { id },
  });
  return brandSchema.parse(brand);
}
