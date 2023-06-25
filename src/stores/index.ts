import { create } from "zustand";
import { createDockSlice, type DockSlice } from "./slices/dock";
import { createSystemSlice, type SystemSlice } from "./slices/system";
import { createUserSlice, type UserSlice } from "./slices/user";

export const useStore = create<DockSlice & SystemSlice & UserSlice>((...a) => ({
  ...createDockSlice(...a),
  ...createSystemSlice(...a),
  ...createUserSlice(...a)
}));
