import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';



export const getAllFeedbacks = createAsyncThunk('feedback/getAll', async (_, { rejectWithValue }) => {
  try {
    const res = await api.get('/feedback');
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response.data.message);
  }
});

export const getFeedbackByCours = createAsyncThunk('feedback/getByCours', async (coursTitle, { rejectWithValue }) => {
  try {
    const res = await api.get(`/feedback/${coursTitle}`);
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response.data.message);
  }
});

export const getTopCourses = createAsyncThunk('feedback/getTopCourses', async (_, { rejectWithValue }) => {
  try {
    const res = await api.get('/feedback/topCourses');
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response.data.message);
  }
});

export const getStudentFeedback = createAsyncThunk('feedback/getStudentFeedback', async (_, { rejectWithValue }) => {
  try {
    const res = await api.get('/feedback/getStudentFeedback');
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response.data.message);
  }
});

export const addFeedback = createAsyncThunk('feedback/add', async ({ id, data }, { rejectWithValue }) => {
  try {
    const res = await api.post(`/feedback/${id}`, data);
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response.data.message);
  }
});

export const updateFeedback = createAsyncThunk('feedback/update', async ({ id, data }, { rejectWithValue }) => {
  try {
    const res = await api.put(`/feedback/${id}`, data);
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response.data.message);
  }
});

export const deleteFeedback = createAsyncThunk('feedback/delete', async (id, { rejectWithValue }) => {
  try {
    await api.delete(`/feedback/${id}`);
    return id;
  } catch (err) {
    return rejectWithValue(err.response.data.message);
  }
});


const initialState = {
  feedbacks: [],
  topCourses: [],
  studentFeedbacks: [],
  loading: false,
  error: null,
};


const feedbackSlice = createSlice({
  name: 'feedback',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get All
      .addCase(getAllFeedbacks.pending, (state) => { state.loading = true; })
      .addCase(getAllFeedbacks.fulfilled, (state, action) => {
        state.loading = false;
        state.feedbacks = action.payload;
      })
      .addCase(getAllFeedbacks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get By Cours
      .addCase(getFeedbackByCours.fulfilled, (state, action) => {
        state.feedbacks = action.payload;
      })
      // Top Courses
      .addCase(getTopCourses.fulfilled, (state, action) => {
        state.topCourses = action.payload;
      })
      // Student Feedback
      .addCase(getStudentFeedback.fulfilled, (state, action) => {
        state.studentFeedbacks = action.payload;
      })
      // Add
      .addCase(addFeedback.fulfilled, (state, action) => {
        state.feedbacks.push(action.payload);
      })
      // Update
      .addCase(updateFeedback.fulfilled, (state, action) => {
        const index = state.feedbacks.findIndex(f => f._id === action.payload._id);
        if (index !== -1) state.feedbacks[index] = action.payload;
      })
      // Delete
      .addCase(deleteFeedback.fulfilled, (state, action) => {
        state.feedbacks = state.feedbacks.filter(f => f._id !== action.payload);
      });
  },
});

export default feedbackSlice.reducer;