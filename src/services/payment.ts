import axios from "axios";
import { IPaymentPayload } from "../components/Payments/commonDataType";
import { apiEndPoint, apiUrls } from "./config";
import { apiServer } from "./index";
import { getLocalStorageData } from "../Util/Util";
import { StorageName } from "../components/common/constant";

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
  async getApplicationData(applicationCode: string) {
    const studentDetails = getLocalStorageData(StorageName.STUDENT_DETAIL);
    const route = apiEndPoint?.applicationDetails
      .replace(":applicationCode", applicationCode)
      .replace(":leadCode", studentDetails?.leadCode);
    const url = `${apiUrls?.applyBaseUrl}${route}`;
    const response = await apiServer.get(url);
    const result = response?.data?.data ? response?.data?.data : {};
    console.log("result", result);
    return result;
  }

  async getPayuDetais(applicationCode: string, payload) {
    const url = `${apiUrls?.applyBaseUrl}${apiEndPoint.application}/${applicationCode}${apiEndPoint.payu}`;
    const response = await apiServer.post(url, payload);
    const result = response?.data?.data ? response?.data?.data : {};
    return result;
  }
}

export default new PaymentServices();
