import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const dockSlice = createSlice({
  name: "dock",
  initialState: {
    size: 50,
    mag: 2
  },
  reducers: {
    setDockSize: (state, action: PayloadAction<number>) => {
      state.size = action.payload;
    },
    setDockMag: (state, action: PayloadAction<number>) => {
      state.mag = action.payload;
    }
  }
});

export const { setDockSize, setDockMag } = dockSlice.actions;

export default dockSlice.reducer;
