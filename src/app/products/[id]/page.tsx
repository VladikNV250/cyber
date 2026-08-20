import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getProductById } from '@/entities/product/server';
import { uuidSchema } from '@/shared/model';
import { AutoBreadcrumbs, Container } from '@/shared/ui';

import { ProductDetails } from './_ui/ProductDetails';
import { ProductOverview } from './_ui/ProductOverview';
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

  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  // Map for AutoBreadcrumbs to show friendly names instead of UUID
  const breadcrumbLabels = {
    products: 'Catalog',
    [id]: product.name,
  };

  // We cast it to the type expected by the children to avoid Prisma strict type mismatch on JSON properties
  // And we stringify/parse to strip Prisma Decimal and Date objects which cannot be passed to Client Components.
  const serializedProduct = JSON.parse(JSON.stringify(product));

  type ProductType = Parameters<typeof ProductOverview>[0]['product'];
  const productData = serializedProduct as unknown as ProductType;

  return (
    <div className="flex flex-col flex-1 bg-white">
      <Container>
        <div className="py-10">
          <AutoBreadcrumbs labels={breadcrumbLabels} />
        </div>
        <ProductOverview product={productData} />
      </Container>

      <ProductDetails
        product={
          productData as unknown as Parameters<
            typeof ProductDetails
          >[0]['product']
        }
      />

      <Container>
        <RelatedProducts productId={product.id} />
      </Container>
    </div>
  );
}
