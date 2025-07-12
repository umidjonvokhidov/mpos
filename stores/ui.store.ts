import { create } from 'zustand';

export const useUIStore = create<UIStore>((set) => ({
  isLoading: true,
  setIsLoading: (loading) => {
    set({ isLoading: loading });
  },
}));
