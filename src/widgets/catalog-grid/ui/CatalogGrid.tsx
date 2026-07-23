import { CatalogProduct, ProductCard } from '@/entities/product';
import { PaginationMeta } from '@/shared/model';

import { CatalogGridEmpty } from './CatalogGridEmpty';
import { CatalogGridHeader } from './CatalogGridHeader';
import { CatalogPagination } from './CatalogPagination';

interface Props {
  products: CatalogProduct[];
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-6 mb-10">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              name={product.name}
              price={product.minPrice}
            />
          ))}
        </div>
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
