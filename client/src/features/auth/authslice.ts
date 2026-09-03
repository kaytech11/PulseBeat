import { createSlice } from "@reduxjs/toolkit";


interface User {
    id: string;
    username: string;
    email: string;
    role: "ARTIST" | "LISTENER";
    emailVerified: boolean;
}

interface AuthState {
    token: string | null;
    user: User | null;
}

const initialState: AuthState = {
    token: localStorage.getItem("token"),
    user: localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user")!)
        : null,
};


const authSlice  = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuth: (state, action) => {
            state.token = action.payload.token;
            state.user = action.payload.user;

            localStorage.setItem("token", action.payload.token);
            localStorage.setItem("user", JSON.stringify(action.payload.user));
        },
        logout: (state) => {
            state.token = null;
            state.user = null;

            localStorage.removeItem("token");
            localStorage.removeItem("user");
        },
    },
});

export const { setAuth, logout } = authSlice.actions;

export default authSlice.reducer;