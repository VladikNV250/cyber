import { productFilterSearchParams } from '@/features/product-filter';
import { productSortSearchParams } from '@/features/product-sort';
import { createLoader, parseAsInteger, createSerializer } from 'nuqs/server';

export const filterSearchParams = {
  page: parseAsInteger.withDefault(1),
  ...productFilterSearchParams,
  ...productSortSearchParams,
};

export const loadSearchParams = createLoader(filterSearchParams);
export const serializeSearchParams = createSerializer(filterSearchParams);
