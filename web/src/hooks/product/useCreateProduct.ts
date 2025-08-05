import {
  createProduct,
  uploadProductImage,
} from "@/lib/api/product/products.admin";
import { CreateProductInput } from "@/type/product/Product";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      product: Omit<
        CreateProductInput,
        "sold_count" | "created_at" | "rating" | "updated_at" | "admin_user"
      >
    ) => {
      const { image, ...productData } = product;

      const createdProduct = await createProduct(productData);

      if (image instanceof File) {
        await uploadProductImage(image, createdProduct.id);
      }

      return createdProduct;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
    },
  });
};
