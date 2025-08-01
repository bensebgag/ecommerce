import { api } from "@/api/axios";

export const fetchBalicKeyStrip = async () => {
  try {
    const res = await api.get("publicKeyStrip");
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const createIntent = async (amount: number) => {
  try {
    const res = api.post(
      "create-intent",
      { amount },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res;
  } catch (err) {
    throw err;
  }
};
