import axios from "axios";

export default axios.create({
  baseURL: `https://development-api-apply.regenesys.net/api/v1/auth`,
});

export const AuthApi = axios.create({
  baseURL: `https://development-api-apply.regenesys.net/api/v1/`,
});
