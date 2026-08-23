import type { CartState } from './schemas';

export const selectCartItems = (state: CartState) => state.items;

export const selectCartTotalItems = (state: CartState) =>
  state.items.reduce((total, item) => total + item.quantity, 0);

export const selectCartTotalPrice = (state: CartState) =>
  state.items.reduce((total, item) => total + item.price * item.quantity, 0);
