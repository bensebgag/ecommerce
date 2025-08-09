import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, Text, View } from "react-native";
import { AntDesign, FontAwesome6 } from "@expo/vector-icons";
import Button from "@/components/Button";
import { ProductItemChart } from "@/components/ProductItemChart";
import { router, useNavigation } from "expo-router";
import { useChart } from "@/features/chart/useChart";
import Spinner from "@/components/Spinner";
import { useEffect, useState } from "react";
import { usePyament } from "@/features/payment/usePayment";
import { ChartChekoutDetail } from "./chatChekout";

export default function Index() {
  const navigation = useNavigation();
  const { data, isLoading, isError, error } = useChart();
  const [orderAmount, setOrderAmount] = useState<number>();
  const [totalAmount, setTotalAmount] = useState<number>();

  useEffect(() => {
    if (data) {
      setOrderAmount(data.orderAmount);
      setTotalAmount(data.totalPayment);
    }
  }, [data]);
  const { didTapCheckoutButton } = usePyament(totalAmount || 0, data?.id);

  function handelGoBack() {
    if (navigation.canGoBack()) router.back();
    else router.replace("/(tabs)");
  }

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return (
      <View className={"flex flex-row items-center justify-center"}>
        <Text className={"text-red-500 text-lg "}>
          {error?.message || "An error occurred"}
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView className={"flex flex-col gap-4 p-6 w-full h-full bg-white"}>
      <View className={"flex flex-row items-center justify-between"}>
        <FontAwesome6
          className={"border-[1px] bg-white p-2 border-gray-200 rounded-full "}
          onPress={() => handelGoBack()}
          name="arrow-left-long"
          size={22}
          color="black"
        />
        <Text className={"text-2xl font-medium text-gray-900"}>Chart</Text>
        <AntDesign
          className={"border-[1px] bg-white p-2 border-gray-200 rounded-full "}
          name="shoppingcart"
          size={24}
          color="#52525B"
        />
      </View>
      <ScrollView>
        <View className={"flex flex-col gap-4 "}>
          {data?.products?.map((item, index) => (
            <ProductItemChart
              key={item.productId}
              chartProductId={item.id}
              id={item.product?.id}
              chartId={data?.id}
              name={item?.product?.name}
              initialQuantity={item.quantity}
              price={item?.product?.price}
              typesChoose={item.product?.typesChoose}
              setOrderAmount={setOrderAmount}
              setTotalAmount={setTotalAmount}
            />
          ))}
        </View>
      </ScrollView>

      {data?.products && data.products.length > 0 ? (
        <>
          <ChartChekoutDetail
            orderAmount={orderAmount || 0}
            totalAmount={totalAmount || 0}
            discount={data.discount}
          />
          <Button title={"checkout"} onPress={didTapCheckoutButton} />
        </>
      ) : (
        <View className="flex flex-row items-center justify-between">
          <Text className="text-gray-500 text-lg">No data Yet</Text>
        </View>
      )}
    </SafeAreaView>
  );
}
