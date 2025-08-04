import { createProduct } from "@/lib/api/products.admin";
import { AdminProduct } from "@/type/Product";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (
      product: Omit<
        AdminProduct,
        "sold_count" | "created_at" | "rating" | "updated_at" | "admin_user"
      >
    ) => createProduct(product),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
    },
  });
};
