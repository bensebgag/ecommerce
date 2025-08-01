import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, Text, View } from "react-native";
import LottieView from "lottie-react-native";
import { PaymentDetail } from "@/features/payment/PaymentDetail";
import { useGetBill } from "@/features/payment/useGetBill";
export default function Shope() {
  const { data, isLoading } = useGetBill();

  return (
    <SafeAreaView className={"w-full h-full  bg-gray-50"}>
      <Text className="text-xl font-normal text-gray-900 ml-6 my-6">
        Bill details
      </Text>
      <ScrollView className={"w-full h-full   "}>
        {!data && !isLoading && (
          <View
            className={"w-full h-full flex-col p-4 items-center justify-center"}
          >
            <LottieView
              source={require("@/assets/shopAnimation.json")}
              autoPlay={true}
              loop={true}
              style={{ width: 300, height: 300, marginBottom: 0 }}
            />
            <Text
              className={
                "text-center text-2xl font-medium text-gray-600 leading-normal"
              }
            >
              You haven't bought anything yet, you can shop in our store and buy
              what you want
            </Text>
          </View>
        )}
        {data?.map((b) => (
          <PaymentDetail
            key={b.id}
            locationImages={b.images}
            paymentStatus="Paid"
            dateTime={b.date}
            Invoice={b.Invoice}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
