"use client";

import { useUserList } from "@/hooks/useUserList";
import { useState } from "react";

export default function page() {
  const [page, setPage] = useState<number>(1);
  const { data, isPending, error } = useUserList(page);

  const users = data?.results ?? [];
  const totalPages = Math.ceil(data?.count ?? 1 / 10);

  return (
    <div>
      <h1>사용자 목록</h1>
      <div>
        {users.map((user) => (
          <div>
            <p>
              <strong>Email: </strong> {user.email}
              <strong>Name: </strong> {user.name}
              <strong>Phone: </strong> {user.phone_number}
              <strong>Birth: </strong> {user.birth_date}
            </p>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
        >
          이전
        </button>
        <span>
          Page {page} / {totalPages}
        </span>
        <button
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          disabled={page === totalPages}
        >
          다음
        </button>
      </div>
    </div>
  );
}
