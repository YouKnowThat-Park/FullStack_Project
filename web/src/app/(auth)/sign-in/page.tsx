"use client";
import { AuthInputField } from "../_components/AuthInputField";
import { useForm } from "react-hook-form";
import { SignInFormValues, SignInSchema } from "../schemas/Sign-in_Schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

export default function Page() {
  // React Hook Form 사용
  const { register, handleSubmit } = useForm<SignInFormValues>({
    resolver: zodResolver(SignInSchema),
  });
  const router = useRouter();

  const onSubmit = async (data: { email: string; password: string }) => {
    try {
      const res = await fetch("/api/sign-in/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("로그인 실패");
      }

      router.push("/");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="border h-[660px]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center items-center border w-[550px] "
      >
        <AuthInputField label="Email" type="email" {...register("email")} />
        <AuthInputField
          label="Password"
          type="password"
          {...register("password")}
        />
        <button type="submit" className="border">
          Login
        </button>
      </form>
    </div>
  );
}
