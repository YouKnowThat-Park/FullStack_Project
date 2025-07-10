"use client";
import { useUser } from "@/hooks/useUser";
import { AuthInputField } from "../(auth)/_components/AuthInputField";
import { useForm } from "react-hook-form";

export default function page() {
  const { register } = useForm();
  const { data, isLoading, error } = useUser();

  const onSubmit = async () => {
    try {
    } catch {}
  };

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러 발생: {(error as Error).message}</div>;
  if (!data) return null;
  return (
    <div>
      <h1>마이페이지</h1>
      <p>이름: {data.name}</p>
      <AuthInputField label="이름 변경" type="text" {...register("name")} />
      <AuthInputField
        label="기존 비밀번호"
        type="password"
        {...register("old_password")}
      />
      <AuthInputField
        label="기존 비밀번호"
        type="password"
        {...register("new_password")}
      />

      <button type="submit"></button>
    </div>
  );
}
