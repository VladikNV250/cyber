'use client';
import { FilterCheckboxList } from './FilterCheckboxList';
import { CatalogFilters } from '@/entities/product';
import { mapBrandToFilterItems } from '../model/mapBrandToFilterItem';
import { useBrandFilter } from '../lib/useBrandFilter';

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
