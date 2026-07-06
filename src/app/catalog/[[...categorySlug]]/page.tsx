import { Container } from '@/shared/ui';
import { AutoBreadcrumbs } from '@/shared/ui';
import { CatalogFilters } from '@/widgets/catalog-filters';
import { CatalogGrid } from '@/widgets/catalog-grid';

export default function CatalogPage({
  params,
}: {
  params: { categorySlug?: string[] };
}) {
  console.log(params.categorySlug);
  return (
    <div className="py-10">
      <Container>
        <AutoBreadcrumbs />

        <div className="flex gap-8 items-start">
          <CatalogFilters />
          <CatalogGrid />
        </div>
      </Container>
    </div>
  );
}
