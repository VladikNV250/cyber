import type { ProductSummary } from '../schemas/core';
import type { ProductWithRelations } from '../schemas/details';

export function mapToProductSummary(
  productDTO: ProductWithRelations,
): ProductSummary {
  const defaultVariant = productDTO.variants?.[0];

  return {
    id: productDTO.id,
    name: productDTO.name,
    price: Number(productDTO.minPrice),
    imageUrl: defaultVariant?.images?.[0],
    defaultVariantId: defaultVariant?.id,
    stock: defaultVariant?.stock ?? 0,
  };
}
