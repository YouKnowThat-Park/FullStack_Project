import { UpdateUser } from "@/type/UpdateUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// PATCH를 사용한 이유는 일부 필드만 수정할꺼라서
// PUT은 전체 필드를 덮어쓰기 때문에 내정보 수정에서 불필요
// GET(useQuery)을 제외한 모든 PATCH, POST, PUT, DELETE는 useMutation 사용

export const useUpdate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateUser) => {
      const res = await fetch("/api/user/change-info", {
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
};
