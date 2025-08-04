import { AdminProduct, CreateProductInput } from "@/type/Product";

export const fetchAdminProduct = async (): Promise<AdminProduct[]> => {
  const res = await fetch("http://localhost:8000/api/products/admin/", {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("상품 목록을 불러오지 못했습니다.");
  return res.json();
};

export const createProduct = async (
  product: Omit<
    CreateProductInput,
    "sold_count" | "created_at" | "rating" | "updated_at" | "admin_user"
  >
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
