import { create } from 'zustand'

const useSearchDialogStore = create((set) => ({
  isSearch: false, 
  toggleSearch: () => set((state) => ({ isSearch: !state.isSearch })), 
}))

export default useSearchDialogStore;
