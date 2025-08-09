import { useAuth } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";

export const useLogout = () => {
  const { isLoaded, signOut } = useAuth();
  const router = useRouter();

  const logout = async () => {
    if (!isLoaded) return;

    try {
      await signOut();
      Toast.show({
        type: "success",
        text1: "Logged out successfully",
        visibilityTime: 2000,
      });
      router.replace("/auth/Login");
      return true;
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Logout Failed",
        text2: "Please try again",
      });
      return false;
    }
  };

  return { logout, isLoaded };
};
