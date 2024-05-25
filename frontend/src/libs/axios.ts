import axiosInstance from "axios";
import cookie from "cookie";

export const url = "http://localhost:3000/api";

const axios = axiosInstance.create({
  baseURL: url,
  withCredentials: true,
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
