import { configureStore } from '@reduxjs/toolkit';
import cart, { CART_KEY } from './cartSlice.js';
import products from './productSlice.js';
import user, { USER_KEY } from './userSlice.js';
import prefs, { PREFS_KEY } from './prefsSlice.js';
import { save } from '../utils/storage.js';

export const store = configureStore({ reducer: { cart, products, user, prefs } });

// Persist the slices that should survive a refresh.
let last = {};
store.subscribe(() => {
  const s = store.getState();
  if (s.cart.items !== last.cart) save(CART_KEY, s.cart.items);
  if (s.user.user !== last.user) save(USER_KEY, s.user.user);
  if (s.prefs !== last.prefs) save(PREFS_KEY, s.prefs);
  last = { cart: s.cart.items, user: s.user.user, prefs: s.prefs };
});
