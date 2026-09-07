import { z } from 'zod';

import { brandSchema } from '@/entities/brand';
import { categorySchema } from '@/entities/category';

import { productSchema, productVariantSchema } from './core';

export const productDetailsSchema = productSchema.extend({
  availableOptions: z.record(z.string(), z.array(z.string())),
  category: categorySchema,
  brand: brandSchema,
  variants: z.array(productVariantSchema),
});

export type ProductDetails = z.infer<typeof productDetailsSchema>;

export const productWithRelationsSchema = productSchema.extend({
  category: categorySchema.optional(),
  brand: brandSchema.optional(),
  variants: z.array(productVariantSchema),
});

export type ProductWithRelations = z.infer<typeof productWithRelationsSchema>;
