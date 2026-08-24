import { persist } from 'zustand/middleware';
import { createStore } from 'zustand/vanilla';

import { type CartState, cartItemSchema } from './schemas';

export const createCartStore = (
  initState: Partial<CartState> = {},
  skipHydration: boolean = false,
) => {
  return createStore<CartState>()(
    persist(
      (set) => ({
        items: [],

        addItem: (newItem) =>
          set((state) => {
            const existingItem = state.items.find(
              (item) => item.variantId === newItem.variantId,
            );

            if (existingItem) {
              const newQuantity =
                existingItem.quantity + (newItem.quantity || 1);
              const parseResult =
                cartItemSchema.shape.quantity.safeParse(newQuantity);

              if (!parseResult.success) {
                return state;
              }

              return {
                items: state.items.map((item) =>
                  item.variantId === newItem.variantId
                    ? {
                        ...item,
                        quantity: parseResult.data,
                      }
                    : item,
                ),
              };
            }

            const parseResult = cartItemSchema.shape.quantity.safeParse(
              newItem.quantity || 1,
            );
            if (!parseResult.success) {
              return state;
            }

            return {
              items: [
                ...state.items,
                { ...newItem, quantity: parseResult.data },
              ],
            };
          }),

        removeItem: (variantId) =>
          set((state) => ({
            items: state.items.filter((item) => item.variantId !== variantId),
          })),

        updateQuantity: (variantId, quantity) =>
          set((state) => {
            const parseResult =
              cartItemSchema.shape.quantity.safeParse(quantity);
            if (!parseResult.success) {
              return state;
            }

            return {
              items: state.items.map((item) =>
                item.variantId === variantId
                  ? { ...item, quantity: parseResult.data }
                  : item,
              ),
            };
          }),

        clearCart: () => set({ items: [] }),
        ...initState,
      }),
      {
        name: 'cart-storage',
        skipHydration,
      },
    ),
  );
};

export type CartStore = ReturnType<typeof createCartStore>;
