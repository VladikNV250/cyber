import { prisma } from '@/shared/api';
import { CreateBrandInput, UpdateBrandInput } from '../model/schemas';

export async function getBrands() {
  return prisma.brand.findMany({
    orderBy: { name: 'asc' },
  });
}

export async function createBrand(data: CreateBrandInput) {
  return prisma.brand.create({
    data: {
      name: data.name,
    },
  });
}

export async function updateBrand(id: string, data: UpdateBrandInput) {
  return prisma.brand.update({
    where: { id },
    data,
  });
}

export async function deleteBrand(id: string) {
  return prisma.brand.delete({
    where: { id },
  });
}
