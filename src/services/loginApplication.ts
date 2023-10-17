import { apiEndPoint, apiUrls } from "./config";
import { apiServer } from "./index";

interface IRegister {
  mobileNumber: number | string;
  mobileCountryCode: number | string;
}

class LoginApplicationServices {
  applyBaseUrl: string | undefined = apiUrls?.applyBaseUrl;

  async register(payload: IRegister) {
    const url = `${this.applyBaseUrl}${apiEndPoint?.register}`;
    const response = await apiServer.post(url, payload);
    return response;
  }
  async verifyOTP(payload) {
    const url = `${this.applyBaseUrl}${apiEndPoint?.verifyOtp}`;
    const response = await apiServer.post(url, payload);
    return response;
  }
}

export default new LoginApplicationServices();
