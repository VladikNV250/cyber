import { z } from 'zod';

export const productSchema = z.object({
  id: z.uuid(),
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  categoryId: z.uuid('Invalid category ID'),
  brandId: z.uuid('Invalid brand ID'),
  baseSpecs: z.record(z.string(), z.string()).nullable(),
  isActive: z.boolean(),
  minPrice: z.coerce.number(),
  averageRating: z.coerce.number(),
  reviewCount: z.coerce.number(),
  createdAt: z.union([z.string(), z.date()]),
  updatedAt: z.union([z.string(), z.date()]),
});

export const productVariantSchema = z.object({
  id: z.uuid(),
  productId: z.uuid(),
  sku: z.string().min(1, 'SKU is required'),
  price: z.coerce.number().min(0, 'Price must be positive'),
  stock: z.coerce.number().int().min(0, 'Stock must be non-negative'),
  attributes: z.record(z.string(), z.string()).default({}),
  images: z.array(z.string()),
  allowedShipping: z.array(
    z.enum([
      'STORE_PICKUP',
      'NOVA_POST_COURIER',
      'NOVA_POST',
      'MEEST',
      'UKRPOSHTA',
      'NOVA_POST_POSTOMAT',
    ]),
  ),
});

export const productSummarySchema = z.object({
  id: z.uuid(),
  name: productSchema.shape.name,
  price: z.coerce.number().min(0),
  imageUrl: z.string().optional(),
});

export type Product = z.infer<typeof productSchema>;
export type ProductVariant = z.infer<typeof productVariantSchema>;
export type ProductSummary = z.infer<typeof productSummarySchema>;
