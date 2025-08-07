import { api } from "@/api/axios";
import { Chart } from "@/Util/type";

export const addProductToChart = async (
  id: number,
  token: string | null
): Promise<Chart> => {
  try {
    const res = await api.post(
      `addProductToChart/${id}`,
      {},
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

export const fetchChart = async (token: string | null): Promise<Chart> => {
  try {
    const res = await api.get("chart", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (err) {
    if (err.response?.data?.includes("<!DOCTYPE html>")) {
      throw new Error("Server returned unexpected response");
    }
    throw err;
  }
};

export const deleteProductFromChart = async (
  idProduct: number,
  chartId: number,
  token: string | null
) => {
  try {
    const res = await api.delete(`deleteProductFromChart/${idProduct}`, {
      params: { chartId },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  } catch (err) {
    throw err;
  }
};
