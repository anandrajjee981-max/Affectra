import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    token: null,
    loading: false,
    error: null,
    isAuthenticated: false
};
export const authslice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        // Login/Register Start
        authStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        // Login/Register Success
        authSuccess: (state, action) => {
            state.loading = false;
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isAuthenticated = true;
        },

        // Login/Register Failed
        authFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        // Logout
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            state.loading = false;
            state.error = null;
        }
    }
});

// Export Actions

export const {

    authStart,

    authSuccess,

    authFailure,

    logout

} = authslice.actions;

// Export Reducer

export default authslice.reducer;