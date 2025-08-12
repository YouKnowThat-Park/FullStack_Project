import { useModalStore } from "@/store/modal-store";
import { EditProductProps } from "./EditProductModal";
import { useDeleteProduct } from "@/hooks/product/useDeleteProduct";

export const DeleteProductModal = ({ product }: EditProductProps) => {
  const { mutate: deleteProduct } = useDeleteProduct();
  const { close } = useModalStore();

  const handleDelete = () => {
    deleteProduct(Number(product.id), {
      onSuccess: () => {
        close();
      },
      onError: (err) => {
        console.error("삭제 실패", err);
        alert("삭제에 실패했습니다.");
      },
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div className="bg-white w-[600px] h-[520px] p-6 rounded-lg shadow-lg space-y-3">
        <div>
          <p className="text-red-500">해당 상품을 정말로 삭제하시겠습니까?</p>
          <p>상품 명: {product.name} </p>
        </div>
        <div className="flex gap-10">
          <button onClick={close} className="border">
            취소 하기
          </button>
          <button onClick={() => handleDelete()} className="border">
            삭제 하기
          </button>
        </div>
      </div>
    </div>
  );
};
