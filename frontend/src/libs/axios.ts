import axiosInstance from "axios";
import cookie from "cookie";

export const url = import.meta.env.VITE_BACKEND_BASE_URL;

const axios = axiosInstance.create({
  baseURL: url,
  withCredentials: false,
});

axios.interceptors.request.use(
  function (config) {
    const cookies = cookie.parse(document.cookie); 
    const accessToken = cookies.accessToken; 

    if (accessToken){
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axios;
