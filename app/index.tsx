import { Text, Image, View} from 'react-native';
import OAuth from "@/components/OAuth";
import { Redirect, router } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
import { COLORS } from "@/Util/Colors";



export default  function Page() {
    const { isSignedIn} = useAuth();


    if (!isSignedIn) {
        return (
            <View className="flex flex-col gap-8 p-4 w-full h-full bg-white">
                <Image
                    className="w-80 h-80 self-center"
                    source={require('@/assets/images/10645318.jpg')}
                />
                <View className="flex flex-col gap-4">
                    <Text className={`text-3xl font-medium text-center ${COLORS.PrimaryText}`}>
                        Let's get started
                    </Text>
                    <Text className={`text-lg text-medium text-center ${COLORS.SecondaryText}`}>
                        Register or log in to find the best shoes for you
                    </Text>
                    <OAuth onPressSignUp={() => router.push("/auth/SignUp")} />
                </View>
            </View>
        );
    }





    return (
        <Redirect href={'/(tabs)'} />

    );
}