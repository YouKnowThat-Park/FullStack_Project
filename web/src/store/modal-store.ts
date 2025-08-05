import { ModalStore, ModalType } from "@/type/modal/ModalStore";
import { create } from "zustand";

export const useModalStore = create<ModalStore>((set) => ({
  modalType: null,
  open: (type: ModalType) => set({ modalType: type }),
  close: () => set({ modalType: null }),
}));
