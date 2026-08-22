import { ProductGrid, mapToProductSummary } from '@/entities/product';
import { getRelatedProducts } from '@/entities/product/server';
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

        <ProductGrid products={related.map(mapToProductSummary)} columns={4} />
      </Container>
    </div>
  );
}
