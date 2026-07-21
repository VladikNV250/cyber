import { CatalogFilters } from '@/entities/product';
import { FilterItem } from './types';

export function mapSpecToFilterItems(
  spec: CatalogFilters['specs'][number],
): FilterItem[] {
  return spec.options.map((option) => ({
    id: option,
    label: option,
  }));
}
