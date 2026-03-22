import { createSlice } from '@reduxjs/toolkit';
import { loginUser, registerUser } from '../thunks/authThunks';

const initialState = {
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
    token: localStorage.getItem('token') || null,
    role: localStorage.getItem('role') || null,
    loading: false,
    error: null,
    isAuthenticated: !!localStorage.getItem('token'),
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials(state, action) {
            const { user, token } = action.payload;
            state.user = user;
            state.token = token;
            state.role = user.role;
            state.isAuthenticated = true;
            localStorage.setItem('token', token);
            localStorage.setItem('role', user.role);
            localStorage.setItem('user', JSON.stringify(user));
        },
        logout(state) {
            state.user = null;
            state.token = null;
            state.role = null;
            state.isAuthenticated = false;
            localStorage.removeItem('token');
            localStorage.removeItem('role');
            localStorage.removeItem('user');
        },
        setLoading(state, action) {
            state.loading = action.payload;
        },
        setError(state, action) {
            state.error = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                const { user, token } = action.payload;
                state.user = user;
                state.token = token;
                state.role = user.role;
                state.isAuthenticated = true;
                localStorage.setItem('token', token);
                localStorage.setItem('role', user.role);
                localStorage.setItem('user', JSON.stringify(user));
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Login failed';
            })
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Registration failed';
            });
    }
});

export const { setCredentials, logout, setLoading, setError } = authSlice.actions;

export const selectUser = (state) => state.auth.user;
export const selectToken = (state) => state.auth.token;
export const selectRole = (state) => state.auth.role;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectAuthLoading = (state) => state.auth.loading;
export const selectAuthError = (state) => state.auth.error;

export default authSlice.reducer;
