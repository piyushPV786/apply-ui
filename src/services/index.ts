import axios from "axios";
import LoginApplicationServices from "./loginApplication";
import { StorageName } from "../components/common/constant";
import mem from "mem";

export const apiServer = axios.create();
export const refreshApiServer = axios.create();

const refreshTokenFunction = async () => {
  try {
    const response = await LoginApplicationServices.refreshToken();
    const { data } = response?.data;
    if (data?.access_token && data?.refresh_token) {
      await window.localStorage.setItem(
        StorageName?.ACCESS_TOKEN,
        data.access_token
      );
      await window.localStorage.setItem(
        StorageName?.REFRESH_TOKEN,
        data.refresh_token
      );
      return data;
    } else {
      window.localStorage.clear();
      window.sessionStorage.clear();
      window.location.href = `/`;
    }
  } catch (err) {
    window.localStorage.clear();
    window.sessionStorage.clear();
    window.location.href = `/`;
  }
};

const maxAge = 10000;
const memoizedRefreshToken = mem(refreshTokenFunction, {
  maxAge,
});

export const updateInterceptors = (callback) => {
  refreshApiServer.interceptors.request.use(
    (config) => {
      // You can update the request configuration here, such as adding headers or modifying the request data.
      //   config.headers["Authorization"] = "Bearer your_token_here";

      if (config.headers) {
        config.headers["Authorization"] = `Bearer ${window.localStorage.getItem(
          StorageName?.REFRESH_TOKEN
        )}`;
      }

      callback(true);
      return config;
    },
    (error) => {
      callback(false);
      return Promise.reject(error);
    }
  );
  refreshApiServer.interceptors.response.use(
    (response) => {
      // You can update the response data or handle errors globally here.
      callback(false);
      return response;
    },
    (error) => {
      myErrorInterceptor(error);
      callback(false);
      return Promise.reject(error);
    }
  );
  // Add a request interceptor
  apiServer.interceptors.request.use(
    (config) => {
      // You can update the request configuration here, such as adding headers or modifying the request data.
      //   config.headers["Authorization"] = "Bearer your_token_here";

      if (
        config.headers &&
        !config.headers["X-AWS-Skip-Token"] &&
        window.localStorage.getItem(StorageName?.ACCESS_TOKEN)
      ) {
        config.headers["Authorization"] = `Bearer ${window.localStorage.getItem(
          StorageName?.ACCESS_TOKEN
        )}`;
      }

      callback(true);
      return config;
    },
    (error) => {
      callback(false);
      return Promise.reject(error);
    }
  );

  // Add a response interceptor
  apiServer.interceptors.response.use(
    (response) => {
      // You can update the response data or handle errors globally here.
      callback(false);
      return response;
    },
    (error) => {
      myErrorInterceptor(error);
      callback(false);
      return Promise.reject(error);
    }
  );
};

const myErrorInterceptor = async (error) => {
  const config = error?.config;

  if (error?.response?.status === 401 && !config?.sent) {
    config.sent = true;
    const response = await memoizedRefreshToken();
    if (
      response?.status === 200 &&
      response?.access_token &&
      response?.refresh_token
    ) {
      config.headers["Authorization"] = `Bearer ${response?.access_token}`;
    }
    return apiServer(config);
  }
};
