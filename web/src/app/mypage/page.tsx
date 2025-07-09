import { useUser } from "@/hooks/useUser";

export default function page() {
  const { data, isLoading, error } = useUser();

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러 발생: {(error as Error).message}</div>;
  if (!data) return null;
  return (
    <div>
      <h1>마이페이지</h1>
      <p>이름: {data.name}</p>
    </div>
  );
}
