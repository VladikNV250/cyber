import { createLoader, createSerializer, parseAsInteger } from 'nuqs/server';

import { productFilterSearchParams } from '@/features/product-filter';
import { productSortSearchParams } from '@/features/product-sort';

export const filterSearchParams = {
  page: parseAsInteger.withDefault(1),
  ...productFilterSearchParams,
  ...productSortSearchParams,
};

export const loadSearchParams = createLoader(filterSearchParams);
export const serializeSearchParams = createSerializer(filterSearchParams);
