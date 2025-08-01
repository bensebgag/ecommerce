import {Text, TouchableOpacity, View} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import {router} from "expo-router";
interface Item {
    icon:JSX.Element;
    title: string;
     description: string;
     url:any;
}

export  function  EditFiled({icon ,title,description,url}: Item) {

    return(
        <TouchableOpacity onPress={()=>router.replace(url)}  className={"py-2 px-3  rounded-full bg-white flex-row items-center justify-between border-[1px] border-gray-300"}>
            <View className={"flex flex-row gap-1 items-center"}>
                {icon}
                <View className={"flex flex-col gap-1"}>
                    <Text className={"text-base font-medium text-gray-800"}> {title}</Text>
                    <Text className={"text-sm font-normal text-gray-500"}>{description}</Text>
                </View>
            </View>
            <AntDesign name="right" size={20} color="#6b7280" />
        </TouchableOpacity>
    )
}