import {ActivityIndicator, View} from "react-native";
import {COLORS} from "@/Util/Colors";


export default function  Spinner (){

    return (
        <View className="flex-1 justify-center items-center">
            <ActivityIndicator size="large" color={COLORS.Primary} />
        </View>
    )
}