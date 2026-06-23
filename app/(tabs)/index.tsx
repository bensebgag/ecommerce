import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, View, TouchableOpacity, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { SearchBar } from "@/components/SearchBar";
import Category from "@/features/categories/Category";
import Productions from "@/features/proudcts/Productions";
import { router } from "expo-router";
import ProductForm from "@/components/AnimatedForm";
import { useUser } from "@/features/auth/useUser";
import { useState } from "react";
import AvatarUser from "@/features/auth/AvatarUser";
import Logout from "@/features/auth/Logout";

export default function Index() {
  const { data: User, isLoading } = useUser();
  const [formOpen, setFormOpen] = useState(false);

  return (
    <SafeAreaView className={"w-full h-full bg-gray-50"}>
      <ScrollView scrollEnabled={!formOpen}>
        <View className={"w-full h-full flex flex-col gap-4 p-4"}>
          <View
            className={"w-full  flex flex-row items-center justify-between"}
          >
            <AvatarUser />
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
              <Logout />
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
