import { ModalStore } from "@/type/ModalStore";
import { create } from "zustand";

export const useModalStore = create<ModalStore>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));
