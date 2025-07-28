export const fetchPublicProductList = async () => {
  const res = await fetch("http://localhost:8000/api/products/", {
    method: "GET",
  });

  if (!res.ok) {
    throw new Error("상품 정보를 불러오지 못했습니다.");
  }

  return res.json();
};
