'use client';

import useSWR from 'swr';

import { type CartItem, useCartStore } from '@/entities/cart';
import { type ProductVariantWithProduct } from '@/entities/product';

export function useCart() {
  const items = useCartStore((state) => state.items);
  const updateSnapshot = useCartStore((state) => state.updateSnapshot);
  const removeItem = useCartStore((state) => state.removeItem);

  const cartItems: CartItem[] = Object.values(items);
  const variantIds = Object.keys(items);

  const { isValidating } = useSWR<ProductVariantWithProduct[]>(
    variantIds.length
      ? `/api/variants/by-ids?ids=${variantIds.join(',')}`
      : null,
    {
      revalidateOnMount: true,
      onSuccess: (fresh) => {
        const returnedIds = new Set(fresh.map((v) => v.id));

        variantIds.forEach((id) => {
          if (!returnedIds.has(id)) {
            removeItem(id);
          }
        });

        fresh.forEach((variant) => {
          updateSnapshot(variant.id, {
            name: variant.product.name,
            price: variant.price,
            image: variant.images[0],
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
