import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getProductById } from '@/entities/product/server';
import { uuidSchema } from '@/shared/model';
import { AutoBreadcrumbs, Container } from '@/shared/ui';
import { ProductOverview } from '@/widgets/product-overview';

import { ProductDetails } from './_ui/ProductDetails';
import { RelatedProducts } from './_ui/RelatedProducts';

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  if (!uuidSchema.safeParse(id).success) {
    return {
      title: 'Product Not Found',
    };
  }

  const product = await getProductById(id);

  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  return {
    title: product.name,
    description:
      product.description || `Buy ${product.name} at the best price.`,
  };
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;

  if (!uuidSchema.safeParse(id).success) {
    notFound();
  }

  const productData = await getProductById(id);

  if (!productData) {
    notFound();
  }

  const breadcrumbLabels = {
    products: 'Catalog',
    [id]: productData.name,
  };

  return (
    <div className="flex flex-col flex-1 bg-white">
      <Container>
        <div className="py-10">
          <AutoBreadcrumbs labels={breadcrumbLabels} />
        </div>
        <ProductOverview product={productData} />
      </Container>

      <ProductDetails product={productData} />

      <Container>
        <RelatedProducts productId={productData.id} />
      </Container>
    </div>
  );
}
