import {Image, Text, View} from "react-native";
interface Props {
    name: string;
    image:any;
    email:string;
}

export  default  function UserInfo({name,email,image}: Props ): JSX.Element {
  return (
      <View className={"flex flex-col gap-1 "}>
          <Image className={"self-center w-24 h-24"} source={image} />
          <Text className={"text-lg font-medium text-gray-800 text-center"}>{name}</Text>
          <Text className={"text-sm font-medium text-center text-gray-500"}> {email}</Text>
      </View>
  )

}