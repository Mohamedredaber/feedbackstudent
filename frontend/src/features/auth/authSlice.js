import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';
import api from '../../api/axios';

// ── Async Actions ──────────────────────────

export const login = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
  try {
    const res = await api.post('/auth/login', credentials);
    return res.data.token;
  } catch (err) {
    return rejectWithValue(err.response.data.message);
  }
});

export const register = createAsyncThunk('auth/register', async (userData, { rejectWithValue }) => {
  try {
    const res = await api.post('/auth/register', userData);
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response.data.message);
  }
});
export const getallusers = createAsyncThunk('auth/getallusers', async (_, { rejectWithValue }) => {
  try {
    const res = await api.get('/auth/users');
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response.data.message);
  }
});

const token = sessionStorage.getItem('token');

const initialState = {
  user: token ? jwtDecode(token) : null,
  token: token || null,
  loading: false,
  error: null,
};



const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      sessionStorage.removeItem('token');
      state.user = null;
      state.token = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload;
        state.user = jwtDecode(action.payload);
        sessionStorage.setItem('token', action.payload);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Register
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Logout;
        .addCase(logout.fulfilled, (state) => { 
            state.user = null;
            state.token = null;
            state.error = null;
        });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;