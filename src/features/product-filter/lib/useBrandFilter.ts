import { parseAsArrayOf, parseAsString, useQueryState } from 'nuqs';

export function useBrandFilter() {
  const [brandIds, setBrandIds] = useQueryState(
    'brandIds',
    // TODO: create custom parser for uuid
    parseAsArrayOf(parseAsString)
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
