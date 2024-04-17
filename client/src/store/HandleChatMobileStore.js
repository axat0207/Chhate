import { create } from "zustand";

const useHandleChatMobileStore = create((set) => ({
  isMobile: false,
  toggleIsMobile: () => set((state) => ({ isMobile: !state.isMobile })),
  closeIsMobile: () => set(() => ({ isMobile: false })),
  openIsMobile: () => set(() => ({ isMobile: true }))

}));

export default useHandleChatMobileStore;
