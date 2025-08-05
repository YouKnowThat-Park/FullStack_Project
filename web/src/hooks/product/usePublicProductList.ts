import { fetchPublicProductList } from "@/lib/api/product/products-public";
import { useQuery } from "@tanstack/react-query";

export function usePublicProductList() {
  return useQuery({
    queryKey: ["products"],
    queryFn: fetchPublicProductList,
  });
}
