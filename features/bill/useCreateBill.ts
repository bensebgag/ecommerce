import { createNewBill } from "@/services/apiBill";
import { useAuth } from "@clerk/clerk-expo";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useCreateNewBill = () => {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();
  const { mutate, isLoading, isError, error } = useMutation({
    mutationKey: ["createBill"],
    mutationFn: async (chartId: number | undefined) => {
      const token = await getToken();
      if (!token) throw Error("No authentication token found");
      return createNewBill(token, chartId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["bill"],
      });
    },
  });

  return { mutate, isLoading, isError, error };
};
