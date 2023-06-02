import axios, { AxiosInstance } from "axios";
import { useState } from "react";
import { CommonApi } from "../components/common/constant";

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
      const tokensData = sessionStorage.getItem("access_Token");
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
      const tokensData = sessionStorage.getItem("access_token");
      const refreshToken = sessionStorage.getItem("refresh_token");
      const payload = {
        access_token: tokensData,
        refresh_token: refreshToken,
      };

      let apiResponse = await UserManagementAPI.post("/auth/refresh-token", {
        payload,
      });
      sessionStorage.setItem("tokens", JSON.stringify(apiResponse.data));
      error.config.headers[
        "Authorization"
      ] = `bearer ${apiResponse.data.access_token}`;
      return axios(error.config);
    } else {
      return Promise.reject(error);
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
