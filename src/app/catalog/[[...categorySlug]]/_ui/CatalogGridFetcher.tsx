import { getProducts } from '@/entities/product/server';
import { loadSearchParams } from '../_lib/searchParams';
import { DEFAULT_FILTERS } from '../_config/filters';
import { CatalogGrid } from '@/widgets/catalog-grid';
import { mapToCatalogProduct } from '@/entities/product';

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

  return (
    <CatalogGrid
      products={data.products.map(mapToCatalogProduct)}
      metadata={data.metadata}
    />
  );
}
