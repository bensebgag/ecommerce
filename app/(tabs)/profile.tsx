import {SafeAreaView} from "react-native-safe-area-context";
import { ScrollView, Text, View} from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import {EditFiled} from "@/components/EditFiled";
import UserInfo from "@/components/UserInfo";

export  default  function Profile (){

    const data=[
        {icon:<AntDesign name="user" className={"bg-gray-100 p-1 rounded-full"} size={20} color="#6b7280" />  ,
        title:"profile",
        description:"Shipping email password",
        url:"/EditProfile"},
        {icon:<AntDesign name="hearto" className={"bg-gray-100 p-1 rounded-full"} size={20} color="#6b7280" />,
         title: "Favorites",
         description: "Active Asks,Sales,SellerProfile",
        url:"/Favorites"}];

    return(
        <SafeAreaView className={"bg-gray-50 h-full w-full"}>
            <ScrollView >
                <View className={"flex flex-col gap-6 p-4"}>
               <Text className={"text-xl font-bold text-gray-950 text-center"}>Acoount</Text>
                     <UserInfo
                      name={"Daniel Joesph"}
                      image={require('@/assets/images/user.png')}
                      email={"bensebgag258@gmail.com"}      />
                     <View className={"flex flex-col gap-3"}>
                         {data.map((item, index) => (
                             <EditFiled
                              url={item.url}
                              key={index}
                             icon={item.icon}
                             title={item.title}
                             description={item.description}/>

                          ))}
                     </View>

                </View>

            </ScrollView>
        </SafeAreaView>
    )
}
