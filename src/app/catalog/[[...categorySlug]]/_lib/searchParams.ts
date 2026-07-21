import { specsQuerySchema } from '@/features/product-filter';
import { PRODUCT_SORT_KEYS } from '@/entities/product';
import {
  createLoader,
  parseAsArrayOf,
  parseAsInteger,
  parseAsJson,
  parseAsString,
  parseAsStringLiteral,
} from 'nuqs/server';

export const filterSearchParams = {
  page: parseAsInteger.withDefault(1),
  minPrice: parseAsInteger,
  maxPrice: parseAsInteger,
  brandIds: parseAsArrayOf(parseAsString),
  sort: parseAsStringLiteral(PRODUCT_SORT_KEYS).withDefault('rating_desc'),
  specs: parseAsJson(specsQuerySchema).withDefault({}),
};

export const loadSearchParams = createLoader(filterSearchParams);
