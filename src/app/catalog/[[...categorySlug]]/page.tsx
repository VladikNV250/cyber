import { getProductFilters } from '@/entities/product/server';
import { AutoBreadcrumbs, Container } from '@/shared/ui';
import { CatalogFilters } from '@/widgets/catalog-filters';
import { CatalogGridSkeleton } from '@/widgets/catalog-grid';
import { SearchParams } from 'nuqs/server';
import { loadSearchParams } from './_lib/searchParams';
import { Suspense } from 'react';
import { CatalogGridFetcher } from './_ui/CatalogGridFetcher';

export default async function CatalogPage({
  params,
  searchParams,
}: {
  params: Promise<{ categorySlug?: string[] }>;
  searchParams: Promise<SearchParams>;
}) {
  const { categorySlug } = await params;
  const parsedSearchParams = await loadSearchParams(searchParams);
  const categoryId = categorySlug?.at(-1);

  const filters = await getProductFilters(categoryId);

  return (
    <div>
      <Container>
        <div className="flex flex-col py-10">
          <AutoBreadcrumbs />
        </div>
        <div className="flex gap-8 items-start pt-6 pb-8">
          <CatalogFilters key={categoryId} filters={filters} />

          <Suspense
            key={JSON.stringify(parsedSearchParams)}
            fallback={<CatalogGridSkeleton />}
          >
            <CatalogGridFetcher
              searchParams={parsedSearchParams}
              categoryId={categoryId}
            />
          </Suspense>
        </div>
      </Container>
    </div>
  );
}
