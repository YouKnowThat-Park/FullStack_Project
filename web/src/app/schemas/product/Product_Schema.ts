import z from "zod";

export const ProductSchema = z.object({
  name: z
    .string()
    .nonempty({ message: "제품 이름을 입력해주세요." })
    .max(20, { message: "제품 이름은 20자 이내여야 합니다." })
    .trim(),
  category_id: z.number({ required_error: "카테고리를 선택해주세요." }),
  stock: z
    .number()
    .int()
    .min(0, { message: "재고 수량은 0 이상이어야 합니다." }),
  price: z.number().min(0, { message: "가격은 0원 이상이어야 합니다." }),
  discount_price: z
    .number()
    .min(0)
    .max(100, { message: "할인율은 0~100% 사이여야 합니다." }),
  description: z.string().min(1, { message: "제품 설명을 입력해주세요." }),
  image: z
    .any()
    .refine((file) => file instanceof File, "이미지 파일을 업로드해주세요.")
    .optional(),
});

export type ProductFormValues = z.infer<typeof ProductSchema>;
