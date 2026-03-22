import { createSlice } from '@reduxjs/toolkit';
import {
    fetchAllFeedbacks, fetchFeedbackByCours, fetchStudentFeedbacks, fetchTopCourses,
    addFeedback, updateFeedback, deleteFeedback
} from '../thunks/feedbackThunks';

const initialState = {
    feedbacks: [],
    studentFeedbacks: [],
    topCourses: [],
    loading: false,
    error: null,
};

const feedbackSlice = createSlice({
    name: 'feedback',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllFeedbacks.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(fetchAllFeedbacks.fulfilled, (state, action) => {
                state.loading = false;
                state.feedbacks = action.payload;
            })
            .addCase(fetchAllFeedbacks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchStudentFeedbacks.fulfilled, (state, action) => {
                state.studentFeedbacks = action.payload;
            })
            .addCase(fetchTopCourses.fulfilled, (state, action) => {
                state.topCourses = action.payload;
            })
            .addCase(fetchFeedbackByCours.fulfilled, (state, action) => {
                state.feedbacks = action.payload; // Useful for course detail view
            })
            .addCase(addFeedback.fulfilled, (state, action) => {
                state.feedbacks.push(action.payload);
            })
            .addCase(deleteFeedback.fulfilled, (state, action) => {
                state.feedbacks = state.feedbacks.filter(f => f.coursTitle !== action.payload);
            });
    }
});

export const selectAllFeedbacks = (state) => state.feedback.feedbacks;
export const selectStudentFeedbacks = (state) => state.feedback.studentFeedbacks;
export const selectTopCourses = (state) => state.feedback.topCourses;
export const selectFeedbackLoading = (state) => state.feedback.loading;
export const selectFeedbackError = (state) => state.feedback.error;

export default feedbackSlice.reducer;
