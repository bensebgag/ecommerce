import { fetchBill } from "@/services/apiBill";
import { BillDetail } from "@/Util/type";
import { useQuery } from "@tanstack/react-query";

export const useGetBill = () => {
  try {
    const { data, isLoading } = useQuery<BillDetail[]>({
      queryKey: ["bill"],
      queryFn: async () => {
        return fetchBill();
      },
    });

    return { isLoading, data };
  } catch (err) {
    throw err;
  }
};
