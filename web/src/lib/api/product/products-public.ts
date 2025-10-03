import { Category } from "@/type/product/Category";
import { ProductImage } from "@/type/product/Product";

export interface PublicProductType {
  id: number;
  name: string;
  description: string;
  price: number;
  discount_price: number | null;
  sold_count: number;
  rating: number;
  category: Category | null;
  images: ProductImage[];
}

export const fetchPublicProduct = async (): Promise<PublicProductType> => {
  const res = await fetch("http://localhost:8000/api/products/", {
    method: "GET",
    cache: "no-store",
  });

  if (!res.ok) {
    const messages: Record<number, string> = {
      400: "잘못된 요청 입니다.",
      404: "요청한 URL을 찾을 수 없습니다.",
      500: "서버 오류 입니다.",
    };
    throw new Error(messages[res.status] ?? "알 수 없는 오류");
  }

  return res.json();
};
