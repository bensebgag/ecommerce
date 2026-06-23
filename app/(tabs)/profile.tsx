import { SafeAreaView } from "react-native-safe-area-context";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { EditFiled } from "@/components/EditFiled";
import UserInfo from "@/components/UserInfo";
import { useUser } from "@clerk/clerk-expo";
import FormField from "@/components/FormField";

export default function Profile() {
  const { user } = useUser();
  const data = [
    {
      icon: (
        <AntDesign
          name="user"
          className={"bg-gray-100 p-1 rounded-full"}
          size={20}
          color="#6b7280"
        />
      ),
      title: "profile",
      description: "Shipping email password",
      url: "/EditProfile",
    },
    {
      icon: (
        <AntDesign
          name="hearto"
          className={"bg-gray-100 p-1 rounded-full"}
          size={20}
          color="#6b7280"
        />
      ),
      title: "Favorites",
      description: "Active Asks,Sales,SellerProfile",
      url: "/Favorites",
    },
  ];

  return (
    <SafeAreaView className={"bg-gray-50 h-full w-full"}>
      <ScrollView>
        <View className={"flex flex-col gap-6 p-4"}>
          <Text className={"text-xl font-bold text-gray-950 text-center"}>
            Acoount
          </Text>
          <UserInfo
            name={user?.firstName}
            email={user?.primaryEmailAddress?.emailAddress}
          />

          <View className={"flex-col p-4 gap-6 "}>
            <View className={" px-2 py-4 rounded-xl flex-col gap-2"}>
              <FormField label="First name" value="Marin" />
              <FormField label="Last name" value="JS Mastery" />
              <FormField label="Email" value="marin@jsmastery.pro" />
              <Text className="text-base font-bold mb-2 text-[#858585]">
                Email status
              </Text>
              <View
                className={`flex-row items-center border border-gray-300 rounded-full px-4 py-3 bg-[#F6F8FA]`}
              >
                <View
                  className={
                    "flex-row items-center  border-[1px] border-[#0CC25F] bg-[#E7F9EF] rounded-full py-1 px-4 "
                  }
                >
                  <AntDesign name="check" size={18} color="#333333" />
                  <Text className={"text-base font-medium ml-1 text-[#333333]"}>
                    Verified
                  </Text>
                </View>
              </View>

              <FormField label="Phone number" value="+5547824162" />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
