import AvatarUser from "@/features/auth/AvatarUser";
import { Text, View } from "react-native";
interface Props {
  name: string;
  email: string;
  onAvatarPress?: () => void;
}

export default function UserInfo({
  name,
  email,
  onAvatarPress,
}: Props): JSX.Element {
  return (
    <View className={"flex flex-col items-center  gap-1 "}>
      <AvatarUser height={80} width={80} onPress={onAvatarPress} />
      <Text className={"text-lg font-medium text-gray-800 text-center"}>
        {name}
      </Text>
      <Text className={"text-sm font-medium text-center text-gray-500"}>
        {" "}
        {email}
      </Text>
    </View>
  );
}
