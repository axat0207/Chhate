import { create } from 'zustand'

const useGroupAddMemberDialog = create((set) => ({
  isaddMemberDialog: false, 
  toggleIsaddMemberDialog: () => set((state) => ({ isaddMemberDialog: !state.isaddMemberDialog })), 
}))

export default useGroupAddMemberDialog;
