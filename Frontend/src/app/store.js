import { configureStore } from "@reduxjs/toolkit";
import authReader from "../features/auth/authSlice";

export const store = configureStore({
    reducer: {
        auth: authReader,
    }
});