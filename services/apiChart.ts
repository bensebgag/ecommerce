import { api } from "@/api/axios";
import { Chart } from "@/Util/type";

export const addProductToChart = async (
  id: number,
  size: number,
  image: string,
): Promise<Chart> => {
  try {
    const res = await api.post(`addProductToChart/${id}`, {
      size,
      image,
    });
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const fetchChart = async (): Promise<Chart> => {
  try {
    const res = await api.get("chart");
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const deleteProductFromChart = async (
  idProduct: number,
  chartId: number,
) => {
  try {
    const res = await api.delete(`deleteProductFromChart/${idProduct}`, {
      params: { chartId },
    });
    return res;
  } catch (err) {
    throw err;
  }
};

export async function updateQuantityAPI(
  chartProductId: number,
  quantity: number,
  opreationType: "plus" | "minus",
) {
  try {
    const response = await api.post(`syncQuantity/${chartProductId}`, {
      quantity,
      opreationType,
    });
    return response;
  } catch (error) {
    throw error;
  }
}
