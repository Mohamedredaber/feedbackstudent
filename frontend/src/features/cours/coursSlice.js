import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

// ── Thunks ───────────────────────────────

export const fetchCours = createAsyncThunk(
  "cours/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/cours");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Erreur");
    }
  }
);

export const fetchByCategory = createAsyncThunk(
  "cours/fetchByCategory",
  async (category, { rejectWithValue }) => {
    try {
      const res = await api.get(`/cours/getByCategory?category=${category}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Erreur");
    }
  }
);

export const fetchByInstructor = createAsyncThunk(
  "cours/fetchByInstructor",
  async (instructor, { rejectWithValue }) => {
    try {
      const res = await api.get(`/cours/getByInstructor?instructor=${instructor}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Erreur");
    }
  }
);

export const fetchById = createAsyncThunk(
  "cours/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await api.get(`/cours/${id}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Erreur");
    }
  }
);

export const addCours = createAsyncThunk(
  "cours/add",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.post("/cours", data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Erreur");
    }
  }
);

export const updateCours = createAsyncThunk(
  "cours/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await api.put(`/cours/${id}`, data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Erreur");
    }
  }
);

export const deleteCours = createAsyncThunk(
  "cours/delete",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/cours/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Erreur");
    }
  }
);

// ── Slice ───────────────────────────────

const initialState = {
  list: [],
  loading: false,
  error: null,
  selectedCours: null, // un seul cours sélectionné
  errorCours: null,
};

const coursSlice = createSlice({
  name: "cours",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    const thunks = [fetchCours, fetchByCategory, fetchByInstructor, addCours, updateCours, deleteCours];

    thunks.forEach((thunk) => {
      builder
        .addCase(thunk.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(thunk.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
    });

    builder
      .addCase(fetchCours.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchByInstructor.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(addCours.fulfilled, (state, action) => {
        state.loading = false;
        state.list.push(action.payload);
      })
      .addCase(updateCours.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.list.findIndex((c) => c._id === action.payload._id);
        if (index !== -1) state.list[index] = action.payload;
      })
      .addCase(deleteCours.fulfilled, (state, action) => {
        state.loading = false;
        state.list = state.list.filter((c) => c._id !== action.payload);
      })
      // ── fetchById
      .addCase(fetchById.pending, (state) => {
        state.loading = true;
        state.errorCours = null;
        state.selectedCours = null;
      })
      .addCase(fetchById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedCours = action.payload;
      })
      .addCase(fetchById.rejected, (state, action) => {
        state.loading = false;
        state.errorCours = action.payload || "Erreur lors de la récupération du cours";
      });
  },
});

// ── Selectors ───────────────────────────

export const selectCours = (state) => state.cours.list;
export const selectCoursLoading = (state) => state.cours.loading;
export const selectCoursError = (state) => state.cours.error;
export const selectCoursById = (state) => state.cours.selectedCours;
export const selectCoursErrorById = (state) => state.cours.errorCours;

export default coursSlice.reducer;