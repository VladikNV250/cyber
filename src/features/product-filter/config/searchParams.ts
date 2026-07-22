import {
  parseAsArrayOf,
  parseAsInteger,
  parseAsJson,
  parseAsString,
} from 'nuqs/server';
import { specsQuerySchema } from '../model/schema';

export const productFilterSearchParams = {
  minPrice: parseAsInteger,
  maxPrice: parseAsInteger,
  // TODO: create custom parser for uuid
  brandIds: parseAsArrayOf(parseAsString),
  specs: parseAsJson(specsQuerySchema).withDefault({}),
};
