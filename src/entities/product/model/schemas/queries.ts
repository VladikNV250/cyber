import { z } from 'zod';

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
  includeHidden: z.union([z.boolean(), z.stringbool()]).default(false),
  // We can pass dynamic specs as a JSON string or dot-notation, for simplicity let's assume a JSON string of { key: [values] }
  specs: z
    .string()
    .optional()
    .transform((val, ctx) => {
      if (!val) return undefined;
      try {
        const parsed = z
          .record(z.string(), z.array(z.string()))
          .safeParse(JSON.parse(val));
        if (!parsed.success) {
          ctx.addIssue({ code: 'custom', message: 'Invalid specs shape' });
          return undefined;
        }
        return parsed.data;
      } catch {
        ctx.addIssue({ code: 'custom', message: 'Invalid specs JSON' });
        return undefined;
      }
    }),
});

export type ProductListQuery = z.infer<typeof productListQuerySchema>;

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

export type CatalogFilters = z.infer<typeof catalogFiltersDataSchema>;
