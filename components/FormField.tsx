import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { TextInput, View, Text } from "react-native";
interface Props {
  label: string;
  value: string;
  onChangeText?: (text: string) => void;
  editable?: boolean;
}

const FormField = ({ label, value, onChangeText, editable = true }: Props) => {
  const [isFocused, setFocused] = useState(false);
  return (
    <View>
      <Text className="text-base font-bold mb-2 text-[#858585]">{label}</Text>
      <View
        className={`flex-row items-center border  rounded-full px-2 py-1  bg-[#F6F8FA] ${isFocused ? "border-[#F38344]" : "border-gray-300"}`}
      >
        <TextInput
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="flex-1 mr-2 text-base font-medium"
          value={value}
          onChangeText={onChangeText}
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
