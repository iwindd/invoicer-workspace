import axiosInstance from "axios";
import cookie from "cookie";

export const url = import.meta.env.VITE_BACKEND_BASE_URL;

const axios = axiosInstance.create({
  baseURL: url,
  withCredentials: true,
});

export default axios;
