import { createSlice } from '@reduxjs/toolkit';
import { load } from '../utils/storage.js';

export const CART_KEY = 'kiln.cart';

const initialState = { items: load(CART_KEY, []) };

const clamp = (qty, stock) => Math.max(0, Math.min(qty, stock ?? 99));

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, { payload }) {
      const { product, quantity = 1 } = payload;
      const existing = state.items.find((i) => i.id === product.id);
      if (existing) {
        existing.quantity = clamp(existing.quantity + quantity, product.stock);
      } else {
        state.items.push({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          stock: product.stock,
          quantity: clamp(quantity, product.stock),
        });
      }
    },
    removeFromCart(state, { payload: id }) {
      state.items = state.items.filter((i) => i.id !== id);
    },
    updateQuantity(state, { payload: { id, quantity } }) {
      const item = state.items.find((i) => i.id === id);
      if (!item) return;
      const next = clamp(quantity, item.stock);
      if (next < 1) state.items = state.items.filter((i) => i.id !== id);
      else item.quantity = next;
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
