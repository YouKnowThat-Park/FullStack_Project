import { fetchUserSuspension } from "@/lib/api/user/user-suspension";
import { useMutation } from "@tanstack/react-query";

export const useUserSuspension = () => {
  return useMutation({
    mutationFn: fetchUserSuspension,
  });
};
