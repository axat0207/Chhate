import { create } from 'zustand'

const useGroupDialogStore = create((set) => ({
  isGroup: false, 
  toggleGroup: () => set((state) => ({ isGroup: !state.isGroup })), 
}))

export default useGroupDialogStore;
