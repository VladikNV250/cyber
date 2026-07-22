import { ProductSortKey } from '@/entities/product';

export const SORT_LABELS: Record<ProductSortKey, string> = {
  rating_desc: 'By rating',
  price_asc: 'Price: Low to High',
  price_desc: 'Price: High to Low',
  newest: 'Newest first',
};

export const DEFAULT_SORTING: ProductSortKey = 'rating_desc';
