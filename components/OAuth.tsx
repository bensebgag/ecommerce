import Button from "@/components/Button";
import {Link, router} from "expo-router";
import {Image, Text, View} from "react-native";
interface props{
    onPressSignUp:()=>void;
    complete?:boolean;
}
export default  function  OAuth({onPressSignUp,complete}:props)    {
    return(
        <View className={"flex flex-col gap-2"}>
            <Button title={"Sign up"} variant={"primary"} onPress={onPressSignUp} />
            <View className="w-full flex-row items-center gap-1">
                <View className="flex-1 h-px bg-[#CED1DD]" />
                <Text className="text-[#333333] text-lg px-2">Or</Text>
                <View className="flex-1 h-px bg-[#CED1DD]" />
            </View>
            <Button  title={"Log In with Google"} variant={"secondary"} onPress={()=>{}} icon={<Image source={require('@/assets/images/GoogleIcon.png')}/> } disabled={complete} />
            <View className={"flex-row items-center mt-2 self-center "}>
                <Text className={"text-[#333333] text-lg px-2 "}>
                    Don't have an account?
                </Text>
                <Link className={`text-[#F38344] text-lg`} href={"/auth/Login"}>
                    Login
                </Link>
            </View>
        </View>
    )
}