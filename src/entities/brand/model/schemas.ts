import { z } from 'zod';

export const brandSchema = z.object({
  id: z.uuid(),
  name: z.string().min(1, 'Name is required'),
});

export const createBrandSchema = brandSchema.pick({
  name: true,
});

export const updateBrandSchema = createBrandSchema.partial();

export type Brand = z.infer<typeof brandSchema>;
export type CreateBrandInput = z.infer<typeof createBrandSchema>;
export type UpdateBrandInput = z.infer<typeof updateBrandSchema>;
