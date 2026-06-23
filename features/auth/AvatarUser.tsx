import { useUser } from "@clerk/clerk-expo";
import { Image } from "react-native";

export default function AvatarUser({
  height = 14,
  width = 14,
}: {
  height?: number;
  width?: number;
}) {
  const { user } = useUser();
  const imageSource = { uri: user?.imageUrl };
  return (
    <Image
      className={`w-${width} h-${height} rounded-full`}
      source={imageSource}
    />
  );
}
