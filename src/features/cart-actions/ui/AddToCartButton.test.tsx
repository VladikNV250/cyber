import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { CartStoreProvider } from '@/entities/cart/model/provider';
import type { ProductDetails, ProductVariant } from '@/entities/product';

import { AddToCartButton } from './AddToCartButton';

describe('AddToCartButton', () => {
  const mockProduct = {
    id: 'p-1',
    name: 'Test Product',
  } as ProductDetails;

  const mockVariant = {
    id: 'v-1',
    productId: 'p-1',
    price: 100,
    stock: 5,
    attributes: {},
    images: [],
    sku: 'SKU',
    allowedShipping: [],
  } as ProductVariant;

  const renderComponent = (activeVariant: ProductVariant | null) => {
    return render(
      <CartStoreProvider skipHydration>
        <AddToCartButton product={mockProduct} activeVariant={activeVariant} />
      </CartStoreProvider>,
    );
  };

  it('renders correctly and is enabled when variant is available and in stock', () => {
    renderComponent(mockVariant);

    const button = screen.getByRole('button', { name: /add to cart/i });
    expect(button).toBeInTheDocument();
    expect(button).not.toBeDisabled();
  });

  it('is disabled and shows "Unavailable" when variant is null', () => {
    renderComponent(null);

    const button = screen.getByRole('button', { name: /unavailable/i });
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
  });

  it('is disabled and shows "Out of Stock" when variant stock is 0', () => {
    renderComponent({ ...mockVariant, stock: 0 });

    const button = screen.getByRole('button', { name: /out of stock/i });
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
  });
});
