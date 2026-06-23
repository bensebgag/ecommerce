import { createNewBill } from "@/services/apiBill";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useCreateNewBill = () => {
  const queryClient = useQueryClient();
  const { mutate, isLoading, isError, error } = useMutation({
    mutationKey: ["createBill"],
    mutationFn: async (chartId: number | undefined) => {
      return createNewBill(chartId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["bill"],
      });
    },
  });

  return { mutate, isLoading, isError, error };
};
