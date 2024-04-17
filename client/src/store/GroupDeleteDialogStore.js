import { create } from 'zustand'

const useGroupDeleteDialogStore = create((set) => ({
  isDeleteDialog: false, 
  toggleIsDeleteDialog: () => set((state) => ({ isDeleteDialog: !state.isDeleteDialog })), 
}))

export default useGroupDeleteDialogStore;
