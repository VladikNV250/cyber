import { ProductCard, mapToProductSummary } from '@/entities/product';
import { getRelatedProducts } from '@/entities/product/server';
import { BuyNowButton } from '@/features/cart-actions';
import { Container } from '@/shared/ui';

interface Props {
  productId: string;
}

export async function RelatedProducts({ productId }: Props) {
  const related = await getRelatedProducts(productId);

  if (!related || related.length === 0) {
    return null;
  }

  const products = related.map(mapToProductSummary);

  return (
    <div className="py-20">
      <Container>
        <h2 className="text-2xl font-medium mb-8">Related Products</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              imageUrl={product.imageUrl}
              actionSlot={
                <BuyNowButton
                  product={
                    product.defaultVariantId
                      ? {
                          price: product.price,
                          name: product.name,
                          productId: product.id,
                          variantId: product.defaultVariantId,
                          imageUrl: product.imageUrl,
                          stock: product.stock ?? 0,
                        }
                      : null
                  }
                />
              }
            />
          ))}
        </div>
      </Container>
    </div>
  );
}
