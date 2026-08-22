import { ProductResult } from '../../api/product.service';
import { ProductSummary, productSummarySchema } from '../schemas';

export function mapToProductSummary(productDTO: ProductResult): ProductSummary {
  return productSummarySchema.parse({
    id: productDTO.id,
    name: productDTO.name,
    price: productDTO.minPrice,
    imageUrl: productDTO.variants?.[0]?.images?.[0],
  });
}
