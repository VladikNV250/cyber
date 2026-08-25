'use client';

import type { ProductDetails, ProductVariant } from '@/entities/product';
import { Button } from '@/shared/ui';

import { useAddToCart } from '../model/useAddToCart';

export interface AddToCartButtonProps {
  product: Pick<ProductDetails, 'id' | 'name'>;
  activeVariant: ProductVariant | null | undefined;
  className?: string;
}

export function AddToCartButton({
  product,
  activeVariant,
  className,
}: AddToCartButtonProps) {
  const { handleAddToCart, isAvailable, isOutOfStock } = useAddToCart(
    product,
    activeVariant,
  );

  return (
    <Button
      color="black"
      className={className}
      disabled={!isAvailable || isOutOfStock}
      onClick={handleAddToCart}
    >
      {!isAvailable
        ? 'Unavailable'
        : isOutOfStock
          ? 'Out of Stock'
          : 'Add to Cart'}
    </Button>
  );
}
