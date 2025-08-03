import { Category } from "@/type/Category";

export const fetchProductCategory = async (): Promise<Category[]> => {
  const res = await fetch("/categories", { cache: "no-store" });
  if (!res.ok) throw new Error("카테고리를 불러오지 못했습니다.");
  return res.json();
};
