import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  editProductItem,
  getProductById,
} from "@/lib/api/product/products.admin";
import { CreateProductInput } from "@/type/product/Product";

export const useProductById = (productId: number) => {
  return useQuery<CreateProductInput>({
    queryKey: ["admin-products", productId],
    queryFn: () => getProductById(productId),
    enabled: !!productId,
  });
};

export const useEditProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      product,
      productId,
    }: {
      product: Partial<CreateProductInput>;
      productId: number;
    }) => editProductItem(product, productId),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
    },

    onError: (error) => {
      console.error("상품 수정 실패", error);
    },
  });
};
