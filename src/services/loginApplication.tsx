import { apiEndPoint, apiUrls } from "./config";
import apiServer from "./index";

interface IRegister {
  mobileNumber: number | string;
  mobileCountryCode: number | string;
}

const LoginApplicationServices = () => {
  const register = async (payload: IRegister) => {
    const url = `${apiUrls?.applyBaseUrl}${apiEndPoint?.register}`;
    const response = await apiServer.post(url, payload);
    return response;
  };
  return { register };
};

export default LoginApplicationServices();
