import { create } from "zustand";
import { createDockSlice, type DockSlice } from "./slices/dock";
import { createSystemSlice, type SystemSlice } from "./slices/system";

export const useStore = create<DockSlice & SystemSlice>((...a) => ({
  ...createDockSlice(...a),
  ...createSystemSlice(...a)
}));
