'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui';
import { parseAsStringLiteral, useQueryState } from 'nuqs';
import { DEFAULT_SORTING, SORT_LABELS } from '../config/sortLabels';
import { PRODUCT_SORT_KEYS, ProductSortKey } from '@/entities/product';

export function ProductSort() {
  const [sort, setSort] = useQueryState(
    'sort',
    parseAsStringLiteral(PRODUCT_SORT_KEYS)
      .withDefault(DEFAULT_SORTING)
      .withOptions({ shallow: false }),
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
