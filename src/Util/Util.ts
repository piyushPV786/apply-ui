import axios from "axios";
import { CommonApi } from "../components/common/constant";
import { AuthApi } from "../service/Axios";

export const transformFormValue = (key: any, value) => {
};
export const mapFormData = (data: any, isDraft?: boolean) => {
  let formData = data;
  if (formData) {
    for (let [key, value] of Object.entries(formData)) {
      if (formData[key]?.length <= 0 && isDraft) {
        delete formData[key];
      }
      if (key == "zipcode" && !formData[key]) {
        formData[key] = 0;
      }
      if (key == "kin" && formData[key]?.isKin == "no") {
        delete formData[key];
      }

      if (key == "sponser" && formData[key]?.isSponsored === "no") {
        delete formData[key];
      }

      if (key == "employment" && formData[key]?.isEmployed == "no") {
        delete formData[key];
      }
      if (
        key === "identificationPassportNumber" &&
        typeof formData[key] !== "object"
      ) {
        formData[key] = Number(value);
      }
      if (typeof formData[key] === "object") {
        mapFormData(formData[key]);
      }
    }

    return formData;
  }
};

export const isValidEmail = (email: string, passValidator?: boolean) => {
  if (passValidator) return true;
  // eslint-disable-next-line no-useless-escape
  return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
};

export const isInvalidFileType = (type: string) => {
  switch (type) {
    case "image/png":
      return false;
    case "image/jpeg":
      return false;
    case "image/jpg":
      return false;
    case "application/pdf":
      return false;
    default:
      "text/xml";
      return true;
  }
};

export const uniqueArrayOfObject = (array: any[], key: string) => [
  ...(new Map(array.map((item) => [item[key], item])).values() as any),
];

export const onlyAlphabets = (value: string) => /^[a-zA-Z ]*$/.test(value);
export const onlyAlphaNumeric = (value: string) =>
  /^(?![0-9]*$)[a-zA-Z0-9]+$/.test(value);
export const onlyAlphaNumericSpace = (value: string) =>
  /^(?![0-9]*$)[a-zA-Z0-9 ]+$/.test(value);

export const GetPaymentImage = (type: string) => {
  const imgUrl = "/assets/images";
  if (type === "Payu") {
    return `${imgUrl}/payu.png`;
  }
  if (type === "RazorPay") {
    return `${imgUrl}/razorpay.png`;
  }
  if (type === "Stripe") {
    return `${imgUrl}/stripe.png`;
  }
};

export const getApplicationCode = () => {
  let appCode = "";
  const leadData: any = window.sessionStorage.getItem("leadData");
  if (leadData) {
    const leadDataApp = JSON.parse(leadData);
    appCode = leadDataApp?.applicationData?.applicationCode;
  }
  return appCode;
};
interface getSignParams {
  documentTypeCode: string;
  fileName: string;
  fileType: string;
  amount: number | string;
  paymentModeCode: string;
}
export const getUploadDocumentUrl = async (payload: getSignParams) => {
  const url = process.env.base_Url;
  const appCode = getApplicationCode();
  try {
    const response: any = await AuthApi.post(
      `${url}application/${appCode}/document`,
      payload
    );
    if (response.status === 201) {
      const { data } = response;
      return await data;
    }
  } catch (error: any) {
    console.log(error.message);
    return error;
  }
};

export const uploadDocuments = async (uploadFileUrl: string, file: File) => {
  const request = new FormData();
  request.append("file", file);
  try {
    const response = await axios.put(uploadFileUrl, request);
    if (response.status === 200) {
      return await response.data;
    } else return await response.data;
  } catch (error: any) {
    console.log(error.message);
    return await error;
  }
};

export const transformDate = (date: Date) => {
  const month = date.toLocaleString("default", { month: "short" });

  const year = date.getFullYear();
  const day = date.getDate();

  return `${day}th ${month} ${year}`;
};
