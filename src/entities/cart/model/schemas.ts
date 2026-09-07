import { z } from 'zod';

import { productSchema, productVariantSchema } from '@/entities/product';

const cartSnapshotSchema = z.object({
  name: productSchema.shape.name,
  price: productVariantSchema.shape.price,
  image: z.string().optional(),
});

export const cartItemSchema = z.object({
  variantId: productVariantSchema.shape.id,
  productId: productSchema.shape.id,
  quantity: z.number().int().min(1).default(1),
  snapshot: cartSnapshotSchema,
});

export type CartItem = z.infer<typeof cartItemSchema>;
export type CartSnapshot = z.infer<typeof cartSnapshotSchema>;

export interface CartState {
  items: Record<string, CartItem>;
  addItem: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
  removeItem: (variantId: string) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  updateSnapshot: (variantId: string, snapshot: CartSnapshot) => void;
  clearCart: () => void;
}
