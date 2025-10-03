import {
  AdminProduct,
  CreateProductInput,
  ProductImage,
} from "@/type/product/Product";

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
  const res = await fetch("http://localhost:8000/api/products/admin/", {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data?.detail || "상품 등록을 실패했습니다.");
  }
  return await res.json();
};

export const uploadProductImage = async (image: File, productId: number) => {
  const formData = new FormData();
  formData.append("image", image);
  formData.append("product_id", String(productId));

  const res = await fetch("http://localhost:8000/api/products/images/", {
    method: "POST",
    credentials: "include",
    body: formData,
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data?.message || "이미지 등록에 실패했습니다.");
  }
  return await res.json();
};

export const editProductItem = async (
  product: Partial<CreateProductInput>,
  productId: number
) => {
  const res = await fetch(`http://localhost:8000/api/products/${productId}/`, {
    method: "PATCH",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  if (!res.ok) {
    const data = await res.json();

    const messages: Record<number, string> = {
      400: "입력한 정보가 올바르지 않습니다.",
      401: "로그인이 필요합니다.",
      403: "관리자 권한이 필요합니다.",
      404: "상품을 찾을 수 없습니다.",
      500: "서버 오류가 발생했습니다.",
    };
    const message =
      messages[res.status] ?? data?.detail ?? "상품 수정에 실패했습니다.";
    throw new Error(message);
  }
  return await res.json();
};

export const getProductById = async (
  productId: number
): Promise<CreateProductInput> => {
  const res = await fetch(`http://localhost:8000/api/products/${productId}/`, {
    cache: "no-store",
    credentials: "include",
  });
  if (!res.ok) {
    throw new Error("상품 정보를 불러오지 못했습니다.");
  }
  const data = await res.json();
  return data;
};

export const productDelete = async (productId: number) => {
  const res = await fetch(`http://localhost:8000/api/products/${productId}/`, {
    method: "DELETE",
    credentials: "include",
  });
  if (!res.ok) {
    throw new Error("삭제 실패");
  }

  return true;
};
