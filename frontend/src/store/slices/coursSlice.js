import { createSlice } from '@reduxjs/toolkit';
import { fetchAllCours, fetchCoursByTitle, fetchCoursByCategory, createCours, updateCours, deleteCours } from '../thunks/coursThunks';

const initialState = {
    cours: [],
    selectedCours: null,
    loading: false,
    error: null,
    totalPages: 0,
    currentPage: 1,
};

const coursSlice = createSlice({
    name: 'cours',
    initialState,
    reducers: {
        setPage(state, action) {
            state.currentPage = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllCours.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(fetchAllCours.fulfilled, (state, action) => {
                state.loading = false;
                state.cours = action.payload;
            })
            .addCase(fetchAllCours.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchCoursByTitle.fulfilled, (state, action) => {
                state.selectedCours = action.payload;
            })
            .addCase(fetchCoursByCategory.fulfilled, (state, action) => {
                state.cours = action.payload;
            })
            .addCase(createCours.fulfilled, (state, action) => {
                state.cours.push(action.payload);
            })
            .addCase(updateCours.fulfilled, (state, action) => {
                const index = state.cours.findIndex(c => c.title === action.payload.title);
                if (index !== -1) {
                    state.cours[index] = action.payload;
                }
            })
            .addCase(deleteCours.fulfilled, (state, action) => {
                state.cours = state.cours.filter(c => c.title !== action.payload);
            });
    }
});

export const { setPage } = coursSlice.actions;

export const selectAllCours = (state) => state.cours.cours;
export const selectSelectedCours = (state) => state.cours.selectedCours;
export const selectCoursLoading = (state) => state.cours.loading;
export const selectCoursError = (state) => state.cours.error;
export const selectCurrentPage = (state) => state.cours.currentPage;

export default coursSlice.reducer;
