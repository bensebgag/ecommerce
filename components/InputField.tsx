import { TextInput, View, KeyboardAvoidingView } from "react-native";
import { Label } from "@react-navigation/elements";

interface Props {
    placeholder: string;
    icon?: any;
    type: string;
    value: string;
    label: string;
    onChangeText:(value:string)=>void;
}

export default function InputField({ placeholder, icon, type, label,onChangeText,value }: Props) {
    return (
        <KeyboardAvoidingView className={"w-full"}>
            <View className="w-full relative flex-col gap-2 items-start ">
                <Label className="text-black text-lg self-start  ">{label}</Label>
                <TextInput
                    value={value}
                    onChangeText={onChangeText}
                    className="w-full border-[1px] border-[#CED1DD] rounded-full py-3 pl-10 focus:border-[#F38344]"
                    placeholder={placeholder}
                    placeholderTextColor="#64748b"
                    secureTextEntry={type === "password"}
                />
                {icon}
            </View>
        </KeyboardAvoidingView>
    );
}