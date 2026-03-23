import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import coursReducer from '../features/cours/coursSlice';
import feedbackReducer from '../features/feedback/feedbackSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    cours: coursReducer,
    feedback: feedbackReducer,
  },
});

export default store;