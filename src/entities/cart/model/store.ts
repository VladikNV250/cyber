import { produce } from 'immer';
import { persist } from 'zustand/middleware';
import { createStore } from 'zustand/vanilla';

import { type CartState, cartItemSchema } from './schemas';

// TODO: What about to use immer on all store?
export const createCartStore = (
  initState: Partial<CartState> = {},
  skipHydration: boolean = false,
) => {
  return createStore<CartState>()(
    persist(
      (set) => ({
        items: {},

        addItem: (newItem) =>
          set((state) => {
            const existing = state.items[newItem.variantId];
            const newQuantity =
              (existing?.quantity ?? 0) + (newItem.quantity ?? 1);

            const parseResult =
              cartItemSchema.shape.quantity.safeParse(newQuantity);
            if (!parseResult.success) return state;

            return {
              items: {
                ...state.items,
                [newItem.variantId]: {
                  ...newItem,
                  quantity: parseResult.data,
                },
              },
            };
          }),

        removeItem: (variantId) =>
          set(
            produce((state) => {
              delete state.items[variantId];
            }),
          ),

        updateQuantity: (variantId, quantity) =>
          set((state) => {
            const existing = state.items[variantId];
            if (!existing) return state;

            const parseResult =
              cartItemSchema.shape.quantity.safeParse(quantity);
            if (!parseResult.success) return state;

            return {
              items: {
                ...state.items,
                [variantId]: { ...existing, quantity: parseResult.data },
              },
            };
          }),

        updateSnapshot: (variantId, snapshot) =>
          set((state) => {
            const existing = state.items[variantId];
            if (!existing) return state;
            return {
              items: {
                ...state.items,
                [variantId]: { ...existing, snapshot },
              },
            };
          }),

        clearCart: () => set({ items: {} }),
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
