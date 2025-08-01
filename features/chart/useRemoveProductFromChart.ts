import { deleteProductFromChart } from "@/services/apiChart";
import { useAuth } from "@clerk/clerk-expo";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Toast from "react-native-toast-message";

export const useRemoveProductFromChart = (
  ProductId: number,
  chartId: number
) => {
  try {
    const { getToken } = useAuth();
    const queryClient = useQueryClient();
    const { mutate: deleteProductFromChartMutaion, isLoading } = useMutation({
      mutationKey: ["removeProductFromChart"],
      mutationFn: async () => {
        const token = await getToken();
        return deleteProductFromChart(ProductId, chartId, token);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["chart"],
        });
      },
      onError(err: Error) {
        Toast.show({
          text1: err?.message || "try agian",
        });
      },
    });

    return { deleteProductFromChartMutaion, isLoading };
  } catch (err) {
    throw err;
  }
};
