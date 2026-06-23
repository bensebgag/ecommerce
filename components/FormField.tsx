import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { TextInput, View, Text } from "react-native";

interface props {
  label: string;
  value: string;
  editable?: boolean;
}
const FormField = ({ label, value, editable = true }: props) => {
  const [isFocused, setFocused] = useState(false);
  return (
    <View className="">
      <Text className="text-base font-bold mb-2 text-[#858585]">{label}</Text>
      <View
        className={`flex-row items-center border border-gray-300 rounded-full px-2 py-1 bg-[#F6F8FA] ${isFocused ? "border-[1px] focus:border-[#F38344]" : ""}  `}
      >
        <TextInput
          onFocus={() => setFocused(true)}
          className="flex-1 mr-2 text-base font-medium  "
          value={value}
          editable={editable}
          placeholderTextColor="#333333"
          style={{ color: editable ? "#333" : "#858585" }}
        />

        {editable && <Feather name="edit" size={20} color="#333333" />}
      </View>
    </View>
  );
};
export default FormField;
