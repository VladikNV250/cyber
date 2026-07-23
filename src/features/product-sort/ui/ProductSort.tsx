'use client';

import { useQueryState } from 'nuqs';

import { ProductSortKey } from '@/entities/product';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui';

import { productSortSearchParams } from '../config/searchParams';
import { DEFAULT_SORTING, SORT_LABELS } from '../config/sortLabels';

export function ProductSort() {
  const [sort, setSort] = useQueryState(
    'sort',
    productSortSearchParams.sort.withOptions({ shallow: false }),
  );

  return (
    <Select
      value={sort ?? DEFAULT_SORTING}
      onValueChange={(value) => setSort(value as ProductSortKey)}
    >
      <SelectTrigger className="w-[256px]">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        {Object.entries(SORT_LABELS).map(([sortingKey, label]) => (
          <SelectItem key={sortingKey} value={sortingKey}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
