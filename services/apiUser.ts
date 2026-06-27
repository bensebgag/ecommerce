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

export const updateUser = async (data: Partial<User>): Promise<User> => {
  try {
    const res = await api.put("updateUser", data);
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const uploadUserAvatar = async (formData: FormData): Promise<User> => {
  try {
    const res = await api.post("updateProfileImage", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (err) {
    throw err;
  }
};
