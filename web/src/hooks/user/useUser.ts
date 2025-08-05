import { getUser } from "@/lib/api/user/user";
import { useQuery } from "@tanstack/react-query";

export function useUser() {
  return useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });
}
