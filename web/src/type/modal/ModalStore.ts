export type ModalType =
  | "productModal"
  | "headerModal"
  | "EditProductModal"
  | null;

export interface ModalStore {
  modalType: ModalType;
  open: (type: Exclude<ModalType, null>) => void;
  close: () => void;
}
