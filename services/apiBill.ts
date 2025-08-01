import { api } from "@/api/axios";
import { BillDetail } from "@/Util/type";

export const createNewBill = async (
  token: string,
  chartId: number | undefined
) => {
  try {
    const res = await api.post(
      "createNewBill",
      {
        chartId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (err) {
    throw err;
  }
};
export const fetchBill = async (token: string | null) => {
  try {
    const res = await api.get(
      "getAllBill",

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.data;
  } catch (err) {
    throw err;
  }
};
