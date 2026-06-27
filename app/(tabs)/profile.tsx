import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, Text, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import * as ImagePicker from "expo-image-picker";
import UserInfo from "@/components/UserInfo";
import { useCallback, useEffect, useRef, useState } from "react";
import FormField from "@/components/FormField";
import { useUpdateUser } from "@/features/auth/useUpdateUser";
import { useUploadUserAvatar } from "@/features/auth/useUploadUserAvatar";
import { UserUpdateInput } from "@/Util/type";
import { useUser } from "@/features/auth/useUser";

const DEBOUNCE_DELAY_MS = 700;

export default function Profile() {
  const { data: user } = useUser();
  const [firstName, setFirstName] = useState(user?.FirstName ?? "");
  const [lastName, setLastName] = useState(user?.LastName ?? "");
  const [phone, setPhone] = useState(user?.phoneNumber ?? "");
  const {
    mutate: updateUser,
    isLoading: isSaving,
    isSuccess: isSaved,
  } = useUpdateUser();
  const { mutate: uploadAvatar, isLoading: isUploading } =
    useUploadUserAvatar();
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pendingUpdate = useRef<UserUpdateInput>({});

  const handleAvatarPress = useCallback(async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Camera roll permission is required to update your avatar.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (result.canceled || !result.assets?.length) {
      return;
    }

    const asset = result.assets[0];
    const uri = asset.uri;
    const uriParts = uri.split("/");
    const filename = uriParts[uriParts.length - 1];
    const match = /\.(\w+)$/.exec(filename);
    const type = match ? `image/${match[1]}` : "image";

    const formData = new FormData();
    formData.append("file", {
      uri,
      name: filename,
      type,
    } as any);

    uploadAvatar(formData);
  }, [uploadAvatar]);

  useEffect(() => {
    setFirstName(user?.FirstName ?? "");
    setLastName(user?.LastName ?? "");
    setPhone(user?.phoneNumber ?? "");
  }, [user]);

  const scheduleUpdate = useCallback(
    (fields: UserUpdateInput) => {
      pendingUpdate.current = { ...pendingUpdate.current, ...fields };

      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }

      debounceTimer.current = setTimeout(() => {
        if (Object.keys(pendingUpdate.current).length > 0) {
          updateUser(pendingUpdate.current);
          pendingUpdate.current = {};
        }
        debounceTimer.current = null;
      }, DEBOUNCE_DELAY_MS);
    },
    [updateUser],
  );

  useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, []);

  const handleFirstNameChange = (value: string) => {
    setFirstName(value);
    scheduleUpdate({ FirstName: value });
  };

  const handleLastNameChange = (value: string) => {
    setLastName(value);
    scheduleUpdate({ LastName: value });
  };

  const handlePhoneChange = (value: string) => {
    setPhone(value);
    scheduleUpdate({ phoneNumber: value });
  };

  return (
    <SafeAreaView className={"bg-gray-50 h-full w-full"}>
      <ScrollView>
        <View className={"flex flex-col gap-6 p-4"}>
          <Text className={"text-xl font-bold text-gray-950 text-center"}>
            Acoount
          </Text>
          <UserInfo
            name={(firstName || user?.FirstName) ?? ""}
            email={user?.email ?? ""}
            onAvatarPress={handleAvatarPress}
          />

          <View className={"flex-col p-4 gap-6 "}>
            <View className={" px-2 py-4 rounded-xl flex-col gap-2"}>
              <FormField
                label="First name"
                value={firstName}
                onChangeText={handleFirstNameChange}
              />
              <FormField
                label="Last name"
                value={lastName}
                onChangeText={handleLastNameChange}
              />
              <FormField
                label="Phone number"
                value={phone}
                onChangeText={handlePhoneChange}
              />
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

              {(isSaving || isSaved || isUploading) && (
                <Text className="text-sm text-gray-500 mt-2">
                  {isUploading
                    ? "Uploading avatar…"
                    : isSaving
                      ? "Saving changes…"
                      : "Changes saved."}
                </Text>
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
