import {TouchableOpacity, View, Image, Text} from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import {router} from "expo-router";
import {Product as ProductTypes} from "@/Util/type";

interface Props extends Omit<ProductTypes, 'quantity'|'categoryId'|'discount'|'reviews'|'availableSizes'|'category'|'description'>{}

export default function Product({id, typesChoose, name, price}: Props): JSX.Element {
    return(
        <TouchableOpacity
            className=" w-full flex-1"
            onPress={() => router.replace(`/chart/${id}`)}
        >
            <View
                className="flex p-1 flex-row items-center justify-center border border-gray-200 bg-white rounded-xl  w-full relative"
                style={{
                    height: 120,
                }}
            >
                <View style={{
                  top:2,
                   right :2,
                }} className="absolute  p-2 bg-white border border-gray-200 rounded-full">
                    <AntDesign name="hearto" size={16} color="#F97316" />
                </View>

                {typesChoose[0] && (
                    <Image
                        source={{ uri: typesChoose[0] }}
                        style={{ width: 90, height: 40 }}
                        resizeMode="contain"
                        onError={(e) => console.log("Image load error:", e.nativeEvent.error)}
                    />
                )}

                <TouchableOpacity style={{
                    bottom:0,
                    right:0,
                    borderBottomRightRadius:10
                }} className="absolute  p-2  bg-[#F38344]">
                    <AntDesign name="plus" size={16} color="white" />
                </TouchableOpacity>
            </View>

            <View className="flex flex-col mt-2 gap-1">
                <Text className="text-base font-normal text-gray-900" numberOfLines={1}>{name}</Text>
                <View className="flex flex-row items-center justify-between">
                    <Text className="text-sm font-bold text-black">US${price}</Text>
                    <View className="flex flex-row items-center gap-1">
                        <AntDesign name="star" size={12} color="#FDE047" />
                        <Text className="text-xs text-gray-400">3.2</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}
