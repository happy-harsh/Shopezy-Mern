import { createSlice } from "@reduxjs/toolkit";

export const adminAuthSlice = createSlice({
    initialState: { isAdminAuth: false }, // Adjust the initial state structure
    name: 'adminAuthCheck',
    reducers: {
        adminLogin: (state) => {
            return { ...state, isAdminAuth: true }; // Return a new state object
        },
        adminLogout: (state) => {
            return { ...state, isAdminAuth: false }; // Return a new state object
        }
    }
});

export const { adminLogin, adminLogout } = adminAuthSlice.actions;

export default adminAuthSlice.reducer;
