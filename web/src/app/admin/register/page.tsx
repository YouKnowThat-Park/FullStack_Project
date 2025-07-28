"use client";

import { usePublicProductList } from "@/hooks/useProductList";

export interface Product {
  name: string;
  price: number;
}

export default function page() {
  const { data } = usePublicProductList();

  return (
    <div>
      <div>
        {data?.map((product: Product) => (
          <div key={product.name}>
            <p>{product.name}</p>
            <p>{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
