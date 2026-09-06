import { z } from 'zod';

export const categorySchema = z.object({
  id: z.uuid(),
  name: z.string().min(1, 'Name is required'),
  parentId: z.uuid().nullable(),
});

export const createCategorySchema = categorySchema
  .pick({
    name: true,
    parentId: true,
  })
  .partial({ parentId: true });

export const updateCategorySchema = createCategorySchema.partial();

export const categoryWithRelationsSchema = categorySchema.extend({
  children: z.array(categorySchema).optional(),
  parent: categorySchema.nullable().optional(),
});

export type Category = z.infer<typeof categorySchema>;
export type CategoryWithRelations = z.infer<typeof categoryWithRelationsSchema>;
export type CreateCategoryInput = z.infer<typeof createCategorySchema>;
export type UpdateCategoryInput = z.infer<typeof updateCategorySchema>;
