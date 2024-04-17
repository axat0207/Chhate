import { create } from 'zustand'

const useNotificationDialogStore = create((set) => ({
  isNotification: false, 
  toggleIsNotification: () => set((state) => ({ isNotification: !state.isNotification })), 
}))

export default useNotificationDialogStore;
