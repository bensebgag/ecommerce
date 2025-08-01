import {useState,useCallback} from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import {Image, ScrollView, Text, View} from "react-native";
import InputField from "@/components/InputField";
import  OAuth from "@/components/OAuth";
import {AntDesign, MaterialCommunityIcons} from "@expo/vector-icons";
import {useSignIn} from "@clerk/clerk-expo";
import {useRouter} from "expo-router";
import Toast from "react-native-toast-message";
import {isValidEmail} from "@/helpers";

interface FormState {
    email: string;
    password: string;

}
export  default function Login(){
    const { signIn, setActive, isLoaded } = useSignIn();
    const [formState, setFormState] = useState<FormState>({
        email: '',
        password: '',
    });
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleInputChange=<T extends keyof FormState> (field:T,value:FormState[T])=>{
        setFormState(prev=>({
            ...prev,
            [field]:value
        }))

    }
    const onSignInPress = useCallback(async () => {
        if (!isLoaded) return;

        // Validate email
        if (!isValidEmail(formState.email)) {
            Toast.show({
                type: "error",
                text1: "Invalid Email",
                text2: "Please enter a valid email address",
            });
            return;
        }

        // Validate password is not empty
        if (!formState.password.trim()) {
            Toast.show({
                type: "error",
                text1: "Missing Password",
                text2: "Please enter your password",
            });
            return;
        }

        setLoading(true);

        // Start the sign-in process using the email and password provided
        try {
            const signInAttempt = await signIn.create({
                identifier: formState.email.trim(),
                password: formState.password,
            });

            // If sign-in process is complete, set the created session as active
            // and redirect the user
            if (signInAttempt.status === 'complete') {
                await setActive({session: signInAttempt.createdSessionId});
                Toast.show({
                    type: "success",
                    text1: "Logged in successfully",
                    visibilityTime: 2000,
                });
                router.replace('/');
            } else {
                // If the status is not complete, check why. User may need to
                // complete further steps.
                console.error(JSON.stringify(signInAttempt, null, 2));
                Toast.show({
                    type: "error",
                    text1: "Login Incomplete",
                    text2: "Additional verification may be required",
                });
            }
        } catch (err: any) {
            // See https://clerk.com/docs/custom-flows/error-handling
            // for more info on error handling
            console.error(JSON.stringify(err, null, 2));

            const errorMessage = err?.errors?.[0]?.message || "Invalid credentials or network issue";
            Toast.show({
                type: "error",
                text1: "Login Failed",
                text2: errorMessage,
            });
        } finally {
            setLoading(false);
        }
    }, [isLoaded, formState.email, formState.password])

    return(
        <SafeAreaView className="w-full h-full p-4 bg-white  ">
<ScrollView>
          <View className={"flex flex-col gap-4"}>
              <Image className={"w-80 h-80 self-center"} source={require('@/assets/images/10645318.jpg')} />
              <View className="flex flex-col  gap-4 w-full">
                  <InputField
                      onChangeText={(text:string)=>handleInputChange('email',text)}
                      value={formState.email}
                      placeholder={"Email"}
                      icon={
                          <MaterialCommunityIcons
                              name="email-outline"
                              size={16}
                              color="#64748b"
                              className="absolute left-4 top-11"
                          />
                      }
                      type={"text"}
                      label={"Email"}
                  />

                  <InputField
                      onChangeText={(text:string)=>handleInputChange('password',text)}
                      value={formState.password}
                      placeholder={"Enter password"}
                      icon={
                          <AntDesign
                              name="lock"
                              size={16}
                              color="#64748b"
                              className="absolute left-4 top-11"
                          />
                      }
                      type={"password"}
                      label={"Enter password"}
                  />
              </View>
              <OAuth onPressSignUp={onSignInPress} complete={loading} />
          </View>
</ScrollView>
        </SafeAreaView>
    )
}



