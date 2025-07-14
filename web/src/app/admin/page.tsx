"use client";
import { useRouter } from "next/navigation";

export default function page() {
  const route = useRouter();

  return (
    <div>
      <h1>admin page</h1>
      <div>
        <button onClick={() => route.push("/admin/register")}>상품 관리</button>
        <button onClick={() => route.push("/admin/user")}>유저 관리</button>
      </div>
    </div>
  );
}
