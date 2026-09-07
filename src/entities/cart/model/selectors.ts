import type { CartState } from './schemas';

export const selectCartItems = (state: CartState) => Object.values(state.items);

export const selectCartTotalItems = (state: CartState) =>
  Object.values(state.items).reduce((total, item) => total + item.quantity, 0);
