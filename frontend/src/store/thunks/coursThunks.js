import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

export const fetchAllCours = createAsyncThunk(
    'cours/fetchAll',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get('/cours');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch courses');
        }
    }
);

export const fetchCoursByTitle = createAsyncThunk(
    'cours/fetchByTitle',
    async (title, { rejectWithValue }) => {
        try {
            const response = await api.get(`/cours/${encodeURIComponent(title)}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch course');
        }
    }
);

export const createCours = createAsyncThunk(
    'cours/create',
    async (data, { rejectWithValue }) => {
        try {
            const response = await api.post('/cours', data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to create course');
        }
    }
);

export const updateCours = createAsyncThunk(
    'cours/update',
    async ({ title, data }, { rejectWithValue }) => {
        try {
            const response = await api.put(`/cours/${encodeURIComponent(title)}`, data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to update course');
        }
    }
);

export const deleteCours = createAsyncThunk(
    'cours/delete',
    async (title, { rejectWithValue }) => {
        try {
            await api.delete(`/cours/${encodeURIComponent(title)}`);
            return title;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to delete course');
        }
    }
);

export const fetchCoursByCategory = createAsyncThunk(
    'cours/fetchByCategory',
    async (category, { rejectWithValue }) => {
        try {
            const response = await api.get(`/cours/getByCategory?category=${encodeURIComponent(category)}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch by category');
        }
    }
);
