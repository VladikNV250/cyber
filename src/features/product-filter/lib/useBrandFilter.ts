'use client';
import { useQueryState } from 'nuqs';

import { productFilterSearchParams } from '../config/searchParams';

export function useBrandFilter() {
  const [brandIds, setBrandIds] = useQueryState(
    'brandIds',
    productFilterSearchParams.brandIds
      .withDefault([])
      .withOptions({ shallow: false }),
  );

  const toggleBrandId = (id: string, checked: boolean) => {
    const newBrands = checked
      ? [...brandIds, id]
      : brandIds.filter((brandId) => brandId !== id);

    setBrandIds(newBrands.length > 0 ? newBrands : null);
  };

  return {
    brandIds,
    toggleBrandId,
  };
}
