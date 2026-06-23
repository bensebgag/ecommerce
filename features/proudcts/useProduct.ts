import { useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { fetchProductById } from "@/services/apiProducts";
import { Product } from "@/Util/type";

export function useProduct() {
  const { id } = useLocalSearchParams();

  const { data, isLoading } = useQuery<Product>({
    queryKey: ["product"],
    queryFn: async () => {
      return fetchProductById(+id);
    },
  });

  return { isLoading, data };
}
