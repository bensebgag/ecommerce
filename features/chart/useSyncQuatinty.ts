import { updateQuantityAPI } from "@/services/apiChart";
import { Chart } from "@/Util/type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Toast from "react-native-toast-message";

export const useSyncQuantity = (chartProductId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      chartProductId,
      quantity,
      opreationType,
    }: {
      chartProductId: number;
      quantity: number;
      opreationType: "plus" | "minus";
    }) => {
      return updateQuantityAPI(chartProductId, quantity, opreationType);
    },

    onMutate: async ({ quantity }: { quantity: number }) => {
      await queryClient.cancelQueries(["chart"]);

      const previousChart = queryClient.getQueryData<Chart>(["chart"]);

      const updatedProducts = previousChart?.products?.map((item) =>
        item.productId === chartProductId ? { ...item, quantity } : item,
      );

      queryClient.setQueryData(["chart"], {
        ...previousChart,
        products: updatedProducts,
      });

      return { previousChart, quantity };
    },

    onError: (err, variables, context) => {
      if (context?.previousChart) {
        queryClient.setQueryData(["chart"], context.previousChart);
      }
      Toast.show({ type: "error", text1: "Error updating quantity" });
    },

    onSettled: () => {
      queryClient.invalidateQueries(["chart"]);
    },
  });
};
