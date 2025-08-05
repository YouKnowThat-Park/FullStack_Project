import { fetchUserList } from "@/lib/api/user/user-List";
import { useQuery } from "@tanstack/react-query";

export const useUserList = (page: number) => {
  return useQuery({
    queryKey: ["users", page],
    queryFn: () => fetchUserList(page),
  });
};
