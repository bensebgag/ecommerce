import { useStripe, PaymentSheetError } from "@stripe/stripe-react-native";
import { createIntent } from "@/services/strip";
import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import { useRouter } from "expo-router";
import { useCreateNewBill } from "../bill/useCreateBill";

export function usePyament(amount: number = 0, chartId: number) {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const { mutate: creatNewBillMutation } = useCreateNewBill();
  const [ready, setReady] = useState(false);
  const router = useRouter();

  const initializePaymentSheet = async () => {
    try {
      if (!amount || amount <= 0) {
        console.warn("Invalid amount for payment:", amount);
        return;
      }

      const amountInCents = Math.round(amount * 100);

      const { error } = await initPaymentSheet({
        merchantDisplayName: "Your Store Name",
        intentConfiguration: {
          mode: {
            amount: amountInCents,
            currencyCode: "USD",
          },
          confirmHandler: confirmHandler,
        },
        returnURL: "myapp://payment-return",
      });

      if (error) {
        console.error("Failed to initialize payment sheet:", error);
        Toast.show({
          type: "error",
          text1: "Payment Setup Failed",
          text2: error.message,
        });
      } else {
        setReady(true);
      }
    } catch (error) {
      console.error(
        "Unexpected error during payment sheet initialization:",
        error
      );
      Toast.show({
        type: "error",
        text1: "Payment Setup Failed",
        text2: "Unable to initialize payment",
      });
    }
  };

  const didTapCheckoutButton = async () => {
    try {
      const { error } = await presentPaymentSheet();

      if (error) {
        if (error.code === PaymentSheetError.Canceled) {
          Toast.show({ type: "info", text1: "canceled the payment" });
        } else {
          Toast.show({ type: "error", text1: "Payment failed" });
        }
      } else {
        Toast.show({
          type: "success",
          text1: "Payment completed successfully",
        });

        creatNewBillMutation(chartId);

        router.navigate("/(tabs)/shope");
      }
    } catch (err) {
      console.error("Unexpected error during payment:", err);
    }
  };

  const confirmHandler = async (
    paymentMethod: string | undefined,
    shouldSavePaymentMethod: boolean,
    intentCreationCallback: (params: {
      clientSecret?: string;
      error?: string;
    }) => void
  ) => {
    try {
      const res = await createIntent(1099);
      const clientSecret = res.data.clientSecret;
      if (clientSecret) {
        intentCreationCallback({ clientSecret });
      } else {
        intentCreationCallback({ error: "Failed to create payment intent" });
      }
    } catch (error) {
      intentCreationCallback({
        error: "An unexpected error occurred while processing payment",
      });
    }
  };

  useEffect(() => {
    initializePaymentSheet();
  }, []);

  return { didTapCheckoutButton };
}
