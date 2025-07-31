"use client";
import { usePublicProductList } from "@/hooks/useProductList";
import { Product } from "@/type/Product";
import Image from "next/image";

export default function ProductsPage() {
  const { data } = usePublicProductList();

  return (
    <div>
      {data?.map((product: Product) => (
        <div key={product.name}>
          <p>{product.name}</p>
          <p>{product.price}</p>
          <Image
            src={product.images[0]?.image || "/placeholder.png"}
            alt={product.name}
            width={100}
            height={100}
          />
        </div>
      ))}
    </div>
  );
}
