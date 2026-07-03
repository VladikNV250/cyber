import { prisma } from '@/shared/lib';
import { CreateCategoryInput, UpdateCategoryInput } from '../model/schemas';

export async function getCategories() {
  return prisma.category.findMany({
    include: {
      children: true,
      parent: true,
    },
  });
}

export async function createCategory(data: CreateCategoryInput) {
  return prisma.category.create({
    data: {
      name: data.name,
      parentId: data.parentId || null,
    },
  });
}

export async function updateCategory(id: string, data: UpdateCategoryInput) {
  return prisma.category.update({
    where: { id },
    data,
  });
}

export async function deleteCategory(id: string) {
  return prisma.category.delete({
    where: { id },
  });
}
