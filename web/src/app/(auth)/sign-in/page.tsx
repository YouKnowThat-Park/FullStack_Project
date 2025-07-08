"use client";
import { AuthInputField } from "../_components/AuthInputField";
import { useForm } from "react-hook-form";
import { SignInFormValues, SignInSchema } from "../schemas/Sign-in_Schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

export default function Page() {
  const { register, handleSubmit } = useForm<SignInFormValues>({
    resolver: zodResolver(SignInSchema),
  });
  const router = useRouter();

  const onSubmit = async (data: { email: string; password: string }) => {
    try {
      const res = await fetch("http://localhost:8000/api/token/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });

      if (!res.ok) {
        const errPayload = await res.json();
        console.error("로그인 에러 페이로드:", errPayload);
        throw new Error("로그인 실패");
      }

      const tokens = await res.json();
      console.log("Access Token:", tokens.access);
      console.log("Refresh Token:", tokens.refresh);

      // TODO: HttpOnly 쿠키나 secure storage 등에 토큰 저장
      router.push("/");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <AuthInputField label="Email" type="email" {...register("email")} />
      <AuthInputField
        label="Password"
        type="password"
        {...register("password")}
      />
      <button type="submit">Login</button>
    </form>
  );
}
