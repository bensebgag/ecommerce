import Button from "@/components/Button";
import { useLogout } from "@/hooks/useLogout";
import { SimpleLineIcons } from "@expo/vector-icons";
import { useState } from "react";
import { TouchableOpacity } from "react-native";

export default function Logout() {
  const { logout } = useLogout();
  return (
    <>
      <TouchableOpacity
        onPress={logout}
        className="w-12 h-12 flex items-center justify-center bg-white rounded-full"
      >
        <SimpleLineIcons name="logout" size={18} color="black" />
      </TouchableOpacity>
    </>
  );
}
