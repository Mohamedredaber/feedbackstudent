import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

export const fetchCours = createAsyncThunk('cours/fetchAll', async (_, { rejectWithValue }) => {
    try {
        const res = await api.get('/cours');
        return res.data; // ✅ retourne directement le tableau
    } catch (err) {
        return rejectWithValue(err.response?.data?.message || 'Erreur');
    }
});

export const addCours = createAsyncThunk('cours/add', async (data, { rejectWithValue }) => {
    try {
        const res = await api.post('/cours', data);
        return res.data; // ✅ retourne le cours créé
    } catch (err) {
        return rejectWithValue(err.response?.data?.message || 'Erreur');
    }
});

export const updateCours = createAsyncThunk('cours/update', async ({ id, data }, { rejectWithValue }) => {
    try {
        const res = await api.put(`/cours/${id}`, data);
        return res.data; // ✅ retourne le cours modifié
    } catch (err) {
        return rejectWithValue(err.response?.data?.message || 'Erreur');
    }
});

export const deleteCours = createAsyncThunk('cours/delete', async (id, { rejectWithValue }) => {
    try {
        await api.delete(`/cours/${id}`);
        return id; // ✅ retourne l'id pour filtrer dans le state
    } catch (err) {
        return rejectWithValue(err.response?.data?.message || 'Erreur');
    }
});

const coursSlice = createSlice({
    name: 'cours',
    initialState: { list: [], loading: false, error: null },
    reducers: {},
    extraReducers: (builder) => {
        const thunks = [fetchCours, addCours, updateCours, deleteCours];

        thunks.forEach(thunk => {
            builder
                .addCase(thunk.pending, (state) => { state.loading = true; state.error = null; })
                .addCase(thunk.rejected, (state, action) => { state.loading = false; state.error = action.payload; });
        });

        builder
            .addCase(fetchCours.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload; // ✅ tableau de cours
            })
            .addCase(addCours.fulfilled, (state, action) => {
                state.loading = false;
                state.list.push(action.payload); // ✅ ajoute le nouveau cours
            })
            .addCase(updateCours.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.list.findIndex(c => c._id === action.payload._id);
                if (index !== -1) state.list[index] = action.payload; // ✅ met à jour
            })
            .addCase(deleteCours.fulfilled, (state, action) => {
                state.loading = false;
                state.list = state.list.filter(c => c._id !== action.payload); // ✅ supprime
            });
    },
});

export const selectCours = (state) => state.cours.list;
export const selectCoursLoading = (state) => state.cours.loading;
export default coursSlice.reducer;