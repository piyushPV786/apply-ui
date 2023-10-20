import axios from "axios";
import { IPaymentPayload } from "../components/Payments/commonDataType";
import { apiEndPoint, apiUrls } from "./config";
import { apiServer } from "./index";

class PaymentServices {
  applyBaseUrl: string | undefined = apiUrls?.applyBaseUrl;

  async applicationDiscount(payload: IPaymentPayload) {
    const url = `${this.applyBaseUrl}${apiEndPoint?.application}/${payload.applicationCode}/discount/${payload?.discountCode}?studentType=${payload?.studentType}`;
    const response = await apiServer.get(url);

    return response;
  }
  async applicationDocument(payload: any) {
    const url = `${this.applyBaseUrl}${apiEndPoint?.application}/${payload.appCode}/document`;
    const response = await apiServer.post(url, payload);

    return response;
  }
  uploadDocuments = async (uploadFileUrl: string, file: File) => {
    try {
      const response = await axios.put(uploadFileUrl, file);
      if (response.status == 200) {
        return await response;
      } else return await response;
    } catch (error: any) {
      console.log(error.message);

      return await error;
    }
  };
}

export default new PaymentServices();
