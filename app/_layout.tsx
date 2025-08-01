import { Stack } from "expo-router";
import { tokenCache } from "@/cache";
import { StripeProvider } from "@stripe/stripe-react-native";
import "@/global.css";
import { ClerkProvider, ClerkLoaded } from "@clerk/clerk-expo";
import Toast from "react-native-toast-message";
import { Linking } from "react-native";
import { handleURLCallback } from "@stripe/stripe-react-native";

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { fetchBalicKeyStrip } from "@/services/strip";

const queryClient = new QueryClient();

if (!publishableKey) {
  throw new Error("Missing Publishable Key. Please set  in your .env");
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
        await handleURLCallback(url); // Stripe handles the redirect
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
            <ClerkLoaded>
              <Stack screenOptions={{ headerShown: false }} />
            </ClerkLoaded>
          </QueryClientProvider>
        </ClerkProvider>
      </StripeProvider>

      <Toast />
    </>
  );
}
