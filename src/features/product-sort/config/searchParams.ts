import { parseAsStringLiteral } from 'nuqs/server';
import { PRODUCT_SORT_KEYS } from '@/entities/product';

export const productSortSearchParams = {
  sort: parseAsStringLiteral(PRODUCT_SORT_KEYS).withDefault('rating_desc'),
};
