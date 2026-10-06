import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginRequest } from '../services/api.js';
import { load } from '../utils/storage.js';

export const USER_KEY = 'kiln.user';

export const login = createAsyncThunk('user/login', async (creds, { rejectWithValue }) => {
  try {
    return await loginRequest(creds);
  } catch (e) {
    return rejectWithValue(e.message);
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState: { user: load(USER_KEY, null), status: 'idle', error: null },
  reducers: {
    logout(state) {
      state.user = null;
      state.status = 'idle';
      state.error = null;
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (b) => {
    b.addCase(login.pending, (s) => {
      s.status = 'loading';
      s.error = null;
    })
      .addCase(login.fulfilled, (s, { payload }) => {
        s.status = 'idle';
        s.user = payload;
      })
      .addCase(login.rejected, (s, { payload }) => {
        s.status = 'idle';
        s.error = payload || 'Sign in failed.';
      });
  },
});

export const { logout, clearError } = userSlice.actions;
export default userSlice.reducer;
