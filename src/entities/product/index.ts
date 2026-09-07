export { ProductCard } from './ui/ProductCard/ProductCard';
export { ProductSpecItem } from './ui/ProductSpecItem/ProductSpecItem';
export { ProductGallery } from './ui/ProductGallery/ProductGallery';

export {
  productSchema,
  productSummarySchema,
  productVariantSchema,
} from './model/schemas/core';
export type {
  Product,
  ProductVariant,
  ProductSummary,
} from './model/schemas/core';
export {
  productDetailsSchema,
  productWithRelationsSchema,
} from './model/schemas/details';
export type {
  ProductDetails,
  ProductWithRelations,
} from './model/schemas/details';
export {
  createProductSchema,
  createProductVariantSchema,
  updateProductSchema,
  updateProductVariantSchema,
} from './model/schemas/mutations';
export type {
  CreateProductInput,
  CreateProductVariantInput,
  UpdateProductInput,
  UpdateProductVariantInput,
} from './model/schemas/mutations';
export {
  PRODUCT_SORT_KEYS,
  catalogFiltersDataSchema,
  productListQuerySchema,
} from './model/schemas/queries';
export type {
  CatalogFilters,
  ProductListQuery,
  ProductSortKey,
} from './model/schemas/queries';
export { mapToProductSummary } from './model/mappers/mapToProductSummary';
