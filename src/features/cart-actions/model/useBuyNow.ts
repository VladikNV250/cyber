import { StaticImageData } from 'next/image';
import { useRouter } from 'next/navigation';

import { useCartStore } from '@/entities/cart';

interface UseBuyNowProps {
  productId: string;
  name: string;
  price: number;
  imageUrl?: string | StaticImageData;
}

export function useBuyNow({
  productId,
  name,
  price,
  imageUrl,
}: UseBuyNowProps) {
  const router = useRouter();
  const addItem = useCartStore((state) => state.addItem);

  const handleBuyNow = () => {
    addItem({
      variantId: productId,
      productId: productId,
      name,
      price,
      image: typeof imageUrl === 'string' ? imageUrl : imageUrl?.src,
      quantity: 1,
      attributes: {},
    });
    router.push('/cart');
  };

  return { handleBuyNow };
}
