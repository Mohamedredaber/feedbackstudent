import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

export const fetchAllFeedbacks = createAsyncThunk(
    'feedback/fetchAll',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get('/feedback');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch feedbacks');
        }
    }
);

export const fetchFeedbackByCours = createAsyncThunk(
    'feedback/fetchByCours',
    async (coursTitle, { rejectWithValue }) => {
        try {
            const response = await api.get(`/feedback/${encodeURIComponent(coursTitle)}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch course feedbacks');
        }
    }
);

export const fetchStudentFeedbacks = createAsyncThunk(
    'feedback/fetchStudentFeedbacks',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get('/feedback/getStudentFeedback');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch student feedbacks');
        }
    }
);

export const fetchTopCourses = createAsyncThunk(
    'feedback/fetchTopCourses',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get('/feedback/topCourses');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch top courses');
        }
    }
);

export const addFeedback = createAsyncThunk(
    'feedback/add',
    async ({ coursTitle, data }, { rejectWithValue }) => {
        try {
            const response = await api.post(`/feedback/${encodeURIComponent(coursTitle)}`, data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to add feedback');
        }
    }
);

export const updateFeedback = createAsyncThunk(
    'feedback/update',
    async ({ coursTitle, data }, { rejectWithValue }) => {
        try {
            const response = await api.put(`/feedback/${encodeURIComponent(coursTitle)}`, data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to update feedback');
        }
    }
);

export const deleteFeedback = createAsyncThunk(
    'feedback/delete',
    async (coursTitle, { rejectWithValue }) => {
        try {
            await api.delete(`/feedback/${encodeURIComponent(coursTitle)}`);
            return coursTitle;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to delete feedback');
        }
    }
);
