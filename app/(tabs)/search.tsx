import {SafeAreaView} from "react-native-safe-area-context";
import {ScrollView, Text, View} from "react-native";
import Category from "@/features/categories/Category";
import {SearchBar} from "@/components/SearchBar";
import Productions from "@/features/proudcts/Productions";

export  default  function Search (){
    return(
        <SafeAreaView className={"w-full h-full bg-gray-50"}>

            <View className={"w-full h-full flex flex-col gap-4 p-4"} >
            <SearchBar/>
            <Category/>
                <ScrollView>
               <Productions/>
                </ScrollView>

            </View>
        </SafeAreaView>
    )
}

