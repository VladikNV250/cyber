import { X } from 'lucide-react';
import Image from 'next/image';

import { useCartStore } from '@/entities/cart';
import type { CartItem } from '@/entities/cart/model/schemas';
import { QuantitySelector } from '@/shared/ui';

interface CartItemCardProps {
  item: CartItem;
}

export function CartItemCard({ item }: CartItemCardProps) {
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);

  const handleDecrease = () => {
    if (item.quantity > 1) {
      updateQuantity(item.variantId, item.quantity - 1);
    }
  };

  const handleIncrease = () => {
    updateQuantity(item.variantId, item.quantity + 1);
  };

  const totalProductPrice = item.price * item.quantity;

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-4 py-14 border-b border-[#EBEBEB]">
      <div className="size-22.5 shrink-0 relative">
        <Image
          src={item.image || '/images/placeholder.png'}
          alt={item.name}
          fill
          className="object-contain"
        />
      </div>
      <div className="flex-1">
        <h3 className="font-medium text-base line-clamp-2 mb-2">{item.name}</h3>
        <p className="text-sm text-[#A7A7A7]">#{item.variantId}</p>
      </div>

      <div className="flex items-center gap-6 mt-4 sm:mt-0">
        <QuantitySelector
          value={item.quantity}
          onDecrease={handleDecrease}
          onIncrease={handleIncrease}
        />

        <div className="w-24 text-right">
          <span className="text-lg font-medium text-foreground">
            ${totalProductPrice}
          </span>
        </div>

        <button
          onClick={() => removeItem(item.variantId)}
          className="p-2 ml-4 hover:bg-gray-100 rounded-md text-[#A7A7A7] hover:text-black transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
