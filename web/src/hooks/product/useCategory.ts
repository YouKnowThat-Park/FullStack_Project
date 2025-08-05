import { fetchProductCategory } from "@/lib/api/product/products-category";
import { useQuery } from "@tanstack/react-query";

export const useCategory = () => {
  return useQuery({
    queryKey: ["category"],
    queryFn: fetchProductCategory,
  });
};
