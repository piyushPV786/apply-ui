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

const excludedTokenServises = (service: string) => {
  if (
    service.includes(`${process.env.auth_Url}${CommonApi.VERIFYOTP}`) ||
    service.includes(`${process.env.auth_Url}${CommonApi.REGISTERUSER}`)
  )
    return false;
  return true;
};

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

    const tokensData = localStorage.getItem("access_token");
    config.headers.common["Authorization"] = `bearer ${tokensData}`;

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

    if (error.response.status === 401) {
      const tokensData = localStorage.getItem("access_token");
      const refreshToken = localStorage.getItem("refresh_token");
      const payload = {
        access_token: tokensData,
        refresh_token: refreshToken,
      };

      let apiResponse = await baseAuth.post("/refresh-token", {
        payload,
      });
      localStorage.setItem("tokens", JSON.stringify(apiResponse.data));
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

  return { baseAuth, AcadmicApi, AuthApi, FinanceApi, CommonAPI, loading };
};

export default useAxiosInterceptor;
