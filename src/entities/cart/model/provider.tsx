'use client';

import { type ReactNode, createContext, useContext, useState } from 'react';
import { useStore } from 'zustand';

import type { CartState } from './schemas';
import { type CartStore, createCartStore } from './store';

export const CartStoreContext = createContext<CartStore | undefined>(undefined);

export interface CartStoreProviderProps {
  children: ReactNode;
}

export const CartStoreProvider = ({ children }: CartStoreProviderProps) => {
  const [store] = useState(() => createCartStore());

  return (
    <CartStoreContext.Provider value={store}>
      {children}
    </CartStoreContext.Provider>
  );
};

export const useCartStore = <T,>(selector: (store: CartState) => T): T => {
  const cartStoreContext = useContext(CartStoreContext);

  if (!cartStoreContext) {
    throw new Error('useCartStore must be used within CartStoreProvider');
  }

  return useStore(cartStoreContext, selector);
};
