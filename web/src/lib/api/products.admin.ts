import { AdminProduct } from "@/type/Product";

export const fetchAdminProduct = async (): Promise<AdminProduct[]> => {
  const res = await fetch("/admin", { cache: "no-store" });
  if (!res.ok) throw new Error("상품 목록을 불러오지 못했습니다.");
  return res.json();
};

export const createProduct = async (
  product: Omit<AdminProduct, "id" | "created_at">
) => {
  const res = await fetch("admin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data?.detail || "상품 등록을 실패했습니다.");
  }
};
