import { useUser } from "@/hooks/useUser";
import { useModalStore } from "@/store/modal-store";

export const ProductModal = () => {
  const { close } = useModalStore();
  const { data } = useUser();
  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div className="bg-white w-[600px] h-[400px] p-6 rounded-lg shadow-lg">
        <p>상품 등록</p> <button onClick={close}>닫기</button>
        <input type="file" accept="image/*" className="border" />
        <div className="border bg-gray-300">
          <input type="number" placeholder="수량" className="border" />
          <input type="number" placeholder="가격" />
          <input type="number" placeholder="할인 %" />
        </div>
        <textarea placeholder="제품 설명" className="border" />
        <p>상품 등록자: {data.name}</p>
      </div>
    </div>
  );
};
