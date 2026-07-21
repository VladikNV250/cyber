import { CatalogFilters } from '@/entities/product';
import { FilterItem } from './types';

export function mapBrandToFilterItems(
  brand: CatalogFilters['brands'][number],
): FilterItem {
  return {
    id: brand.id,
    label: brand.name,
    count: brand._count.products,
  };
}
