import {Image, View,ScrollView} from "react-native";
import  OAuth from  "@/components/OAuth"
import {useState} from "react";
import InputField from "@/components/InputField";
import {AntDesign, FontAwesome6, MaterialCommunityIcons} from "@expo/vector-icons";
import {SafeAreaView} from "react-native-safe-area-context";
import VerificationModal from "@/components/VerificationModal";
import {useSignUp} from "@clerk/clerk-expo";
import Button from "@/components/Button";
import Toast from "react-native-toast-message";
import {isMatchPassword, isValidEmail, isValidPassword} from "@/helpers";

interface FormState {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    code:string;
}

export default  function SignUp() {
    const { isLoaded,signUp,setActive}=useSignUp();
    const [complelte,setcomplete]=useState(false);
    const [pendingVerification, setPendingVerification] = useState(false)
    const [hasPermesstion,sethasPermesstion] =useState(false);
    const [formState, setFormState] = useState<FormState>({
        name:'',
        email: '',
        password: '',
        code:'',
        password_confirmation:'',
    });
    const handleInputChange=<T extends keyof FormState> (field:T,value:FormState[T])=>{
        setFormState(prev=>({
            ...prev,
            [field]:value
        }))

    }
    const onSignUpPress=async()=>{
        if (!isLoaded) return
        if (!isValidEmail(formState.email)) {
            Toast.show({
                type: "error",
                text1: "Invalid Email",
                text2: "Please enter a valid email address",
            });
            return;
        }
        if (!isValidPassword(formState.password)) {
            Toast.show({
                type: "error",
                text1: "Weak Password",
                text2: "Password must be at least 8 characters long",
            });
            return;
        }
        if (!isMatchPassword(formState.password, formState.password_confirmation)) {
            Toast.show({
                type: "error",
                text1: "Passwords Don't Match",
                text2: "Please ensure both passwords are identical",
            });
            return;
        }
        try{
            await signUp.create({
                emailAddress: formState.email.trim(),
                password: formState.password,


            })
            await signUp.prepareEmailAddressVerification({strategy:'email_code'});

            setPendingVerification(true);
        }catch (e: any) {
            console.error(JSON.stringify(e, null, 2));

            if (e?.errors?.some((err: any) => err.code === 'form_password_pwned')) {
                Toast.show({
                    type: "error",
                    text1: "Password Security Issue",
                    text2: "This password appears in data breaches. Please use a different password.",
                });
            } else {
                Toast.show({
                    type: "error",
                    text1: "Sign Up Failed",
                    text2: e?.errors?.[0]?.message || "An unknown error occurred",
                });
            }
        }
        setcomplete(false);
    }

    const onVerifyPress =async () =>{
        if (!isLoaded) return
        try{
            const signUpAttempt=await signUp.attemptEmailAddressVerification({code:formState.code})
            if(signUpAttempt.status==='complete'){
                await  setActive({session:signUpAttempt.createdSessionId});
                sethasPermesstion(true)
            }else{
                console.error(JSON.stringify(signUpAttempt,null,2))
            }
        }catch (err) {
            console.error(JSON.stringify(err, null, 2));
            Toast.show({
                type: "error",
                text1: "Verification Error",
                text2: "Failed to verify your email. Please try again.",
            });
        }
    }

    return (

            <SafeAreaView className={"flex flex-col gap-4 p-4 w-full h-full bg-white "} >
                <ScrollView >
                    <View className={"w-full flex flex-col gap-4"}>
                        <Image className={"w-60 h-60 self-center"} source={require('@/assets/images/10645318.jpg')} />
                        <View className={"flex flex-col   gap-4"}>
                            <InputField

                                onChangeText={(text)=>{handleInputChange('name',text)}}
                                value={formState.name}
                                placeholder={"Enter name"}
                                icon={
                                    <FontAwesome6
                                        name="user"
                                        size={14}
                                        color="#64748b"
                                        className="absolute left-4 top-11"
                                    />
                                }
                                type={"text"}
                                label={"Name"}
                            />
                            <InputField
                                onChangeText={(text)=>{handleInputChange('email',text)}}
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
                                onChangeText={(text)=>{handleInputChange('password',text)}}
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
                                label={"Password"}
                            />
                            <InputField
                                onChangeText={(text)=>{handleInputChange('password_confirmation',text)}}
                                value={formState.password_confirmation}
                                placeholder={"password confirm"}
                                icon={
                                    <AntDesign
                                        name="lock"
                                        size={16}
                                        color="#64748b"
                                        className="absolute left-4 top-11"
                                    />
                                }
                                type={"password"}
                                label={"Password confirm"}
                            />
                        </View>
                        {
                            !pendingVerification &&<OAuth complete={complelte} onPressSignUp={onSignUpPress}/>
                        }

                        {
                        pendingVerification &&
                            <View className={'flex-col gap-2'}><InputField
                                  placeholder={"Enter your verification code"}
                                  type={'text'}
                                  value={formState.code}
                                  label={"Verify your email"}
                                  onChangeText={(text)=> handleInputChange('code',text)}/>
                                 <Button title={"verify code"} onPress={onVerifyPress}/>
                                  {hasPermesstion && <VerificationModal/>}
                            </View>
                        }
                    </View>

                </ScrollView>

            </SafeAreaView>


    )
}