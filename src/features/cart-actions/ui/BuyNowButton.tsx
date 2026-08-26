'use client';

import { useRouter } from 'next/navigation';

import { Button } from '@/shared/ui';

import type { CartActionPayload } from '../model/types';
import { useAddToCart } from '../model/useAddToCart';

export interface BuyNowButtonProps {
  product: CartActionPayload | null;
  className?: string;
}

export function BuyNowButton({ product, className }: BuyNowButtonProps) {
  const router = useRouter();
  const { addToCart, isAvailable, isOutOfStock } = useAddToCart(product);

  const handleBuyNow = () => {
    addToCart();
    router.push('/cart');
  };

  return (
    <Button
      className={className}
      variant="default"
      size="lg"
      disabled={!isAvailable || isOutOfStock}
      onClick={handleBuyNow}
    >
      {!isAvailable ? 'Unavailable' : isOutOfStock ? 'Out of Stock' : 'Buy Now'}
    </Button>
  );
}
