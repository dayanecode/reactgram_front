import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/authSlice"

export const store = configureStore({
    reducer: {
        // o auth corresponde ao authReducer
        auth: authReducer,
    },
});

