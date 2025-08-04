import { Category } from "@/type/Category";

export const fetchProductCategory = async (): Promise<Category[]> => {
  const res = await fetch("http://localhost:8000/api/products/categories/", {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("카테고리를 불러오지 못했습니다.");
  return res.json();
};
