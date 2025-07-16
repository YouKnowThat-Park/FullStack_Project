import { fetchUserSuspension } from "@/lib/api/user-suspension";
import { useMutation } from "@tanstack/react-query";

export const useUserSuspension = () => {
  return useMutation({
    mutationFn: fetchUserSuspension,
  });
};
