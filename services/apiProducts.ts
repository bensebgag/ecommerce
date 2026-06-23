import { api } from "@/api/axios";
import { Product } from "@/Util/type";

export const fetchProducts = async (
  id: number | null = null,
): Promise<Product[]> => {
  try {
    const res = await api.get(`getAllProducts/${id}`);
    return res.data;
  } catch (err) {
    throw err;
  }
};
export const fetchProductById = async (id: number): Promise<Product> => {
  try {
    const res = await api.get(`getProductById/${id}`);
    return res.data;
  } catch (err) {
    throw err;
  }
};
export const createProduct = async (product: FormData): Promise<Product> => {
  try {
    const res = await api.post(`createNewProduct`, product);

    return res.data;
  } catch (err) {
    throw err;
  }
};
