import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser } from "@/services/apiUser";
import { UserUpdateInput } from "@/Util/type";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UserUpdateInput) => updateUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);
    },
  });
}
