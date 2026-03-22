import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import coursReducer from "./slices/coursSlice";
import feedbackReducer from "./slices/feedbackSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        cours: coursReducer,
        feedback: feedbackReducer,
    },
});
