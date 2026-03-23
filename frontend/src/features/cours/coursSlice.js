import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

// ── Async Actions ──────────────────────────

export const getAllCours = createAsyncThunk('cours/getAll', async (_, { rejectWithValue }) => {
  try {
    const res = await api.get('/cours');
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response.data.message);
  }
});

export const getCoursById = createAsyncThunk('cours/getById', async (id, { rejectWithValue }) => {
  try {
    const res = await api.get(`/cours/${id}`);
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response.data.message);
  }
});

export const getCoursByCategory = createAsyncThunk('cours/getByCategory', async (category, { rejectWithValue }) => {
  try {
    const res = await api.get(`/cours/getByCategory?category=${category}`);
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response.data.message);
  }
});

export const getCoursByInstructor = createAsyncThunk('cours/getByInstructor', async (instructor, { rejectWithValue }) => {
  try {
    const res = await api.get(`/cours/getByInstructor?instructor=${instructor}`);
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response.data.message);
  }
});

export const createCours = createAsyncThunk('cours/create', async (data, { rejectWithValue }) => {
  try {
    const res = await api.post('/cours', data);
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response.data.message);
  }
});

export const updateCours = createAsyncThunk('cours/update', async ({ id, data }, { rejectWithValue }) => {
  try {
    const res = await api.put(`/cours/${id}`, data);
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response.data.message);
  }
});

export const deleteCours = createAsyncThunk('cours/delete', async (id, { rejectWithValue }) => {
  try {
    await api.delete(`/cours/${id}`);
    return id;
  } catch (err) {
    return rejectWithValue(err.response.data.message);
  }
});

// ── Initial State ──────────────────────────

const initialState = {
  cours: [],
  selectedCours: null,
  loading: false,
  error: null,
};

// ── Slice ──────────────────────────────────

const coursSlice = createSlice({
  name: 'cours',
  initialState,
  reducers: {
    clearSelectedCours: (state) => {
      state.selectedCours = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get All
      .addCase(getAllCours.pending, (state) => { state.loading = true; })
      .addCase(getAllCours.fulfilled, (state, action) => {
        state.loading = false;
        state.cours = action.payload;
      })
      .addCase(getAllCours.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get By Id
      .addCase(getCoursById.fulfilled, (state, action) => {
        state.selectedCours = action.payload;
      })
      // Create
      .addCase(createCours.fulfilled, (state, action) => {
        state.cours.push(action.payload);
      })
      // Update
      .addCase(updateCours.fulfilled, (state, action) => {
        const index = state.cours.findIndex(c => c._id === action.payload._id);
        if (index !== -1) state.cours[index] = action.payload;
      })
      // Delete
      .addCase(deleteCours.fulfilled, (state, action) => {
        state.cours = state.cours.filter(c => c._id !== action.payload);
      });
  },
});

export const { clearSelectedCours } = coursSlice.actions;
export default coursSlice.reducer;