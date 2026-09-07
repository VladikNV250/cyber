import { ProductCard } from '@/entities/product';
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

  return (
    <div className="py-20">
      <Container>
        <h2 className="text-2xl font-medium mb-8">Related Products</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {related.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={Number(product.minPrice)}
              imageUrl={product.variants[0].images[0]}
              actionSlot={
                <BuyNowButton
                  product={
                    product.variants[0]
                      ? {
                          price: Number(product.minPrice),
                          name: product.name,
                          productId: product.id,
                          variantId: product.variants[0].id,
                          imageUrl: product.variants[0].images[0],
                          stock: product.variants[0].stock,
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
