// src/features/auth/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    isAuthenticated: false,
    loading: true,
    isGuest: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        loginSuccess: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
            state.isGuest = false;
            state.loading = false;
        },
        logoutSuccess: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.isGuest = false;
            state.loading = false;
        },
        continueAsGuest: (state) => {
            state.isGuest = true;
        }
    },
});

export const { setLoading, loginSuccess, logoutSuccess, continueAsGuest } = authSlice.actions;
export default authSlice.reducer;