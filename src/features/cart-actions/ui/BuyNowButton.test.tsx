import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { CartStoreProvider } from '@/entities/cart/model/provider';

import { BuyNowButton } from './BuyNowButton';

const mockPush = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe('BuyNowButton', () => {
  const defaultProps = {
    productId: 'prod-123',
    variantId: 'prod-123',
    name: 'Test Product',
    price: 99.99,
  };

  it('renders correctly', () => {
    render(
      <CartStoreProvider skipHydration>
        <BuyNowButton product={defaultProps} />
      </CartStoreProvider>,
    );

    expect(
      screen.getByRole('button', { name: /buy now/i }),
    ).toBeInTheDocument();
  });

  it('calls router.push and adds item when clicked', () => {
    render(
      <CartStoreProvider skipHydration>
        <BuyNowButton product={defaultProps} />
      </CartStoreProvider>,
    );

    const button = screen.getByRole('button', { name: /buy now/i });
    fireEvent.click(button);

    expect(mockPush).toHaveBeenCalledWith('/cart');
  });
});
