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
    <div>
      <Container>
        <div className="flex flex-col py-10">
          <AutoBreadcrumbs />
        </div>

        <div className="flex gap-8 items-start pt-6 pb-8">
          <CatalogFilters />
          <CatalogGrid />
        </div>
      </Container>
    </div>
  );
}
