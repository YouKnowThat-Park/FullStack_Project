"use client";

import { useUserList } from "@/hooks/user/useUserList";
import { useUserSuspension } from "@/hooks/user/useUserSuspenion";
import { useState } from "react";

export default function page() {
  const [page, setPage] = useState<number>(1);
  const [openUserId, setOpenUserId] = useState<number | null>(null);

  const { data, refetch, isPending, error } = useUserList(page);
  const { mutate } = useUserSuspension();

  const users = data?.results ?? [];
  const totalPages = Math.ceil((data?.count ?? 1) / 10);

  const handleSuspend = (userId: number, days?: number) => {
    console.log("A.handleSuspend 실행", { userId, days });
    mutate(
      {
        userId,
        suspend: days !== undefined,
        suspendDays: days,
      },
      {
        onSuccess: () => {
          setOpenUserId(null);
          refetch();
        },
      }
    );
  };

  return (
    <div>
      <h1>사용자 목록</h1>

      <div>
        {users.map((user) => (
          <div key={user.id} className="border w-fit mb-4 p-2">
            <div className="flex flex-col">
              <div>
                <strong>Email:</strong> {user.email}
              </div>
              <div>
                <strong>Name:</strong> {user.name}
              </div>
              <div>
                <strong>Phone:</strong> {user.phone_number}
              </div>
              <div>
                <strong>Birth:</strong> {user.birth_date}
              </div>
              <div>
                {user.is_suspended && user.suspended_until
                  ? (() => {
                      const now = new Date();
                      const suspendedUntil = new Date(user.suspended_until);
                      const diffMs = suspendedUntil.getTime() - now.getTime();
                      const diffDays = Math.ceil(
                        diffMs / (1000 * 60 * 60 * 24)
                      );

                      return diffDays > 0
                        ? `정지(${diffDays}일 남음)`
                        : "정지 해제 예정";
                    })()
                  : "활성"}
              </div>
              <button
                onClick={() =>
                  setOpenUserId((prev) => (prev === user.id ? null : user.id))
                }
                className="border bg-gray-300 mt-2"
              >
                사용자 정지
              </button>
            </div>

            {openUserId === user.id && (
              <div key={`actions-${user.id}`} className="flex gap-2 mt-2">
                {[1, 3, 7, 30].map((day) => (
                  <button
                    key={`suspend-${user.id}-${day}`}
                    onClick={() => handleSuspend(user.id, day)}
                    className="px-2 py-1 border rounded"
                  >
                    {day}일 정지
                  </button>
                ))}
                <button
                  key={`unsuspend-${user.id}`}
                  onClick={() => handleSuspend(user.id)}
                  className="px-2 py-1 border rounded"
                >
                  정지 해제
                </button>
              </div>
            )}
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
