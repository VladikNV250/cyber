'use client';

import useSWR from 'swr';

import { type CartItem, useCartStore } from '@/entities/cart';
import type { ProductSummary } from '@/entities/product';

export function useCart() {
  const items = useCartStore((state) => state.items);
  const updateSnapshot = useCartStore((state) => state.updateSnapshot);

  const cartItems: CartItem[] = Object.values(items);
  const variantIds = Object.keys(items);

  const { isValidating } = useSWR<ProductSummary[]>(
    variantIds.length
      ? `/api/products/by-ids?ids=${variantIds.join(',')}`
      : null,
    {
      revalidateOnMount: true,
      onSuccess: (fresh) => {
        fresh.forEach((product) => {
          updateSnapshot(product.id, {
            name: product.name,
            price: product.price,
            image: product.imageUrl,
          });
        });
      },
    },
  );

  const total = cartItems.reduce(
    (acc, item) => acc + item.snapshot.price * item.quantity,
    0,
  );

  return { cartItems, total, isValidating };
}
