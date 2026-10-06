import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchProducts } from '../services/api.js';

export const loadProducts = createAsyncThunk('products/load', async () => fetchProducts());

export const defaultFilters = {
  query: '',
  category: 'All',
  maxPrice: 200,
  minRating: 0,
  sort: 'popularity',
};

const productSlice = createSlice({
  name: 'products',
  initialState: { items: [], status: 'idle', error: null, filters: defaultFilters },
  reducers: {
    setFilter(state, { payload }) {
      state.filters = { ...state.filters, ...payload };
    },
    resetFilters(state) {
      state.filters = defaultFilters;
    },
  },
  extraReducers: (b) => {
    b.addCase(loadProducts.pending, (s) => {
      s.status = 'loading';
      s.error = null;
    })
      .addCase(loadProducts.fulfilled, (s, { payload }) => {
        s.status = 'ready';
        s.items = payload;
      })
      .addCase(loadProducts.rejected, (s, { error }) => {
        s.status = 'error';
        s.error = error.message || 'Could not load products.';
      });
  },
});

export const { setFilter, resetFilters } = productSlice.actions;
export default productSlice.reducer;
