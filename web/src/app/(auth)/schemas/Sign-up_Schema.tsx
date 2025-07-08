import z from "zod";
import { SignInSchema } from "./Sign-in_Schema";

export const SignUpSchema = SignInSchema.extend({
  name: z
    .string()
    .min(2, "이름은 최소 2자리 이상이어야 합니다.")
    .nonempty({ message: "닉네임을 입력해주세요." }),

  confirmPassword: z
    .string()
    .nonempty({ message: "비밀번호가 일치하는지 확인해주세요." }),

  phone_number: z
    .string()
    .nonempty({ message: "전화번호를 입력해주세요." })
    .regex(/^01[0-9]-?\d{3,4}-?\d{4}$/, {
      message: "전화번호 형식이 올바르지 않습니다.",
    }),

  birth_date: z
    .string()
    .nonempty({ message: "생년월일을 입력해주세요." })
    .regex(/^\d{4}-\d{2}-\d{2}$/, {
      message: "날짜 형식이 올바르지 않습니다. 예: 1990-01-01",
    }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "비밀번호가 일치하지 않습니다.",
  path: ["confirmPassword"],
});

export type SignUpFormValues = z.infer<typeof SignUpSchema>;
