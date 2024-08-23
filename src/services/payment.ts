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

    try {
      const response = await apiServer.get(url);
      const result = response?.data?.data ? response?.data?.data : {};
      return result;
    } catch (e) {}
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
      .replace(":leadId", studentDetails?.leadId);
    const url = `${apiUrls?.applyBaseUrl}${route}`;
    const response = await apiServer.get(url);
    const result = response?.data?.data ? response?.data?.data : {};
    return result;
  }

  async getApplicationDataForBursary(applicationCode: string) {
    const route = apiEndPoint?.enrolmentApplicationDetails.replace(
      ":applicationCode",
      applicationCode,
    );

    const url = `${apiUrls?.enrolmentBaseUrl}${route}`;
    const response = await apiServer.get(url);
    const result = response?.data?.data ? response?.data?.data : {};
    return result;
  }

  async getCurrencyConversion(selectedNationality) {
    const response = await apiServer.get(
      `${apiUrls.financeBaseUrl}${apiEndPoint.GETCURRENCYCONVERSION}${selectedNationality}`,
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

  async setStatus(payload) {
    const url = `${apiUrls?.commonBaseUrl}${apiEndPoint.status}`;
    const response = await apiServer.post(url, payload);
    const result = response?.data?.data ? response?.data?.data : {};
    return result;
  }

  async getProgramDetails(programCode: string) {
    const url = `${apiUrls?.academicBaseUrl}${apiEndPoint.program}`.replace(
      ":programCode",
      programCode,
    );
    const response = await apiServer.get(url);
    const result = response?.data?.data ? response?.data?.data : {};
    return result;
  }
  async getProgramRmatDetails(programCode: string) {
    const url = `${apiUrls?.academicBaseUrl}${apiEndPoint.programRmat}`.replace(
      ":programCode",
      programCode,
    );
    const response = await apiServer.get(url);
    const result = response?.data?.data ? response?.data?.data : {};
    return result;
  }

  async getUkhesheToken() {
    const url = `${apiUrls?.financeBaseUrl}${apiEndPoint.ukhesheToken}`;
    const response = await apiServer.post(url);
    return response?.data?.data ? response?.data?.data : null;
  }
  async getPaymentDetails(tenantId, Payload, headers) {
    const url = `${process.env.NEXT_PUBLIC_PAYMENT_TENENT_LOGIN_API}${tenantId}/payments`;
    const response = await axios.post(url, Payload, { headers });
    return response?.data ? response?.data : null;
  }

  getPaymentInfo = async (tenantId, paymentId, headers) => {
    try {
      const url = `${process.env.NEXT_PUBLIC_PAYMENT_TENENT_LOGIN_API}${tenantId}/payments/${paymentId}`;
      const paymentRes = await axios.get(url, { headers });
      return paymentRes;
    } catch (err: any) {
      console.log("Error while payment page ========>", err?.message);
    }
  };

  updateUkheshePayment = async (payload) => {
    const url = `${apiUrls?.financeBaseUrl}${apiEndPoint.updatePayment}`;
    const response = await apiServer.post(url, payload);
    return response?.data ? response?.data : null;
  };
}

export default new PaymentServices();
