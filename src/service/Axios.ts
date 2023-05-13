import axios, { AxiosInstance } from "axios";
import { useState } from "react";
import { CommonApi } from "../components/common/constant";

export const baseAuth = axios.create({
  baseURL: `${process.env.auth_Url}`,
});

export const AuthApi = axios.create({
  baseURL: `${process.env.base_Url}`,
});
export const AcadmicApi = axios.create({
  baseURL: `${process.env.Academic_Url}`,
});
export const FinanceApi = axios.create({
  baseURL: `${process.env.Finance_Url}`,
});
export const CommonAPI = axios.create({
  baseURL: `${process.env.Common_Url}`,
});

const useAxiosInterceptor = () => {
  const [loading, setLoading] = useState(false);

  const myInterceptor = async (config) => {
    if (
      !config.url.includes(CommonApi.GETSTUDYMODEPROGRAMS) &&
      !config.url.includes(CommonApi.GETCURRENCYCONVERSION) &&
      !config.url.includes("/payment/payu")
    ) {
      setLoading(true);
    } // Get JWT token from local storage
    const token = localStorage.getItem("access_token");
    if (token) {
      try {
        const { exp } = JSON.parse(atob(token.split(".")[1]));
        if (exp < Date.now() / 1000) {
          // Token has expired, refresh it
          const refreshToken = localStorage.getItem("refresh_token");
          const response = await baseAuth.post("/refresh-token", {
            refresh_token: refreshToken,
          });
          const newToken = response.data.access_token;
          // Update local storage with new token
          localStorage.setItem("access_token", newToken);
          config.headers.Authorization = `Bearer ${newToken}`;
        } else {
          config.headers.Authorization = `Bearer ${token}`;
        }
      } catch (error) {
        // Handle error
        console.error(error);
      }
    }
    return config;
  };

  const myResponseInterceptor = (response) => {
    // Update loading state for request end
    setLoading(false);

    // Handle response
    return response;
  };

  const myErrorInterceptor = (error) => {
    // Update loading state for request end
    setLoading(false);

    // Handle error
    return Promise.reject(error);
  };

  const addInterceptorToAxiosInstances = (axiosInstance: AxiosInstance) => {
    axiosInstance.interceptors.request.use(myInterceptor);
    axiosInstance.interceptors.response.use(
      myResponseInterceptor,
      myErrorInterceptor
    );
  };

  addInterceptorToAxiosInstances(baseAuth);
  addInterceptorToAxiosInstances(AcadmicApi);
  addInterceptorToAxiosInstances(AuthApi);
  addInterceptorToAxiosInstances(CommonAPI);
  addInterceptorToAxiosInstances(FinanceApi);

  return { baseAuth, AcadmicApi, AuthApi, FinanceApi, CommonAPI, loading };
};

export default useAxiosInterceptor;
