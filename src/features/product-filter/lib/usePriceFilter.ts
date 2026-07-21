import { CatalogFilters } from '@/entities/product';
import { useDebounceFn } from '@reactuses/core';
import { parseAsInteger, useQueryState } from 'nuqs';
import { useState } from 'react';

export function usePriceFilter(bounds: CatalogFilters['priceRange']) {
  const [localRange, setLocalRange] = useState(bounds);

  const [, setMinPrice] = useQueryState(
    'minPrice',
    parseAsInteger.withDefault(bounds.min).withOptions({ shallow: false }),
  );

  const [, setMaxPrice] = useQueryState(
    'maxPrice',
    parseAsInteger.withDefault(bounds.max).withOptions({ shallow: false }),
  );

  const { run: updateQueryRange } = useDebounceFn(
    (newRange: CatalogFilters['priceRange']) => {
      setMinPrice(newRange.min);
      setMaxPrice(newRange.max);
    },
    400,
  );

  const handleSliderChange = (value: [number, number]) => {
    const newRange = { min: value[0], max: value[1] };
    setLocalRange(newRange);
    updateQueryRange(newRange);
  };

  const handleMinInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalRange((prev) => {
      const newRange = { ...prev, min: Number(e.target.value) };
      updateQueryRange(newRange);
      return newRange;
    });
  };

  const handleMaxInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalRange((prev) => {
      const newRange = { ...prev, max: Number(e.target.value) };
      updateQueryRange(newRange);
      return newRange;
    });
  };

  return {
    localRange,
    handleSliderChange,
    handleMinInputChange,
    handleMaxInputChange,
  };
}
