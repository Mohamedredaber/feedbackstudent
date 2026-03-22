import axios from 'axios';
import { store } from '../store';
import { logout } from '../store/slices/authSlice';

const api = axios.create({
    baseURL: 'http://localhost:5000/api'
});

api.interceptors.request.use(
    (config) => {
        const state = store.getState();
        const token = state.auth.token || localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            store.dispatch(logout());
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api;
