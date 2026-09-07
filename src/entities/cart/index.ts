export { type CartItem, cartItemSchema, type CartState } from './model/schemas';
export { type CartStore } from './model/store';
export { selectCartItems, selectCartTotalItems } from './model/selectors';
export { CartStoreProvider, useCartStore } from './model/provider';

export { TotalItemsBadge } from './ui/TotalItemsBadge';
