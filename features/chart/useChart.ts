// features/chart/useChart.ts
import { useQuery } from "@tanstack/react-query";
import { fetchChart } from "@/services/apiChart";
import { useAuth } from "@clerk/clerk-expo";

export const useChart = () => {
  const { getToken } = useAuth();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["chart"],
    queryFn: async () => {
      const token = await getToken();
      if (!token) throw new Error("No authentication token found");
      return fetchChart(token);
    },
  });

  return { isLoading, isError, error: error as Error, data };
};
