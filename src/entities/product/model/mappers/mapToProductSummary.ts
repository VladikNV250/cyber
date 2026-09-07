import { ProductSummary, productSummarySchema } from '../schemas/core';
import { ProductWithRelations } from '../schemas/details';

export function mapToProductSummary(
  productDTO: ProductWithRelations,
): ProductSummary {
  return productSummarySchema.parse({
    id: productDTO.id,
    name: productDTO.name,
    price: productDTO.minPrice,
    imageUrl: productDTO.variants?.[0]?.images?.[0],
  });
}
