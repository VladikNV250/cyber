import { z } from 'zod';

import { prisma } from '@/shared/api';

import {
  CreateCategoryInput,
  UpdateCategoryInput,
  categorySchema,
  categoryWithRelationsSchema,
} from '../model/schemas';

export async function getCategories() {
  const categories = await prisma.category.findMany({
    include: {
      children: true,
      parent: true,
    },
  });
  return z.array(categoryWithRelationsSchema).parse(categories);
}

export async function createCategory(data: CreateCategoryInput) {
  const category = await prisma.category.create({
    data: {
      name: data.name,
      parentId: data.parentId || null,
    },
  });
  return categorySchema.parse(category);
}

export async function updateCategory(id: string, data: UpdateCategoryInput) {
  const category = await prisma.category.update({
    where: { id },
    data,
  });
  return categorySchema.parse(category);
}

export async function deleteCategory(id: string) {
  const category = await prisma.category.delete({
    where: { id },
  });
  return categorySchema.parse(category);
}
