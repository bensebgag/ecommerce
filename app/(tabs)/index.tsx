import { SafeAreaView } from "react-native-safe-area-context";
import { Image, ScrollView, View, TouchableOpacity, Text } from "react-native";
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons";
import { SearchBar } from "@/components/SearchBar";
import BasicMap from "@/components/Map";
import Category from "@/features/categories/Category";
import Productions from "@/features/proudcts/Productions";
import { router } from "expo-router";
import { useLogout } from "@/hooks/useLogout";
import ProductForm from "@/components/AnimatedForm";
import { useUser } from "@/app/auth/useUser";
import { useState } from "react";

export default function Index() {
  const { logout } = useLogout();
  const { data: User, isLoading } = useUser();
  const [formOpen, setFormOpen] = useState(false);

  return (
    <SafeAreaView className={"w-full h-full bg-gray-50"}>
      <ScrollView scrollEnabled={!formOpen}>
        <View className={"w-full h-full flex flex-col gap-4 p-4"}>
          <View
            className={"w-full  flex flex-row items-center justify-between"}
          >
            <Image
              className={"w-14 h-14"}
              source={require("@/assets/images/user.png")}
            />
            <View className={"flex flex-row gap-1"}>
              <AntDesign
                onPress={() => router.replace("/chart/")}
                className={
                  "border-[1px] bg-white p-2 border-gray-200 rounded-full "
                }
                name="shoppingcart"
                size={24}
                color="#52525B"
              />
              <TouchableOpacity
                onPress={logout}
                className="w-12 h-12 flex items-center justify-center bg-white rounded-full"
              >
                <SimpleLineIcons name="logout" size={18} color="black" />
              </TouchableOpacity>
            </View>
          </View>
          <SearchBar />

          <Category />

          <Productions />
        </View>
      </ScrollView>
      {!isLoading && User && User.role === "ADMIN" && (
        <ProductForm open={formOpen} setOpen={setFormOpen} />
      )}
      {!formOpen && !isLoading && User && User.role === "ADMIN" && (
        <TouchableOpacity
          style={{
            position: "absolute",
            bottom: 30,
            right: 30,
            backgroundColor: "#E2AF6C",
            width: 56,
            height: 56,
            borderRadius: 28,
            alignItems: "center",
            justifyContent: "center",
            elevation: 5,
          }}
          onPress={() => setFormOpen(true)}
        >
          <AntDesign name="plus" size={24} color="white" />
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}
