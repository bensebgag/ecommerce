import { fetchBill } from "@/services/apiBill";
import { BillDetail } from "@/Util/type";
import { useAuth } from "@clerk/clerk-expo";
import { useQuery } from "@tanstack/react-query";

export const useGetBill = () => {
  try {
    const { getToken } = useAuth();

    const { data, isLoading } = useQuery<BillDetail[]>({
      queryKey: ["bill"],
      queryFn: async () => {
        const token = await getToken();
        return fetchBill(token);
      },
    });

    return { isLoading, data };
  } catch (err) {
    throw err;
  }
};
