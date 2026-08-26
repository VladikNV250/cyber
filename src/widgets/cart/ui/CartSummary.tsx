'use client';

import {
  selectCartItems,
  selectCartTotalPrice,
  useCartStore,
} from '@/entities/cart';
import { formatPrice } from '@/shared/lib';
import { Button } from '@/shared/ui';

export function CartSummary() {
  const items = useCartStore(selectCartItems);
  const total = useCartStore(selectCartTotalPrice);

  return (
    <div className="border border-[#EBEBEB] rounded-2xl p-6 sm:p-8">
      <h2 className="text-xl font-bold mb-6">Order Summary</h2>

      <div className="flex justify-between items-center mb-8">
        <span className="font-semibold text-lg text-black">Total</span>
        <span className="font-bold text-2xl text-black">
          {formatPrice(items.length > 0 ? total : 0)}
        </span>
      </div>

      <Button className="w-full" size="lg" disabled={items.length === 0}>
        Checkout
      </Button>
    </div>
  );
}
