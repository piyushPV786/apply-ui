import axios from "axios";

const apiServer = axios.create();

export const updateIntercepters = (callback) => {
  // Add a request interceptor
  apiServer.interceptors.request.use(
    (config) => {
      // You can update the request configuration here, such as adding headers or modifying the request data.
      //   config.headers["Authorization"] = "Bearer your_token_here";
      callback(true);
      return config;
    },
    (error) => {
      return Promise.reject(error);
      callback(false);
    }
  );

  // Add a response interceptor
  apiServer.interceptors.response.use(
    (response) => {
      // You can update the response data or handle errors globally here.
      callback(false);
      return response.data;
    },
    (error) => {
      return Promise.reject(error);
      callback(false);
    }
  );
};

export default apiServer;
