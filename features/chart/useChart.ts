import { useQuery } from "@tanstack/react-query";
import { fetchChart } from "@/services/apiChart";

export const useChart = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["chart"],
    queryFn: async () => {
      return fetchChart();
    },
  });

  return { isLoading, isError, error: error as Error, data };
};
