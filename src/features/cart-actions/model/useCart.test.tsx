import { renderHook, waitFor } from '@testing-library/react';
import { type ReactNode } from 'react';
import { SWRConfig } from 'swr';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { defaultFetcher } from '@/app/_providers';
import { CartStoreProvider } from '@/entities/cart/model/provider';
import type { CartState } from '@/entities/cart/model/schemas';

import { useCart } from './useCart';

describe('useCart', () => {
  const mockVariantId = 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11';
  const mockProductId = 'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22';

  const mockCartState: Partial<CartState> = {
    items: {
      [mockVariantId]: {
        variantId: mockVariantId,
        productId: mockProductId,
        quantity: 2,
        snapshot: {
          name: 'Cached Item Name',
          price: 50,
          image: '/cached-img.png',
        },
      },
    },
  };

  const createWrapper = (initialState: Partial<CartState>) => {
    return function Wrapper({ children }: { children: ReactNode }) {
      return (
        <SWRConfig
          value={{
            fetcher: defaultFetcher,
            provider: () => new Map(),
            dedupingInterval: 0,
          }}
        >
          <CartStoreProvider initialState={initialState} skipHydration>
            {children}
          </CartStoreProvider>
        </SWRConfig>
      );
    };
  };

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('renders instantly with snapshot fallbackData', () => {
    // Mock fetch that does not resolve immediately
    vi.spyOn(global, 'fetch').mockImplementationOnce(
      () => new Promise(() => {}),
    );

    const { result } = renderHook(() => useCart(), {
      wrapper: createWrapper(mockCartState),
    });

    expect(result.current.cartItems).toHaveLength(1);
    expect(result.current.cartItems[0]).toEqual({
      variantId: mockVariantId,
      productId: mockProductId,
      quantity: 2,
      snapshot: {
        name: 'Cached Item Name',
        price: 50,
        image: '/cached-img.png',
      },
    });
    expect(result.current.total).toBe(100);
    expect(result.current.isValidating).toBe(true);
  });

  it('revalidates with fresh data and updates snapshot', async () => {
    const freshVariants = [
      {
        id: mockVariantId,
        price: 75,
        images: ['/fresh-img.png'],
        product: {
          id: mockProductId,
          name: 'Fresh Item Name',
        },
      },
    ];

    vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => freshVariants,
    } as Response);

    const { result } = renderHook(() => useCart(), {
      wrapper: createWrapper(mockCartState),
    });

    await waitFor(() => {
      expect(result.current.cartItems[0].snapshot.name).toBe('Fresh Item Name');
      expect(result.current.cartItems[0].snapshot.price).toBe(75);
      expect(result.current.total).toBe(150);
    });

    expect(global.fetch).toHaveBeenCalledWith(
      `/api/variants/by-ids?ids=${mockVariantId}`,
    );
  });

  it('handles empty cart correctly without fetching', () => {
    const fetchSpy = vi.spyOn(global, 'fetch');

    const { result } = renderHook(() => useCart(), {
      wrapper: createWrapper({ items: {} }),
    });

    expect(result.current.cartItems).toHaveLength(0);
    expect(result.current.total).toBe(0);
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it('removes missing items when API returns a partial response', async () => {
    const secondVariantId = 'c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a33';
    const stateWithTwoItems: Partial<CartState> = {
      items: {
        [mockVariantId]: {
          variantId: mockVariantId,
          productId: mockProductId,
          quantity: 1,
          snapshot: {
            name: 'Item 1',
            price: 50,
            image: '/img1.png',
          },
        },
        [secondVariantId]: {
          variantId: secondVariantId,
          productId: 'prod-deleted',
          quantity: 2,
          snapshot: {
            name: 'Deleted Variant Item',
            price: 100,
            image: '/img2.png',
          },
        },
      },
    };

    // Return only mockVariantId, omitting secondVariantId
    const freshVariants = [
      {
        id: mockVariantId,
        price: 60,
        images: ['/fresh-img.png'],
        product: {
          id: mockProductId,
          name: 'Updated Item 1',
        },
      },
    ];

    vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => freshVariants,
    } as Response);

    const { result } = renderHook(() => useCart(), {
      wrapper: createWrapper(stateWithTwoItems),
    });

    await waitFor(() => {
      expect(result.current.cartItems).toHaveLength(1);
      expect(result.current.cartItems[0].variantId).toBe(mockVariantId);
      expect(result.current.cartItems[0].snapshot.name).toBe('Updated Item 1');
      expect(result.current.cartItems[0].snapshot.price).toBe(60);
      expect(result.current.total).toBe(60);
    });
  });
});
