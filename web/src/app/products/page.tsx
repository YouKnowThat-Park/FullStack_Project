"use client";
import { usePublicProductList } from "@/hooks/product/usePublicProductList";
import { PublicProduct } from "@/type/product/Product";
import Image from "next/image";

export default function ProductsPage() {
  const { data } = usePublicProductList();

  return (
    <div className="grid grid-cols-4 gap-4 p-1">
      {data?.map((product: PublicProduct) => (
        <div key={product.name} className="border">
          <div>
            <p>{product.name}</p>
            <p>가격: {Number(product.price).toLocaleString("ko-KR")}원</p>
            <Image
              src={product.images[0]?.image || "/placeholder.png"}
              alt={product.name}
              width={100}
              height={100}
            />
            <div className="flex">
              <span className="ml-auto text-sm border-b border-b-black">
                Click
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
