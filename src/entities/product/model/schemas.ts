import { z } from 'zod';

import { brandSchema } from '@/entities/brand';
import { categorySchema } from '@/entities/category';
import type { Prisma } from '@/generated/prisma/client';

const jsonLiteralSchema = z.union([
  z.string(),
  z.number(),
  z.boolean(),
  z.null(),
]);

export const jsonSchema: z.ZodType<Prisma.JsonValue> = z.lazy(() =>
  z.union([
    jsonLiteralSchema,
    z.array(jsonSchema),
    z.record(z.string(), jsonSchema) as unknown as z.ZodType<Prisma.JsonObject>,
  ]),
);

export const PRODUCT_SORT_KEYS = [
  'rating_desc',
  'price_asc',
  'price_desc',
  'newest',
] as const;
export type ProductSortKey = (typeof PRODUCT_SORT_KEYS)[number];

export const productListQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(12),
  categoryId: z.uuid().optional(),
  brandIds: z
    .union([z.uuid(), z.array(z.uuid())])
    .transform((val) => (Array.isArray(val) ? val : [val]))
    .optional(),
  minPrice: z.coerce.number().min(0).optional(),
  maxPrice: z.coerce.number().min(0).optional(),
  sort: z.enum(PRODUCT_SORT_KEYS).default('rating_desc'),
  includeHidden: z.coerce.boolean().default(false),
  // We can pass dynamic specs as a JSON string or dot-notation, for simplicity let's assume a JSON string of { key: [values] }
  specs: z
    .string()
    .optional()
    .transform((val, ctx) => {
      if (!val) return undefined;
      try {
        return JSON.parse(val) as Record<string, string[]>;
      } catch {
        ctx.addIssue({ code: 'custom', message: 'Invalid specs JSON' });
        return undefined;
      }
    }),
});

export type ProductListQuery = z.infer<typeof productListQuerySchema>;

export const productSchema = z.object({
  id: z.uuid(),
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  categoryId: z.string().uuid('Invalid category ID'),
  brandId: z.uuid('Invalid brand ID'),
  baseSpecs: jsonSchema.nullable(),
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
  attributes: jsonSchema,
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

export type Product = z.infer<typeof productSchema>;
export type ProductVariant = z.infer<typeof productVariantSchema>;
export type CreateProductInput = z.infer<typeof createProductSchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;
export type CreateProductVariantInput = z.infer<
  typeof createProductVariantSchema
>;
export type UpdateProductVariantInput = z.infer<
  typeof updateProductVariantSchema
>;

export const catalogProductSchema = z.object({
  id: z.uuid(),
  name: z.string().min(2),
  minPrice: z.coerce.number().min(0),
});

export const catalogFiltersDataSchema = z.object({
  brands: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      _count: z.object({
        products: z.number(),
      }),
    }),
  ),
  priceRange: z.object({
    min: z.number(),
    max: z.number(),
  }),
  specs: z.array(
    z.object({
      name: z.string(),
      options: z.array(z.string()),
    }),
  ),
});

export type CatalogProduct = z.infer<typeof catalogProductSchema>;
export type CatalogFilters = z.infer<typeof catalogFiltersDataSchema>;

export const productDetailsSchema = productSchema.extend({
  availableOptions: z.record(z.string(), z.array(z.string())),
  category: categorySchema,
  brand: brandSchema,
  variants: z.array(productVariantSchema),
});

export type ProductDetails = z.infer<typeof productDetailsSchema>;
