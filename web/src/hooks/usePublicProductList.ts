import { fetchPublicProductList } from "@/lib/api/products-public";
import { useQuery } from "@tanstack/react-query";

export function usePublicProductList() {
  return useQuery({
    queryKey: ["products"],
    queryFn: fetchPublicProductList,
  });
}
