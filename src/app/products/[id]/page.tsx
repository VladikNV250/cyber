import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getProductById } from '@/entities/product/server';
import { uuidSchema } from '@/shared/model';

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

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
      {product.description && (
        <p className="text-gray-600 mb-8">{product.description}</p>
      )}
    </div>
  );
}
