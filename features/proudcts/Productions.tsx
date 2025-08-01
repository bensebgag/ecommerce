import { Text, View, ScrollView } from "react-native";
import DisplayInRows from "@/components/DisplayInRows";
import { useProducts } from "@/features/proudcts/useProducts";
import Spinner from "@/components/Spinner";
import { useUser } from "@/app/auth/useUser";

export default function Productions() {
  const { isLoading, data: products = [], isError, error } = useProducts();

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return (
      <View className="flex-1 items-center justify-center p-4">
        <Text className="text-xl text-red-500">{error.message}</Text>
      </View>
    );
  }

  const productRows = [];
  for (let i = 0; i < products.length; i += 2) {
    productRows.push(
      <DisplayInRows
        key={i}
        product1={products[i]}
        product2={i + 1 < products.length ? products[i + 1] : undefined}
      />
    );
  }

  return (
    <ScrollView scrollEnabled={false} className="flex-1">
      <View className="flex flex-col py-4 gap-6">{productRows}</View>
    </ScrollView>
  );
}
