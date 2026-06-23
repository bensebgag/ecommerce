import { useQuery } from "@tanstack/react-query";
import { Category } from "@/Util/type";
import { getGategories } from "@/services/apiCategory";

export function useGategories() {
  const { isLoading, data, isError, error } = useQuery<Category[]>({
    queryKey: ["category"],
    queryFn: async () => {
      return getGategories();
    },
  });

  return { isLoading, data, isError, error };
}
