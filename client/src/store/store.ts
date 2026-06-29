import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../features/auth/authslice";
import playerReducer from "../features/player/playerSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    player: playerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;