import { createSlice } from "@reduxjs/toolkit";

// User auth Check 

export const authSlice = createSlice({
    initialState: { isAuthenticated: false }, // Adjust the initial state structure
    name: 'authCheck',
    reducers: {
        login: (state) => {
            return { ...state, isAuthenticated: true }; // Return a new state object
        },
        logout: (state) => {
            return { ...state, isAuthenticated: false }; // Return a new state object
        }
    }
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
