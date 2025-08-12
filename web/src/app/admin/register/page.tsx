"use client";

import { useAdminProduct } from "@/hooks/product/useAdminProduct";
import { useModalStore } from "@/store/modal-store";
import { AdminProduct } from "@/type/product/Product";
import { ProductModal } from "./_components/ProductModal";
import { useState } from "react";
import { EditProductModal } from "./_components/EditProductModal";
import { DeleteProductModal } from "./_components/DeleteProductModal";

export default function AdminProductsPage() {
  const { data } = useAdminProduct();
  const { modalType, open } = useModalStore();
  const [selectedProduct, setSelectedProduct] = useState<AdminProduct | null>(
    null
  );

  return (
    <div>
      <div>
        <button onClick={() => open("productModal")}>제품 등록</button>
      </div>
      {data?.map((product: AdminProduct) => (
        <ul key={product.id} className="border w-fit p-2 mt-2">
          <li>
            <div className="bg-gray-300">
              <div className="flex">
                <p>상품 정보: {product.name}</p>
                <p className="ml-10 text-sm mt-1">{product.category?.name}</p>
              </div>
              <div className="flex justify-between p-5">
                <p>{Number(product.price ?? 0).toLocaleString("ko-KR")} ₩</p>
                <p>⭐: {product.rating}</p>
                <p>재고 수량: {product.stock}</p>
                <p>판매된 수량: {product.sold_count}</p>
              </div>
            </div>
            <p>할인: {product.discount_price}</p>
            <p>수정 날짜: {product.updated_at}</p>
            <p>등록 관리자: {product.admin_user}</p>
            <p>게시 날짜: {product.created_at}</p>
            <p>상태: {product.is_active}</p>
            <p>제품 내용: {product.description}</p>
            <button onClick={() => open("deleteProductModal")}>삭제</button>
            <button
              onClick={() => {
                setSelectedProduct(product);
                open("editProductModal");
              }}
              className="border rounded-lg"
            >
              수정
            </button>
          </li>
        </ul>
      ))}
      {modalType === "productModal" && <ProductModal />}
      {modalType === "deleteProductModal" && selectedProduct && (
        <DeleteProductModal product={selectedProduct} />
      )}
      {modalType === "editProductModal" && selectedProduct && (
        <EditProductModal product={selectedProduct} />
      )}
    </div>
  );
}
