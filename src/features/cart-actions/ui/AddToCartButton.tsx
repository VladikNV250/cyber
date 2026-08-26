'use client';

import { Button } from '@/shared/ui';

import type { CartActionPayload } from '../model/types';
import { useAddToCart } from '../model/useAddToCart';

export interface AddToCartButtonProps {
  product: CartActionPayload | null;
  className?: string;
}

export function AddToCartButton({ product, className }: AddToCartButtonProps) {
  const { addToCart, isAvailable, isOutOfStock } = useAddToCart(product);

  return (
    <Button
      color="black"
      className={className}
      disabled={!isAvailable || isOutOfStock}
      onClick={addToCart}
    >
      {!isAvailable
        ? 'Unavailable'
        : isOutOfStock
          ? 'Out of Stock'
          : 'Add to Cart'}
    </Button>
  );
}
