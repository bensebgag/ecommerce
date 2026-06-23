import { api } from "@/api/axios";
import { Category, Product } from "@/Util/type";

export const getGategories = async (): Promise<Category[]> => {
  try {
    const res = await api.get("getAllCategories");
    return res.data;
  } catch (err) {
    throw err;
  }
};
