import { configureStore } from "@reduxjs/toolkit";
import systemReducer from "./slices/system";
import dockReducer from "./slices/dock";

export const store = configureStore({
  reducer: {
    system: systemReducer,
    dock: dockReducer
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
