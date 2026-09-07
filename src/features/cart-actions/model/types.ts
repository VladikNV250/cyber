import { StaticImageData } from 'next/image';

export interface CartActionPayload {
  productId: string;
  name: string;
  price: number;
  variantId: string;
  stock?: number;
  imageUrl?: string | StaticImageData;
}
