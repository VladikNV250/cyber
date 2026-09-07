import { ProductCard, ProductSummary } from '@/entities/product';
import { BuyNowButton } from '@/features/cart-actions';
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
        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-6 mb-10`}
        >
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              imageUrl={product.imageUrl}
              actionSlot={
                <BuyNowButton
                  product={{
                    price: product.price,
                    name: product.name,
                    productId: product.id,
                    variantId: '',
                    imageUrl: undefined,
                    stock: 1,
                  }}
                />
              }
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
