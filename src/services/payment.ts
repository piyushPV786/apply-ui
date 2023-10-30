import axios from "axios";
import { IPaymentPayload } from "../components/Payments/commonDataType";
import { apiEndPoint, apiUrls } from "./config";
import { apiServer } from "./index";
import { getLocalStorageData } from "../Util/Util";
import { StorageName } from "../components/common/constant";

class PaymentServices {
  applyBaseUrl: string | undefined = apiUrls?.applyBaseUrl;

  async applicationDiscount(studentType, applicationCode, discountCode) {
    const url = `${this.applyBaseUrl}${apiEndPoint?.application}/${applicationCode}/discount/${discountCode}?studentType=${studentType}`;
    const response = await apiServer.get(url);
    const result = response?.data?.data ? response?.data?.data : {};
    return result;
  }
  async applicationDocument(payload: any) {
    const url = `${this.applyBaseUrl}${apiEndPoint?.application}/${payload.appCode}/document`;
    const response = await apiServer.post(url, payload);

    return response;
  }

  async getApplicationData(applicationCode: string) {
    const studentDetails = getLocalStorageData(StorageName.STUDENT_DETAIL);
    const route = apiEndPoint?.applicationDetails
      .replace(":applicationCode", applicationCode)
      .replace(":leadCode", studentDetails?.leadCode);
    const url = `${apiUrls?.applyBaseUrl}${route}`;
    const response = await apiServer.get(url);
    const result = response?.data?.data ? response?.data?.data : {};
    return result;
  }

  async getCurrencyConversion(selectedNationality) {
    const response = await apiServer.get(
      `${apiUrls.financeBaseUrl}${apiEndPoint.GETCURRENCYCONVERSION}${selectedNationality}`
    );
    const result = response?.data?.data ? response?.data?.data : {};
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
