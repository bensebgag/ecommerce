import {
  Image,
  Text,
  View,
  PanResponder,
  TouchableOpacity,
  Animated,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import EvilIcons from "@expo/vector-icons/EvilIcons";

import { useRef, useState, useEffect } from "react";
import { Product as ProductTypes } from "@/Util/type";
import { useRemoveProductFromChart } from "@/features/chart/useRemoveProductFromChart";

interface Props
  extends Omit<
    ProductTypes,
    | "quantity"
    | "categoryId"
    | "discount"
    | "reviews"
    | "availableSizes"
    | "category"
    | "description"
  > {
  initialQuantity?: number;
  onQuantityChange?: (id: number, quantity: number) => void;
  onRemove?: (id: number) => void;
  id: number;
  chartId: number;
  setOrderAmount: React.Dispatch<React.SetStateAction<number>>;
  setTotalAmount: React.Dispatch<React.SetStateAction<number>>;
}

export function ProductItemChart({
  typesChoose,
  price,
  name,
  initialQuantity = 1,
  id,
  chartId,
  onQuantityChange,
  onRemove,
  setOrderAmount,
  setTotalAmount,
}: Props) {
  const [number, setNumber] = useState(initialQuantity);

  const [isSwiping, setIsSwiping] = useState(false);
  const { deleteProductFromChartMutaion, isLoading } =
    useRemoveProductFromChart(id, chartId);

  useEffect(() => {
    if (initialQuantity !== number) {
      setNumber(initialQuantity);
    }
  }, [initialQuantity]);

  function handleClickBtn(type: string) {
    if (type === "minus" && number > 1) {
      const newQuantity = number - 1;
      setNumber(newQuantity);
      setOrderAmount((pre) => pre - price);
      setTotalAmount((pre) => pre - price);
      onQuantityChange?.(id, newQuantity);
    }
    if (type === "plus") {
      const newQuantity = number + 1;
      setNumber(newQuantity);
      setOrderAmount((pre) => pre + price);
      setTotalAmount((pre) => pre + price);
      onQuantityChange?.(id, newQuantity);
    }
  }

  const translateX = useRef(new Animated.Value(0)).current;
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return (
          Math.abs(gestureState.dx) > 10 &&
          Math.abs(gestureState.dx) > Math.abs(gestureState.dy * 3)
        );
      },

      onPanResponderGrant: () => {
        setIsSwiping(true);
      },

      onPanResponderMove: (_, gestureState) => {
        const newX =
          gestureState.dx < 0
            ? Math.max(-100, gestureState.dx)
            : Math.min(0, gestureState.dx);
        translateX.setValue(newX);
      },

      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx < -20) {
          Animated.spring(translateX, {
            toValue: -100,
            useNativeDriver: true,
            friction: 6,
          }).start(() => {
            setIsSwiping(false);
          });
        } else {
          Animated.spring(translateX, {
            toValue: 0,
            useNativeDriver: true,
            friction: 6,
          }).start(() => {
            setIsSwiping(false);
          });
        }
      },
      onPanResponderTerminate: () => {
        Animated.spring(translateX, {
          toValue: 0,
          useNativeDriver: true,
        }).start(() => {
          setIsSwiping(false);
        });
      },
    })
  ).current;

  const resetPosition = () => {
    Animated.spring(translateX, {
      toValue: 0,
      useNativeDriver: true,
      friction: 6,
    }).start();
  };

  const handleDelete = () => {
    deleteProductFromChartMutaion();
    resetPosition();
    setOrderAmount((prev) => prev - price * number);
    setTotalAmount((prev) => prev - price * number);
  };

  return (
    <View
      className="flex-row items-center rounded-xl border border-gray-300 bg-gray-50 overflow-hidden relative mb-2"
      style={{ width: "100%" }}
    >
      <TouchableOpacity
        className="absolute right-0 h-full w-24 bg-red-500 items-center justify-center rounded-r-xl"
        onPress={handleDelete}
      >
        <EvilIcons name="trash" size={40} color="white" />
      </TouchableOpacity>

      <Animated.View
        style={{
          transform: [{ translateX: translateX }],
          width: "100%",
          backgroundColor: "white",
          zIndex: 1,
        }}
        {...panResponder.panHandlers}
      >
        <View className="flex-row p-2 w-full bg-gray-50">
          <View className="flex-row flex-1">
            <View className="w-32 h-32 md:w-44 md:h-36 items-center justify-center border border-gray-200 bg-white rounded-xl relative">
              <View className="absolute top-1 right-1 p-2 bg-white border border-gray-200 rounded-full">
                <AntDesign name="hearto" size={16} color="#F97316" />
              </View>
              <Image
                source={{ uri: typesChoose?.[0] || "" }}
                style={{ width: 80, height: 40 }}
                resizeMode="contain"
              />
            </View>

            <View className="flex-col ml-3 justify-between py-2 flex-1">
              <Text className="text-base text-gray-950 font-medium">
                {name}
              </Text>
              <View className="flex-row items-center gap-2">
                <AntDesign name="star" size={12} color="#FDE047" />
                <Text className="text-sm text-gray-400">3.2</Text>
                <Text className="text-sm text-gray-400">Size 40</Text>
              </View>
              <Text className="text-gray-950 font-bold text-base">
                US${(price * number).toFixed(2)}
              </Text>
            </View>
          </View>

          <View className="flex-col h-32 md:h-36 items-center justify-center gap-3 px-1 py-3 rounded-full border border-gray-300 bg-gray-100">
            <TouchableOpacity
              className="p-2 bg-gray-400 rounded-full"
              onPress={() => handleClickBtn("minus")}
              disabled={number <= 1}
              style={{ opacity: number <= 1 ? 0.5 : 1 }}
            >
              <AntDesign name="minus" size={13} color="white" />
            </TouchableOpacity>
            <Text className="text-base text-gray-950 font-bold">{number}</Text>
            <TouchableOpacity
              className="p-2 bg-gray-800 rounded-full"
              onPress={() => handleClickBtn("plus")}
            >
              <AntDesign name="plus" size={13} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    </View>
  );
}
