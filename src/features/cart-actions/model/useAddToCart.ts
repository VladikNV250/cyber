import { useCartStore } from '@/entities/cart';
import type { ProductDetails, ProductVariant } from '@/entities/product';

export function useAddToCart(
  product: Pick<ProductDetails, 'id' | 'name'>,
  activeVariant: ProductVariant | null | undefined,
) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    if (activeVariant && activeVariant.stock > 0) {
      addItem({
        variantId: activeVariant.id,
        productId: product.id,
        name: product.name,
        price: Number(activeVariant.price),
        image: activeVariant.images?.[0],
        quantity: 1,
        attributes: activeVariant.attributes as Record<string, string>,
      });
    }
  };

  return {
    handleAddToCart,
    isAvailable: !!activeVariant,
    isOutOfStock: activeVariant ? activeVariant.stock <= 0 : false,
  };
}
