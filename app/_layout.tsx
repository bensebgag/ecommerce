import { Stack } from "expo-router";
import { tokenCache } from "@/cache";
import { StripeProvider } from "@stripe/stripe-react-native";
import "@/global.css";
import Toast from "react-native-toast-message";
import { Linking } from "react-native";
import { handleURLCallback } from "@stripe/stripe-react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { fetchBalicKeyStrip } from "@/services/strip";
import { setTokenProvider } from "@/services/clerkToken";
import { ClerkProvider, useAuth } from "@clerk/clerk-expo";

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;
const queryClient = new QueryClient();

if (!publishableKey) {
  throw new Error("Missing Publishable Key. Please set in your .env");
}

function RootLayoutContent() {
  const { getToken, isLoaded } = useAuth();

  useEffect(() => {
    if (isLoaded && getToken) {
      setTokenProvider(getToken);
    }
  }, [isLoaded, getToken]);

  return <Stack screenOptions={{ headerShown: false }} />;
}

export default function RootLayout() {
  const [publishableKeyStrip, setPublishableKeyStrip] = useState("");

  const fetchPublishableKey = async () => {
    const key = await fetchBalicKeyStrip();
    setPublishableKeyStrip(key.publicKey);
  };

  useEffect(() => {
    const handleDeepLink = async (url: string | null) => {
      if (url) {
        await handleURLCallback(url);
      }
    };

    Linking.getInitialURL().then(handleDeepLink);
    Linking.addEventListener("url", (event) => handleDeepLink(event.url));

    return () => {
      Linking.removeAllListeners("url");
    };
  }, []);

  useEffect(() => {
    fetchPublishableKey();
  }, []);

  return (
    <>
      <StripeProvider publishableKey={publishableKeyStrip} urlScheme="myapp">
        <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
          <QueryClientProvider client={queryClient}>
            <RootLayoutContent />
          </QueryClientProvider>
        </ClerkProvider>
      </StripeProvider>
      <Toast />
    </>
  );
}
