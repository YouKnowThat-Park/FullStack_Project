import { PaginatedUserResponse } from "@/type/user";

export const fetchUserList = async (
  page: number = 1
): Promise<PaginatedUserResponse> => {
  const res = await fetch(
    `http://localhost:8000/api/users/admin/users/?page=${page}`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch users");
  }

  return res.json();
};
