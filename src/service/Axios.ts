import axios, { AxiosInstance } from "axios";
import { useState } from "react";
import { CommonApi, tokenName } from "../components/common/constant";

export const refreshBaseAuth = axios.create({
  baseURL: `${process.env.base_Url}`,
});
export const baseAuth = axios.create({
  baseURL: `${process.env.base_Url}`,
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
export const UserManagementAPI = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_USER_MANAGEMENT_REDIRECT_URI}`,
});

refreshBaseAuth.interceptors.request.use(
  (config) => {
    if (config.headers) {
      config.headers["Authorization"] = `Bearer ${window.sessionStorage.getItem(
        tokenName?.refreshToken
      )}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const useAxiosInterceptor = () => {
  const [loading, setLoading] = useState(false);

  const myInterceptor = (config) => {
    if (
      !config.url.includes(CommonApi.GETSTUDYMODEPROGRAMS) &&
      !config.url.includes(CommonApi.GETCURRENCYCONVERSION) &&
      !config.url.includes("/payment/payu")
    ) {
      setLoading(true);
    }

    if (
      !config.url.includes(CommonApi.VERIFYOTP) &&
      !config.url.includes(CommonApi.REGISTERUSER)
    ) {
      const tokensData = window.sessionStorage.getItem(tokenName?.accessToken);
      config.headers["Authorization"] = `bearer ${tokensData}`;
    }

    return config;
  };

  const myResponseInterceptor = (response) => {
    // Update loading state for request end
    setLoading(false);

    // Handle response
    return response;
  };

  const myErrorInterceptor = async (error) => {
    // Update loading state for request end
    setLoading(false);

    // Handle error
    console.log(error);

    if (error?.response?.status === 401) {
      try {
        const response = await refreshBaseAuth.get("/auth/refresh-token");
        const config = error.config;
        if (
          response?.status === 200 &&
          response?.data?.data?.access_token &&
          response?.data?.data?.refresh_token
        ) {
          await window.sessionStorage.setItem(
            tokenName?.accessToken,
            response?.data?.data?.access_token
          );
          await window.sessionStorage.setItem(
            tokenName.refreshToken,
            response?.data?.data?.refresh_token
          );
          config.headers[
            "Authorization"
          ] = `Bearer ${response.data.data.access_token}`;

          return baseAuth(config);
        }
        await window.localStorage.clear();
        window.location.href = `/`;
      } catch (err: any) {
        if (err?.response?.status === 401) {
          window.localStorage.clear();
          window.location.href = `/`;
        }
      }
    }
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
  addInterceptorToAxiosInstances(UserManagementAPI);

  return {
    baseAuth,
    AcadmicApi,
    AuthApi,
    FinanceApi,
    CommonAPI,
    loading,
    UserManagementAPI,
  };
};

export default useAxiosInterceptor;
