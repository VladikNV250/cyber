import { mapToProductSummary } from '@/entities/product';
import { getProducts } from '@/entities/product/server';
import { CatalogGrid } from '@/widgets/catalog-grid';

import { DEFAULT_FILTERS } from '../_config/filters';
import { loadSearchParams } from '../_lib/searchParams';
import { serializeSearchParams } from '../_lib/searchParams';

export async function CatalogGridFetcher({
  searchParams,
  categoryId,
}: {
  searchParams: Awaited<ReturnType<typeof loadSearchParams>>;
  categoryId?: string;
}) {
  const { page, minPrice, maxPrice, brandIds, sort, specs } = searchParams;
  const data = await getProducts({
    ...DEFAULT_FILTERS,
    page,
    categoryId,
    brandIds: brandIds ?? undefined,
    minPrice: minPrice ?? undefined,
    maxPrice: maxPrice ?? undefined,
    sort: sort,
    specs: specs ?? undefined,
  });

  const buildPageUrl = (p: number) => {
    return '?' + serializeSearchParams({ ...searchParams, page: p });
  };

  return (
    <CatalogGrid
      products={data.products.map(mapToProductSummary)}
      metadata={data.metadata}
      buildPageUrl={buildPageUrl}
    />
  );
}
