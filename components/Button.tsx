import { useMemo } from "react";
import { TouchableOpacity, Text, ActivityIndicator, View } from "react-native";

type Props = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: "primary" | "secondary" | "danger";
  icon?: React.ReactNode;
};

const variantStyles = {
  primary: `bg-[#F38344]`,
  secondary: `bg-[#ffffff]`,
  danger: "bg-red-500",
};
export default function Button({
  title,
  onPress,
  loading,
  icon,
  disabled,
  variant = "primary",
  ...rest
}: Props) {
  const buttonClassName = useMemo(() => {
    const baseStyle = `py-4 px-8 rounded-full flex-row items-center justify-center ${variant === "secondary" ? "border-[1px] border-[#CED1DD]" : ""}`;
    return `${baseStyle} ${variantStyles[variant]} ${disabled ? "opacity-50" : ""}`;
  }, [variant, disabled]);
  return (
    <TouchableOpacity
      className={buttonClassName}
      disabled={disabled || loading}
      onPress={onPress}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <View className={"flex flex-row items-center gap-2"}>
          {icon && icon}
          <Text
            className={` text-lg ${variant === "primary" ? "text-white font-bold" : `text-[#020302]`}`}
          >
            {title}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}
