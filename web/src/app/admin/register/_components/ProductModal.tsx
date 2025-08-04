import {
  ProductFormValues,
  ProductSchema,
} from "@/app/schemas/product/Product_Schema";
import { useCategory } from "@/hooks/useCategory";
import { useCreateProduct } from "@/hooks/useCreateProduct";
import { useUser } from "@/hooks/useUser";
import { useModalStore } from "@/store/modal-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

export const ProductModal = () => {
  const { close } = useModalStore();
  const { data: user } = useUser();
  const { data: categories } = useCategory();
  const { mutate } = useCreateProduct();
  const [categoryId, setCategoryId] = useState<number>(0);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(ProductSchema),
  });

  const onSubmit = (data: ProductFormValues) => {
    const finalData = {
      ...data,
      category: categoryId,
      is_active: true,
    };
    mutate(finalData);
    close();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white w-[600px] h-[520px] p-6 rounded-lg shadow-lg space-y-3"
      >
        <div className="flex justify-between">
          <p className="text-xl font-bold">상품 등록</p>
          <button type="button" onClick={close}>
            닫기
          </button>
        </div>

        {/* <input
          type="file"
          accept="image/*"
          {...register("image")}
          className="border w-full"
          onChange={(e) => {
            if (e.target.files?.[0]) {
              setValue("image", e.target.files[0]);
            }
          }}
        />
        {errors.image && (
          <p className="text-red-500 text-sm">{errors.image.message}</p>
        )} */}

        <input
          type="text"
          placeholder="제품 이름"
          {...register("name")}
          className="border w-full"
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}

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

        <div className="grid grid-cols-3 gap-2">
          <input
            type="number"
            placeholder="수량"
            {...register("stock", { valueAsNumber: true })}
            className="border"
          />
          <input
            type="number"
            placeholder="가격"
            {...register("price", { valueAsNumber: true })}
            className="border"
          />
          <input
            type="number"
            placeholder="할인 %"
            {...register("discount_price", { valueAsNumber: true })}
            className="border"
          />
        </div>
        {(errors.stock || errors.price || errors.discount_price) && (
          <div className="text-red-500 text-sm">
            {errors.stock?.message}
            {errors.price?.message}
            {errors.discount_price?.message}
          </div>
        )}

        <textarea
          placeholder="제품 설명"
          {...register("description")}
          className="border w-full h-20"
        />
        {errors.description && (
          <p className="text-red-500 text-sm">{errors.description.message}</p>
        )}

        <p className="text-sm">상품 등록자: {user?.name}</p>

        <button type="submit" className="mt-2 border rounded px-4 py-1">
          등록하기
        </button>
      </form>
    </div>
  );
};
