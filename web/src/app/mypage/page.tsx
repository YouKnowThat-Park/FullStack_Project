"use client";
import { useUser } from "@/hooks/user/useUser";
import { AuthInputField } from "../(auth)/_components/AuthInputField";
import { useForm } from "react-hook-form";
import { useUpdate } from "@/hooks/user/userUpdate";
import { UpdateUser } from "@/type/user/UpdateUser";

export default function page() {
  // React Hook Form 사용
  const { register, handleSubmit } = useForm<UpdateUser>();

  // 사용자 데이터 GET
  const { data, isLoading, error } = useUser();

  // 사용자 데이터 PATCH
  const { mutate } = useUpdate();

  const onSubmit = (formData: UpdateUser) => {
    mutate(formData);
  };

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러 발생: {(error as Error).message}</div>;
  if (!data) return null;

  // AuthInputField 재사용 하기
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>마이페이지</h1>
      <p>이름: {data.name}</p>
      <AuthInputField label="이름 변경" type="text" {...register("name")} />
      <AuthInputField
        label="기존 비밀번호"
        type="password"
        {...register("old_password")}
      />
      <AuthInputField
        label="새로운 비밀번호"
        type="password"
        {...register("new_password")}
      />
      <button type="submit">버튼</button>
    </form>
  );
}
