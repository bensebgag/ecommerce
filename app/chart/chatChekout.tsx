import { View, Text } from "react-native";
interface Props {
  orderAmount: number;
  discount: number;
  totalAmount: number;
}

export const ChartChekoutDetail = ({
  orderAmount,
  discount,
  totalAmount,
}: Props) => {
  return (
    <View
      className={
        "p-3 flex flex-col gap-2 border-[1px] rounded-xl border-gray-300 bg-white  "
      }
    >
      <View className={"flex flex-row items-center justify-between p-1"}>
        <Text className={"text-lg font-medium text-gray-600"}>
          Order Amount
        </Text>
        <Text className={"text-base font-bold text-gray-700"}>
          ${orderAmount}
        </Text>
      </View>
      <View className={"flex flex-row items-center justify-between p-1"}>
        <Text className={"text-lg font-medium text-gray-600"}>Discount</Text>
        <Text className={"text-base font-bold text-gray-700"}>${discount}</Text>
      </View>
      <View className={"flex flex-row items-center justify-between p-1"}>
        <Text className={"text-lg font-medium text-gray-700"}>
          Total Payment
        </Text>
        <Text className={"text-base font-bold text-gray-950"}>
          ${totalAmount}
        </Text>
      </View>
    </View>
  );
};
