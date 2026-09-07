import { z } from 'zod';

import { productSchema, productVariantSchema } from './core';

export const createProductSchema = productSchema
  .pick({
    name: true,
    description: true,
    categoryId: true,
    brandId: true,
    baseSpecs: true,
    isActive: true,
  })
  .partial({ baseSpecs: true, isActive: true });

export const updateProductSchema = createProductSchema.partial();

export const createProductVariantSchema = productVariantSchema
  .omit({
    id: true,
    productId: true,
  })
  .partial({ allowedShipping: true });

export const updateProductVariantSchema = createProductVariantSchema.partial();

export type CreateProductInput = z.infer<typeof createProductSchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;
export type CreateProductVariantInput = z.infer<
  typeof createProductVariantSchema
>;
export type UpdateProductVariantInput = z.infer<
  typeof updateProductVariantSchema
>;
