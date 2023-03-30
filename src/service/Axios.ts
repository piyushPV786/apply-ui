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

  const myInterceptor = (config) => {
    if (!config.url.includes(CommonApi.GETSTUDYMODEPROGRAMS)) {
      setLoading(true);
    }
    const token = "";

    // Handle request
    // config.headers.Authorization = `Bearer ${token}`;

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
