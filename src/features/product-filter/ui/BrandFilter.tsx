'use client';
import { CatalogFilters } from '@/entities/product';

import { useBrandFilter } from '../lib/useBrandFilter';
import { mapBrandToFilterItems } from '../model/mapBrandToFilterItem';
import { FilterCheckboxList } from './FilterCheckboxList';

interface Props {
  brands: CatalogFilters['brands'];
}

export function BrandFilter({ brands }: Props) {
  const { brandIds, toggleBrandId } = useBrandFilter();

  return (
    <FilterCheckboxList
      items={brands.map((brand) => mapBrandToFilterItems(brand))}
      selectedIds={brandIds}
      onToggle={toggleBrandId}
    />
  );
}
