import { persist } from 'zustand/middleware';
import { createStore } from 'zustand/vanilla';

import type { CartState } from './schemas';

export const createCartStore = (initState: Partial<CartState> = {}) => {
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
              return {
                items: state.items.map((item) =>
                  item.variantId === newItem.variantId
                    ? {
                        ...item,
                        quantity: item.quantity + (newItem.quantity || 1),
                      }
                    : item,
                ),
              };
            }

            return {
              items: [
                ...state.items,
                { ...newItem, quantity: newItem.quantity || 1 },
              ],
            };
          }),

        removeItem: (variantId) =>
          set((state) => ({
            items: state.items.filter((item) => item.variantId !== variantId),
          })),

        updateQuantity: (variantId, quantity) =>
          set((state) => ({
            items: state.items.map((item) =>
              item.variantId === variantId
                ? { ...item, quantity: Math.max(1, quantity) }
                : item,
            ),
          })),

        clearCart: () => set({ items: [] }),
        ...initState,
      }),
      {
        name: 'cart-storage',
      },
    ),
  );
};

export type CartStore = ReturnType<typeof createCartStore>;
