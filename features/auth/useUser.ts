import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/services/apiUser";

export function useUser() {
  const { data, isLoading } = useQuery({
    queryKey: ["user"],

    queryFn: async () => {
      return getUser();
    },
  });
  return { data, isLoading };
}
