import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import coursReducer from "../features/cours/coursSlice"
const store = configureStore({
  reducer: {
    auth: authReducer,
    cours: coursReducer
  },
});

export default store;