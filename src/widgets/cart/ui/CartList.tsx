'use client';

import { useCart } from '@/features/cart-actions';

import { CartItemCard } from './CartItemCard';

export function CartList() {
  const { cartItems } = useCart();

  if (cartItems.length === 0) {
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
    <div className="w-full flex flex-col">
      {cartItems.map((item) => (
        <CartItemCard key={item.variantId} item={item} />
      ))}
    </div>
  );
}
