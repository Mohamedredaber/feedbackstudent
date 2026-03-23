import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

export const fetchAllCours = createAsyncThunk(
  "cours/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/cours");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch courses",
      );
    }
  },
);

export const fetchCoursById = createAsyncThunk(
  "cours/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/cours/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch course",
      );
    }
  },
);

export const createCours = createAsyncThunk(
  "cours/create",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post("/cours", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create course",
      );
    }
  },
);

export const updateCours = createAsyncThunk(
  "cours/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/cours/${id}`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update course",
      );
    }
  },
);

export const deleteCours = createAsyncThunk(
  "cours/delete",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/cours/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete course",
      );
    }
  },
);

export const fetchCoursByCategory = createAsyncThunk(
  "cours/fetchByCategory",
  async (category, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `/cours/getByCategory?category=${encodeURIComponent(category)}`,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch by category",
      );
    }
  },
);
