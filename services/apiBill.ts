import { api } from "@/api/axios";

export const createNewBill = async (chartId: number | undefined) => {
  try {
    const res = await api.post("createNewBill", {
      chartId,
    });
    return res.data;
  } catch (err) {
    throw err;
  }
};
export const fetchBill = async () => {
  try {
    const res = await api.get("getAllBill");

    return res.data;
  } catch (err) {
    throw err;
  }
};
