import { useCartStore } from '@/entities/cart';

import type { CartActionPayload } from './types';

export function useAddToCart(product: CartActionPayload | null) {
  const addItem = useCartStore((state) => state.addItem);

  const isAvailable = product ? !!product.variantId : false;
  const isOutOfStock = product
    ? product.stock !== undefined && product.stock <= 0
    : false;

  const addToCart = () => {
    if (product && isAvailable && !isOutOfStock) {
      addItem({
        variantId: product.variantId!,
        productId: product.productId,
        quantity: 1,
        snapshot: {
          name: product.name,
          price: product.price,
          image:
            typeof product.imageUrl === 'string'
              ? product.imageUrl
              : product.imageUrl?.src,
        },
      });
    }
  };

  return {
    addToCart,
    isAvailable,
    isOutOfStock,
  };
}
