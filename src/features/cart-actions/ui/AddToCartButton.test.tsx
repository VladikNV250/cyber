import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { CartStoreProvider } from '@/entities/cart/model/provider';

import type { CartActionPayload } from '../model/types';
import { AddToCartButton } from './AddToCartButton';

describe('AddToCartButton', () => {
  const baseProps = {
    productId: 'p-1',
    name: 'Test Product',
  };

  const variantProps = {
    variantId: 'v-1',
    price: 100,
    stock: 5,
    attributes: {},
    imageUrl: '/test.jpg',
  };

  const renderComponent = (props: CartActionPayload | null) => {
    return render(
      <CartStoreProvider skipHydration>
        <AddToCartButton product={props} />
      </CartStoreProvider>,
    );
  };

  it('renders correctly and is enabled when variant is available and in stock', () => {
    renderComponent({ ...baseProps, ...variantProps } as CartActionPayload);

    const button = screen.getByRole('button', { name: /add to cart/i });
    expect(button).toBeInTheDocument();
    expect(button).not.toBeDisabled();
  });

  it('is disabled and shows "Unavailable" when product is missing', () => {
    renderComponent(null);

    const button = screen.getByRole('button', { name: /unavailable/i });
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
  });

  it('is disabled and shows "Out of Stock" when variant stock is 0', () => {
    renderComponent({
      ...baseProps,
      ...variantProps,
      stock: 0,
    } as CartActionPayload);

    const button = screen.getByRole('button', { name: /out of stock/i });
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
  });
});
