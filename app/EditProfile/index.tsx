import {SafeAreaView} from "react-native-safe-area-context";
import {Text, View, TouchableOpacity, Image, TextInput} from "react-native";
import {AntDesign, Feather} from "@expo/vector-icons";
import {useState} from "react";
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
                className={`flex-row items-center border border-gray-300 rounded-full px-2 py-1 bg-[#F6F8FA] ${isFocused?"border-[1px] focus:border-[#F38344]":"" }  `}
            >
                <TextInput
                    onFocus={()=>setFocused(true)}
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

export default function Index(){
    return (
       <SafeAreaView >
           <View className={"flex-col p-4 gap-6 "}>
               <Text className={"text-2xl font-bold text-[#333333]"}>
                   Your profile
               </Text>
               <TouchableOpacity
                   className={"relative justify-self-center  self-center  "}
                   onPress={() => {
                       console.log("onPress");
                   }}
               >
                   <Image
                       className={"self-center"}
                       source={require("../../assets/images/user.png")}
                   />
                   <Image
                       className={"absolute top-24 left-20"}
                       source={require("../../assets/images/edit.png")}
                   />
               </TouchableOpacity>

               <View className={"bg-white px-2 py-4 rounded-xl flex-col gap-2"}>
                   <FormField label="First name" value="Marin" />
                   <FormField label="Last name" value="JS Mastery" />
                   <FormField label="Email" value="marin@jsmastery.pro" />
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

                   <FormField label="Phone number" value="+5547824162" />
               </View>
           </View>

       </SafeAreaView>
    )
}