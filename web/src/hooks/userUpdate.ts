import { useMutation } from "@tanstack/react-query";

interface UpdateUser {
  name?: string;
  old_password?: string;
  new_password?: string;
}

export const useUpdate = () => {
  return useMutation({
    mutationFn: async (data: UpdateUser) => {
      const res = await fetch("/api/user/change", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result?.error || "Update failed");
      }

      return result;
    },
  });
};
