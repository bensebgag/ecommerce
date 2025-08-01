import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "@/services/apiProducts";
import { useLocalSearchParams } from "expo-router";
import { Product } from "@/Util/type";
import { useAuth } from "@clerk/clerk-expo";

export function useProducts() {
  const { getToken } = useAuth();
  const { id } = useLocalSearchParams();

  const numericId = id ? (isNaN(+id) ? null : +id) : null;

  const { isError, isLoading, data, error } = useQuery<Product[]>({
    queryKey: ["products", numericId],
    queryFn: async () => {
      const token = await getToken();
      return fetchProducts(numericId, token);
    },
    staleTime: 1000 * 60 * 5,
  });

  return { data, isError, isLoading, error };
}
