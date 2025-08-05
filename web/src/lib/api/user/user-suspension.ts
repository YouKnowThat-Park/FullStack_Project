export interface SuspendParams {
  userId: number;
  suspend: boolean;
  suspendDays?: number;
}

export type SuspendRequestBody =
  | { suspend: false }
  | { suspend: true; suspend_days: number };

export const fetchUserSuspension = async ({
  userId,
  suspend,
  suspendDays,
}: SuspendParams) => {
  let body: SuspendRequestBody;

  if (suspend) {
    if (suspendDays === undefined) {
      throw new Error("suspendDays is required when suspend is true");
    }
    body = {
      suspend: true,
      suspend_days: suspendDays,
    };
  } else {
    body = { suspend: false };
  }
  const res = await fetch(
    `http://localhost:8000/api/users/admin/users/${userId}/toggle-suspension/`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );

  if (!res.ok) {
    throw new Error("유저 정지 상태 변경 실패");
  }

  return res.json();
};
