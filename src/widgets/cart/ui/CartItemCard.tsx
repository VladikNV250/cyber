import { X } from 'lucide-react';
import Image from 'next/image';

import { useCartStore } from '@/entities/cart';
import type { CartItem } from '@/entities/cart/model/schemas';
import { formatPrice } from '@/shared/lib';
import { Button, QuantitySelector } from '@/shared/ui';

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
    <div className="w-full flex flex-col sm:flex-row sm:items-center gap-4 py-14 border-b border-[#EBEBEB]">
      <div className="size-22.5 shrink-0 relative">
        <Image
          src={item.image || '/images/placeholder.png'}
          alt={item.name}
          fill
          className="object-contain"
        />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-base line-clamp-2 mb-2 pr-4">
          {item.name}
        </h3>
        <p className="text-sm text-[#A7A7A7] truncate">#{item.variantId}</p>
      </div>

      <div className="flex items-center shrink-0 gap-6 mt-4 sm:mt-0 ml-auto">
        <QuantitySelector
          value={item.quantity}
          onDecrease={handleDecrease}
          onIncrease={handleIncrease}
        />

        <div className="w-24 text-right">
          <span className="text-lg font-medium text-foreground">
            {formatPrice(totalProductPrice)}
          </span>
        </div>

        <Button
          aria-label={`Remove ${item.name} from cart`}
          variant="ghost"
          size="icon"
          onClick={() => removeItem(item.variantId)}
          className="ml-4 text-[#A7A7A7] hover:text-black transition-colors"
        >
          <X className="size-6" />
        </Button>
      </div>
    </div>
  );
}
