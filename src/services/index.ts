import axios from "axios";

export const apiServer = axios.create();

export const updateInterceptors = (callback) => {
  // Add a request interceptor
  apiServer.interceptors.request.use(
    (config) => {
      // You can update the request configuration here, such as adding headers or modifying the request data.
      //   config.headers["Authorization"] = "Bearer your_token_here";
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
      callback(false);
      return Promise.reject(error);
    }
  );
};
