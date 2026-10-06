import { createSlice } from '@reduxjs/toolkit';
import { load } from '../utils/storage.js';

export const PREFS_KEY = 'kiln.prefs';
export const MAX_COMPARE = 3;

const saved = load(PREFS_KEY, { wishlist: [], compare: [] });

const prefsSlice = createSlice({
  name: 'prefs',
  initialState: { wishlist: saved.wishlist || [], compare: saved.compare || [] },
  reducers: {
    toggleWishlist(state, { payload: id }) {
      state.wishlist = state.wishlist.includes(id)
        ? state.wishlist.filter((x) => x !== id)
        : [...state.wishlist, id];
    },
    toggleCompare(state, { payload: id }) {
      if (state.compare.includes(id)) state.compare = state.compare.filter((x) => x !== id);
      else if (state.compare.length < MAX_COMPARE) state.compare.push(id);
    },
    clearCompare(state) {
      state.compare = [];
    },
  },
});

export const { toggleWishlist, toggleCompare, clearCompare } = prefsSlice.actions;
export default prefsSlice.reducer;
