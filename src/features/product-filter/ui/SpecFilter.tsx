'use client';
import { CatalogFilters } from '@/entities/product';

import { useSpecFilter } from '../lib/useSpecFilter';
import { mapSpecToFilterItems } from '../model/mapSpecToFilterItems';
import { FilterCheckboxList } from './FilterCheckboxList';

interface Props {
  spec: CatalogFilters['specs'][number];
}

export function SpecFilter({ spec }: Props) {
  const { selectedIds, toggleSpecOption } = useSpecFilter(spec.name);

  return (
    <FilterCheckboxList
      key={spec.name}
      items={mapSpecToFilterItems(spec)}
      selectedIds={selectedIds}
      onToggle={(specOption, checked) =>
        toggleSpecOption(specOption, Boolean(checked))
      }
    />
  );
}
