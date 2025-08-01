import {TextInput, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";

export  function  SearchBar() {
    return(
        <View className="bg-white rounded-full px-3 flex-row items-center border border-[#EBEBEB] my-3">
            <Ionicons name="search" size={25} color="#333333" className="mr-2" />
            <TextInput
                placeholder="Search...."
                className="flex-1 text-base text-gray-700"
                placeholderTextColor="#6b7280"
            />

        </View>
    )
}