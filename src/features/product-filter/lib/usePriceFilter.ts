import { useDebounceFn } from '@reactuses/core';
import { useQueryState } from 'nuqs';
import { useState } from 'react';

import { CatalogFilters } from '@/entities/product';

import { productFilterSearchParams } from '../config/searchParams';

export function usePriceFilter(bounds: CatalogFilters['priceRange']) {
  const [localRange, setLocalRange] = useState<{
    min: number | string;
    max: number | string;
  }>(bounds);

  const [, setMinPrice] = useQueryState(
    'minPrice',
    productFilterSearchParams.minPrice
      .withDefault(bounds.min)
      .withOptions({ shallow: false }),
  );

  const [, setMaxPrice] = useQueryState(
    'maxPrice',
    productFilterSearchParams.maxPrice
      .withDefault(bounds.max)
      .withOptions({ shallow: false }),
  );

  const validateAndClamp = (
    minVal: number | string,
    maxVal: number | string,
  ) => {
    let min = minVal === '' ? bounds.min : Number(minVal);
    let max = maxVal === '' ? bounds.max : Number(maxVal);

    if (isNaN(min)) min = bounds.min;
    if (isNaN(max)) max = bounds.max;

    min = Math.max(bounds.min, Math.min(bounds.max, min));
    max = Math.max(bounds.min, Math.min(bounds.max, max));

    if (min > max) {
      min = max;
    }

    return { min, max };
  };

  const { run: updateQueryRange } = useDebounceFn(
    (newRange: { min: number | string; max: number | string }) => {
      const { min, max } = validateAndClamp(newRange.min, newRange.max);
      setMinPrice(min);
      setMaxPrice(max);
    },
    400,
  );

  const handleSliderChange = (value: [number, number]) => {
    const newRange = { min: value[0], max: value[1] };
    setLocalRange(newRange);
    updateQueryRange(newRange);
  };

  const handleMinInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setLocalRange((prev) => {
      const newRange = { ...prev, min: val };
      updateQueryRange(newRange);
      return newRange;
    });
  };

  const handleMaxInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setLocalRange((prev) => {
      const newRange = { ...prev, max: val };
      updateQueryRange(newRange);
      return newRange;
    });
  };

  const handleBlur = () => {
    setLocalRange((prev) => {
      const { min, max } = validateAndClamp(prev.min, prev.max);
      const newRange = { min, max };
      setMinPrice(min);
      setMaxPrice(max);
      return newRange;
    });
  };

  const validSliderValue = validateAndClamp(localRange.min, localRange.max);

  return {
    localRange,
    sliderValue: [validSliderValue.min, validSliderValue.max] as [
      number,
      number,
    ],
    handleSliderChange,
    handleMinInputChange,
    handleMaxInputChange,
    handleBlur,
  };
}
