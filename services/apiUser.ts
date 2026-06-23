import { User } from "@/Util/type";
import { api } from "@/api/axios";

export const getUser = async (): Promise<User> => {
  try {
    const res = await api.get("roleUser");
    return res.data;
  } catch (err) {
    throw err;
  }
};
