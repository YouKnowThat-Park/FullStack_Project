"use client";

import { useAdminProduct } from "@/hooks/useAdminProduct";
import { AdminProduct } from "@/type/Product";

export default function AdminProductsPage() {
  const { data } = useAdminProduct();

  return (
    <div>
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
            <button className="border rounded-lg">수정</button>
          </li>
        </ul>
      ))}
    </div>
  );
}
