import { describe, expect, it } from 'vitest';

import type { ProductWithRelations } from '../schemas/details';
import { mapToProductSummary } from './mapToProductSummary';

describe('mapToProductSummary', () => {
  it('correctly maps ProductWithRelations to ProductSummary with default variant data', () => {
    const mockProduct = {
      id: 'prod-1',
      name: 'Test iPhone',
      description: 'Desc',
      categoryId: 'cat-1',
      brandId: 'brand-1',
      baseSpecs: null,
      isActive: true,
      minPrice: 999,
      averageRating: 4.5,
      reviewCount: 10,
      createdAt: new Date(),
      updatedAt: new Date(),
      variants: [
        {
          id: 'var-1',
          productId: 'prod-1',
          sku: 'SKU-1',
          price: 999,
          stock: 5,
          attributes: {},
          images: ['https://example.com/img1.jpg'],
          allowedShipping: ['STORE_PICKUP'],
        },
      ],
    } as unknown as ProductWithRelations;

    const result = mapToProductSummary(mockProduct);

    expect(result).toEqual({
      id: 'prod-1',
      name: 'Test iPhone',
      price: 999,
      imageUrl: 'https://example.com/img1.jpg',
      defaultVariantId: 'var-1',
      stock: 5,
    });
  });

  it('handles products without variants safely', () => {
    const mockProduct = {
      id: 'prod-2',
      name: 'No Variant Product',
      minPrice: 500,
      variants: [],
    } as unknown as ProductWithRelations;

    const result = mapToProductSummary(mockProduct);

    expect(result).toEqual({
      id: 'prod-2',
      name: 'No Variant Product',
      price: 500,
      imageUrl: undefined,
      defaultVariantId: undefined,
      stock: 0,
    });
  });
});
