export type ModalType =
  | "productModal"
  | "headerModal"
  | "editProductModal"
  | "deleteProductModal"
  | null;

export interface ModalStore {
  modalType: ModalType;
  open: (type: Exclude<ModalType, null>) => void;
  close: () => void;
}
