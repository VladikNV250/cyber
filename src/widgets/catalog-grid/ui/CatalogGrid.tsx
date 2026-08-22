import { ProductGrid, ProductSummary } from '@/entities/product';
import { PaginationMeta } from '@/shared/model';

import { CatalogGridEmpty } from './CatalogGridEmpty';
import { CatalogGridHeader } from './CatalogGridHeader';
import { CatalogPagination } from './CatalogPagination';

interface Props {
  products: ProductSummary[];
  metadata: PaginationMeta;
  buildPageUrl: (page: number) => string;
}

export function CatalogGrid({ products, metadata, buildPageUrl }: Props) {
  const { page, total, totalPages } = metadata;

  return (
    <div className="flex flex-col flex-1">
      <CatalogGridHeader total={total} />

      {products.length === 0 ? (
        <CatalogGridEmpty />
      ) : (
        <ProductGrid products={products} columns={3} className="mb-10" />
      )}

      {totalPages > 1 && (
        <CatalogPagination
          page={page}
          totalPages={totalPages}
          buildPageUrl={buildPageUrl}
        />
      )}
    </div>
  );
}
