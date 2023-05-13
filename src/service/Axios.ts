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
    if (
      !config.url.includes(CommonApi.GETSTUDYMODEPROGRAMS) &&
      !config.url.includes(CommonApi.GETCURRENCYCONVERSION) &&
      !config.url.includes("/payment/payu")
    ) {
      setLoading(true);
    }
    let tokensData = JSON.parse(localStorage.getItem("tokens"));
    config.headers.common[
      "Authorization"
    ] = `bearer ${tokensData.access_token}`;
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
      const authData = JSON.parse(localStorage.getItem("tokens"));
      const payload = {
        access_token: authData.access_token,
        refresh_token: authData.refreshToken,
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
