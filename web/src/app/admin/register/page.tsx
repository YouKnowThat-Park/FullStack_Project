"use client";

import { useAdminProduct } from "@/hooks/useAdminProduct";
import { AdminProduct } from "@/type/Product";

export default function AdminProductsPage() {
  const { data } = useAdminProduct();

  return (
    <div>
      {data?.map((product: AdminProduct) => (
        <div key={product.id}>
          <p>{product.name}</p>
          <p>{product.category?.name}</p>
          <p>{product.rating}</p>
          <p>{product.stock}</p>
          <p>{product.sold_count}</p>
          <p>{product.discount_price}</p>
          <p>{product.updated_at}</p>
          <p>{product.admin_user}</p>
          <p>{product.created_at}</p>
          <p>{product.price}</p>
          <p>{product.is_active}</p>
          <p>{product.description}</p>
        </div>
      ))}
    </div>
  );
}
