import { StateCreator } from "zustand";

export interface DockSlice {
  dockSize: number;
  dockMag: number;
  setDockSize: (v: number) => void;
  setDockMag: (v: number) => void;
}

export const createDockSlice: StateCreator<DockSlice> = (set) => ({
  dockSize: 50,
  dockMag: 2,
  setDockSize: (v) => set(() => ({ dockSize: v })),
  setDockMag: (v) => set(() => ({ dockMag: v }))
});
