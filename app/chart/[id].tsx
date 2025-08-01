import {
  FlatList,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import { AntDesign, FontAwesome6 } from "@expo/vector-icons";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import Button from "@/components/Button";
import { useProduct } from "@/features/proudcts/useProduct";
import { ProductSize } from "@/Util/type";
import Spinner from "@/components/Spinner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@clerk/clerk-expo";
import { addProductToChart } from "@/services/apiChart";
import Toast from "react-native-toast-message";

export default function ChartDetailPage() {
  const navigation = useNavigation();

  const { data, isLoading } = useProduct();
  const { id } = useLocalSearchParams();

  const [number, setNumber] = useState(1);
  const [selected, setSelected] = useState<ProductSize>();
  const [selectedImage, setSelectedImage] = useState(0);
  const { getToken } = useAuth();
  const queryClient = useQueryClient();
  const {
    mutate,
    error,
    isLoading: isAddingProductToChart,
  } = useMutation({
    mutationFn: async () => {
      const token = await getToken();
      return addProductToChart(+id, token);
    },
    onSuccess: () => {
      Toast.show({
        type: "success",
        text1: "Product add to chart Successfully",
      });
      queryClient.invalidateQueries({ queryKey: ["chart"] });

      router.replace(`/chart/`);
    },
    onError: (err) => {
      console.log("err", err);
      Toast.show({
        type: "error",
        text1: error?.message || "Something went wrong",
      });
    },
  });

  function handleOnAddToCart() {
    mutate();
  }
  function handleClickBtn(type: string) {
    if (type === "minus") setNumber((prv) => prv - 1);
    if (type === "plus") setNumber((prv) => prv + 1);
  }

  function handelGoBack() {
    if (navigation.canGoBack()) navigation.goBack();
    else router.replace("/(tabs)");
  }

  if (isLoading) return <Spinner />;

  return (
    <SafeAreaView className={" bg-white h-full w-full  "}>
      <ScrollView className={"w-full"}>
        <View className={"flex flex-col p-4 gap-4 "}>
          <View className={"flex flex-row items-center justify-between"}>
            <FontAwesome6
              className={
                "border-[1px] bg-white p-2 border-gray-200 rounded-full "
              }
              onPress={() => handelGoBack()}
              name="arrow-left-long"
              size={22}
              color="black"
            />
            <AntDesign
              className={
                "border-[1px] bg-white p-2 border-gray-200 rounded-full "
              }
              name="shoppingcart"
              size={24}
              color="#52525B"
            />
          </View>
          <Image
            className={"flex-2 self-center w-80 h-36 "}
            source={{ uri: data?.typesChoose[selectedImage] }}
          />
          <View className={"flex flex-row items-center justify-between "}>
            <Text
              className={
                "text-base text-gray-950 font-medium w-1/3 text-center"
              }
            >
              {" "}
              {data?.name}
            </Text>
            <View className={"flex flex-row items-center justify-between "}>
              <View className={"flex flex-row items-center gap-2"}>
                <AntDesign name="star" size={12} color="#FDE047" />
                <Text className={"text-sm text-gray-400"}>3.2</Text>
                <Text className={"text-sm text-gray-400"}>Size 40</Text>
              </View>
            </View>
            <View
              className={
                "flex flex-row items-center justify-between p-1 gap-4 bg-gray-200 border-[1px] border-gray-300 rounded-full "
              }
            >
              <AntDesign
                className={"p-2 bg-gray-400 rounded-full"}
                onPress={() => handleClickBtn("minus")}
                name="minus"
                size={13}
                color="white"
              />
              <Text className={"text-base text-gray-950 font-bold"}>
                {number}
              </Text>
              <AntDesign
                className={"p-2 bg-gray-800 rounded-full"}
                onPress={() => handleClickBtn("plus")}
                name="plus"
                size={13}
                color="white"
              />
            </View>
          </View>
          <Text className={"text-base font-bold text-gray-950"}>
            Select Color
          </Text>

          <View className={"flex flex-row items-center gap-3"}>
            {data?.typesChoose.map((url: string, index: number) => (
              <TouchableOpacity
                onPress={() => setSelectedImage(index)}
                key={index}
                className={`border-[1px]  px-3 py-2 rounded-lg ${
                  index === selectedImage ? "border-[#F38344]" : "border-white"
                } `}
              >
                <Image className={"w-16 h-8"} source={{ uri: url }} />
              </TouchableOpacity>
            ))}
          </View>
          <Text className={"text-base font-bold text-gray-950"}>
            Select Size
          </Text>
          <View className={"flex flex-row items-center gap-3"}>
            <FlatList
              data={data?.availableSizes}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={style.container}
              renderItem={(item) => (
                <TouchableOpacity
                  onPress={() => setSelected(item.item)}
                  className={`px-4 py-2 bg-gray-100 rounded-lg border-[1px]${
                    selected === item.item
                      ? " border-[#F38344]"
                      : "border-gray-400"
                  }`}
                >
                  <Text className={"text-base text-gray-950 font-bold"}>
                    {item.item.size}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>

          <Text className={"text-base text-gray-950 font-medium"}>
            Description
          </Text>
          <Text className={"text-gray-400 text-sm font-medium"}>
            {data?.description}{" "}
          </Text>
          <Button
            disabled={isAddingProductToChart}
            title={"add to chart"}
            onPress={handleOnAddToCart}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    paddingVertical: 10,
    display: "flex",
    flexDirection: "row",
    gap: 4,
  },
});
