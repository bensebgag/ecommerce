import { Image, TouchableOpacity } from "react-native";
import { useUser } from "./useUser";

export default function AvatarUser({
  height = 40,
  width = 40,
  onPress,
}: {
  height?: number;
  width?: number;
  onPress?: () => void;
}) {
  const { data: user } = useUser();
  const imageSource = { uri: user?.imageUrl };
  const SizeStyle = {
    width: width,
    height: height,
  };

  const image = (
    <Image className={` rounded-full`} style={SizeStyle} source={imageSource} />
  );

  if (onPress) {
    return <TouchableOpacity onPress={onPress}>{image}</TouchableOpacity>;
  }

  return image;
}
