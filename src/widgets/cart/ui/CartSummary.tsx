'use client';

import {
  selectCartItems,
  selectCartTotalPrice,
  useCartStore,
} from '@/entities/cart';
import { Button } from '@/shared/ui';

export function CartSummary() {
  const items = useCartStore(selectCartItems);
  const total = useCartStore(selectCartTotalPrice);

  return (
    <div className="border border-[#EBEBEB] rounded-xl py-14 px-16">
      <h2 className="text-xl font-bold mb-10">Order Summary</h2>

      <div className="flex justify-between items-center mb-12">
        <span className="font-semibold text-lg text-black">Total</span>
        <span className="font-bold text-xl text-black">
          ${items.length > 0 ? total : 0}
        </span>
      </div>

      <Button className="w-full" disabled={items.length === 0}>
        Checkout
      </Button>
    </div>
  );
}
