import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

export const fetchAllFeedbacks = createAsyncThunk('feedback/fetchAll', async (_, { rejectWithValue }) => {
    try {
        const res = await api.get('/feedback');
        return res.data;
    } catch (err) {
        return rejectWithValue(err.response?.data?.message || 'Erreur');
    }
});
export const fetchFeedbacksByCours = createAsyncThunk('feedback/fetchByCours', async (coursTitle, { rejectWithValue }) => {
    try {
        const res = await api.get(`/feedback/${encodeURIComponent(coursTitle)}`);
        return res.data;
    } catch (err) {
        return rejectWithValue(err.response?.data?.message || 'Erreur');
    }
});

export const fetchStudentFeedbacks = createAsyncThunk('feedback/fetchStudent', async (_, { rejectWithValue }) => {
    try {
        const res = await api.get('/feedback/getStudentFeedback');
        return res.data;
    } catch (err) {
        return rejectWithValue(err.response?.data?.message || 'Erreur');
    }
});


export const fetchTopCourses = createAsyncThunk('feedback/fetchTop', async (_, { rejectWithValue }) => {
    try {
        const res = await api.get('/feedback/topCourses');
        return res.data;
    } catch (err) {
        return rejectWithValue(err.response?.data?.message || 'Erreur');
    }
});

export const addFeedback = createAsyncThunk('feedback/add', async ({ coursId, data }, { rejectWithValue }) => {
    try {
        const res = await api.post(`/feedback/${coursId}`, data);
        return res.data;
    } catch (err) {
        return rejectWithValue(err.response?.data?.message || 'Erreur');
    }
});

export const updateFeedback = createAsyncThunk('feedback/update', async ({ id, data }, { rejectWithValue }) => {
    try {
        const res = await api.put(`/feedback/${id}`, data);
        return res.data;
    } catch (err) {
        return rejectWithValue(err.response?.data?.message || 'Erreur');
    }
});


export const deleteFeedback = createAsyncThunk('feedback/delete', async (id, { rejectWithValue }) => {
    try {
        await api.delete(`/feedback/${id}`);
        return id;
    } catch (err) {
        return rejectWithValue(err.response?.data?.message || 'Erreur');
    }
});
const feedbackSlice = createSlice({
    name: 'feedback',
    initialState: {
        list: [],
        studentFeedbacks: [],
        topCourses: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        const thunks = [fetchAllFeedbacks, fetchFeedbacksByCours, fetchStudentFeedbacks, fetchTopCourses, addFeedback, updateFeedback, deleteFeedback];

        thunks.forEach(thunk => {
            builder
                .addCase(thunk.pending, (state) => { state.loading = true; state.error = null; })
                .addCase(thunk.rejected, (state, action) => { state.loading = false; state.error = action.payload; });
        });

        builder
            .addCase(fetchAllFeedbacks.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(fetchFeedbacksByCours.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(fetchStudentFeedbacks.fulfilled, (state, action) => {
                state.loading = false;
                state.studentFeedbacks = action.payload;
            })
            .addCase(fetchTopCourses.fulfilled, (state, action) => {
                state.loading = false;
                state.topCourses = action.payload;
            })
            .addCase(addFeedback.fulfilled, (state, action) => {
                state.loading = false;
                state.list.push(action.payload);
            })
            .addCase(updateFeedback.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.list.findIndex(f => f._id === action.payload._id);
                if (index !== -1) state.list[index] = action.payload;
            })
            .addCase(deleteFeedback.fulfilled, (state, action) => {
                state.loading = false;
                state.list = state.list.filter(f => f._id !== action.payload);
            });
    },
});

export const selectFeedbacks = (state) => state.feedback.list;
export const selectStudentFeedbacks = (state) => state.feedback.studentFeedbacks;
export const selectTopCourses = (state) => state.feedback.topCourses;
export const selectFeedbackLoading = (state) => state.feedback.loading;
export default feedbackSlice.reducer;