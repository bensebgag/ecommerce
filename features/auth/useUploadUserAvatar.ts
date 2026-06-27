import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadUserAvatar } from "@/services/apiUser";

export function useUploadUserAvatar() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: FormData) => uploadUserAvatar(formData),
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);
    },
  });
}
