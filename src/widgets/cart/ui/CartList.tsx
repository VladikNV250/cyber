'use client';

import { selectCartItems, useCartStore } from '@/entities/cart';

import { CartItemCard } from './CartItemCard';

export function CartList() {
  const items = useCartStore(selectCartItems);

  if (items.length === 0) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
        <p className="text-gray-500">
          Looks like you haven&apos;t added anything yet.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {items.map((item) => (
        <CartItemCard key={item.variantId} item={item} />
      ))}
    </div>
  );
}
