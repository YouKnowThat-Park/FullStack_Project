import { fetchAdminProduct } from "@/lib/api/product/products.admin";
import { useQuery } from "@tanstack/react-query";

export const useAdminProduct = () => {
  return useQuery({
    queryKey: ["admin-products"],
    queryFn: fetchAdminProduct,
  });
};
