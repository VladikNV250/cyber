import { ProductResult } from '../../api/product.service';
import { CatalogProduct, catalogProductSchema } from '../schemas';

export function mapToCatalogProduct(productDTO: ProductResult): CatalogProduct {
  return catalogProductSchema.parse(productDTO);
}
