import Button from "@/components/Button";
import { Link, useRouter } from "expo-router";
import { Image, Text, View } from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as AuthSession from "expo-auth-session";

import { useState, useEffect } from "react";
import { useSSO } from "@clerk/clerk-expo";

interface props {
  onPressSignUp?: () => void;
  complete?: boolean;
  isLogin?: boolean;
}

export default function OAuth({ onPressSignUp, complete, isLogin }: props) {
  const router = useRouter();
  const { startSSOFlow } = useSSO();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    WebBrowser.maybeCompleteAuthSession();
  }, []);

  const handleGoogleSignIn = async () => {
    if (!startSSOFlow) {
      console.error("SSO flow not available");
      return;
    }

    setLoading(true);
    try {
      console.log("Redirect URI:", AuthSession.makeRedirectUri());
      const { createdSessionId, setActive } = await startSSOFlow({
        strategy: "oauth_google",
        redirectUrl: AuthSession.makeRedirectUri({
          scheme: "myapp",
          path: "auth",
        }),
      });

      if (createdSessionId && setActive) {
        await setActive({ session: createdSessionId });
        console.log("✅ Signed in with Google");
        router.replace("/");
      } else {
        console.log("⚠️ Sign-in flow incomplete");
      }
    } catch (error) {
      console.error("❌ Google Sign-In error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex flex-col gap-2">
      <Button
        title={isLogin ? "Sign up" : "Sign in"}
        variant="primary"
        onPress={onPressSignUp || (() => {})}
      />
      <View className="w-full flex-row items-center gap-1">
        <View className="flex-1 h-px bg-[#CED1DD]" />
        <Text className="text-[#333333] text-lg px-2">Or</Text>
        <View className="flex-1 h-px bg-[#CED1DD]" />
      </View>
      <Button
        title="Log In with Google"
        variant="secondary"
        onPress={handleGoogleSignIn}
        icon={<Image source={require("@/assets/images/GoogleIcon.png")} />}
        disabled={complete || loading}
      />
      <View className="flex-row items-center mt-2 self-center">
        <Text className="text-[#333333] text-lg px-2">
          {isLogin ? "Already have an account?" : "Don't have an account?"}
        </Text>
        <Link
          className="text-[#F38344] text-lg"
          href={`/(auth)/${isLogin ? "login" : "signup"}`}
        >
          {isLogin ? "Login" : "Sign Up"}
        </Link>
      </View>
    </View>
  );
}
