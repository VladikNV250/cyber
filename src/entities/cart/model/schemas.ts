import { z } from 'zod';

import { productSchema, productVariantSchema } from '@/entities/product';

export const cartItemSchema = z.object({
  variantId: productVariantSchema.shape.id,
  productId: productSchema.shape.id,
  name: productSchema.shape.name,
  price: productVariantSchema.shape.price,
  image: z.string().optional(),
  quantity: z.number().int().min(1).default(1),
  attributes: productVariantSchema.shape.attributes,
});

export type CartItem = z.infer<typeof cartItemSchema>;

export interface CartState {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
  removeItem: (variantId: string) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  clearCart: () => void;
}
