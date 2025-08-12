import {
  ProductFormValues,
  ProductSchema,
} from "@/app/schemas/product/Product_Schema";
import { useCategory } from "@/hooks/product/useCategory";
import { useEditProduct } from "@/hooks/product/useEditProdyct";
import { useModalStore } from "@/store/modal-store";
import { AdminProduct } from "@/type/product/Product";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export interface EditProductProps {
  product: AdminProduct;
}

export const EditProductModal = ({ product }: EditProductProps) => {
  const { close } = useModalStore();
  const { data: categories } = useCategory();
  const { mutate } = useEditProduct();
  const [categoryId, setCategoryId] = useState<number>(
    product.category?.id || 0
  );

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProductFormValues>({
    defaultValues: {
      name: product.name,
      price: product.price,
      stock: product.stock,
      discount_price: product.discount_price,
      description: product.description,
      category_id: product.category?.id || 0,
    },
    resolver: zodResolver(ProductSchema),
  });

  useEffect(() => {
    setValue("category_id", categoryId);
  }, [categoryId, setValue]);

  const onSubmit = (formData: ProductFormValues) => {
    mutate(
      {
        productId: Number(product.id),
        product: {
          ...formData,
          category: categoryId,
        },
      },
      {
        onSuccess: () => {
          close();
        },
        onError: (err) => {
          console.error("상품 수정 실패", err);
        },
      }
    );
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white w-[600px] h-[520px] p-6 rounded-lg shadow-lg space-y-3"
      >
        <input {...register("name")} className="border" />
        <input
          type="number"
          {...register("price", { valueAsNumber: true })}
          className="border"
        />
        <input
          type="number"
          {...register("discount_price", { valueAsNumber: true })}
          className="border"
        />
        <input
          type="number"
          {...register("stock", { valueAsNumber: true })}
          className="border"
        />

        <select
          className="border w-full"
          value={categoryId}
          onChange={(e) => {
            const value = Number(e.target.value);
            setCategoryId(value);
            setValue("category_id", value);
          }}
        >
          <option value="">카테고리 선택</option>
          {categories?.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
        {errors.category_id && (
          <p className="text-red-500 text-sm">{errors.category_id.message}</p>
        )}

        <textarea {...register("description")} />
        <button type="submit">수정완료</button>
        <button onClick={close}>닫기</button>
      </form>
    </div>
  );
};
