import { getClerkToken } from "@/services/clerkToken";
import axios from "axios";

export const api = axios.create({
  baseURL: "http://10.0.2.2:6000/api/v1/",

  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  async (config) => {
    const token = await getClerkToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },

  (error) => {
    return Promise.reject(error);
  },
);
