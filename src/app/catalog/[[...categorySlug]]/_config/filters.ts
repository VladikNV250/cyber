import { ProductListQuery } from '@/entities/product';

export const DEFAULT_FILTERS: ProductListQuery = {
  page: 1,
  limit: 9,
  sort: 'rating_desc',
  includeHidden: false,
  specs: undefined,
};
