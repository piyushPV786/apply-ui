import axios from "axios";
import { CommonApi, removedKeysToMap } from "../components/common/constant";
import { AuthApi, FinanceApi } from "../service/Axios";
const ignorKeys = {
  createdAt: "",
  deletedAt: "",
  isActive: "",
  updatedAt: "",
};
export const mapFormData = (data: any, isDraft?: boolean) => {
  let formData = data;
  if (formData) {
    for (let [key, value] of Object.entries(formData)) {
      if (key in ignorKeys) {
        delete formData[key];
      }
      if (formData[key]?.length <= 0 && isDraft) {
        delete formData[key];
      }
      if (key == "zipcode" && !formData[key]) {
        formData[key] = 0;
      }
      if (
        key == "kin" &&
        (formData[key]?.isKin == "no" || !formData[key]?.isKin)
      ) {
        delete formData[key];
      }

      if (
        key == "sponsor" &&
        (formData[key]?.isSponsored === "no" || !formData[key]?.isSponsored)
      ) {
        delete formData[key];
      }

      if (
        key == "employment" &&
        (formData[key]?.isEmployed == "no" || !formData[key]?.isEmployed)
      ) {
        delete formData[key];
      }
      if (removedKeysToMap[key] && typeof formData[key] !== "object") {
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
export const isValidDate = (value) => {
  const currentYear = new Date().getFullYear();
  const year = value.split("-")[0];
  const age = currentYear - +year;
  if (age < 16) return false;
  if (age > currentYear) return false;
  else return true;
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

export const getQualificationStudyModeData = async (programCode: string) => {
  const response = await FinanceApi.get(
    `${CommonApi.GETSTUDYMODEPROGRAMS}/${programCode}`
  );
  try {
    if (response.status === 200) return await response.data?.data;
  } catch (error: any) {
    return null;
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

export const applyDiscountCode = async (
  appCode: string,
  disCode: string,
  studentType: string
) => {
  const url = process.env.base_Url;
  try {
    const response = await axios.get(
      `${url}application/${appCode}/discount/${disCode}?studentType=${studentType}`
    );
    return response.data;
  } catch (err: any) {
    return err;
  }
};

export const transformDate = (date: Date) => {
  const month = date.toLocaleString("default", { month: "short" });

  const year = date.getFullYear();
  const day = date.getDate();

  return `${day}th ${month} ${year}`;
};

export function sortAscending(a, b, key: string) {
  // converting to uppercase to have case-insensitive comparison
  const name1 = a[key].toUpperCase();
  const name2 = b[key].toUpperCase();

  let comparison = 0;

  if (name1 > name2) {
    comparison = 1;
  } else if (name1 < name2) {
    comparison = -1;
  }
  return comparison;
}

export const isEmpty = (object: any) =>
  !object || object === null || object === undefined
    ? true
    : Object.keys(object).length === 0 && object.constructor === Object;

export function isObjectEmpty(object: any) {
  if (!object) return true;
  const mobileNumberKeyOne = "officeMobileNumber";
  const mobileNumberKeyTwo = "mobileNumber";
  const isKin = "isKin";
  const isEmployed = "isEmployed";
  const isSponsored = "isSponsored";
  const newCloneObject = { ...object };
  newCloneObject &&
    mobileNumberKeyOne in newCloneObject &&
    delete newCloneObject[mobileNumberKeyOne];
  newCloneObject &&
    mobileNumberKeyTwo in newCloneObject &&
    delete newCloneObject[mobileNumberKeyTwo];
  newCloneObject && isKin in newCloneObject && delete newCloneObject[isKin];
  newCloneObject &&
    isEmployed in newCloneObject &&
    delete newCloneObject[isEmployed];
  newCloneObject &&
    isSponsored in newCloneObject &&
    delete newCloneObject[isSponsored];
  return Object?.values(newCloneObject).every((v) =>
    v && typeof v === "object"
      ? isObjectEmpty(v)
      : v === 0 || v === null || v === undefined || !v
  );
}

export const formOptions = {
  shouldDirty: true,
  shouldTouch: true,
  shouldValidate: true,
};

export const transformFormData = (formData: any) => {
  if (formData) {
    for (let [key, value] of Object.entries(formData)) {
      if (typeof value === "object") {
        transformFormData(value);
      }
      if (removedKeysToMap.includes(key) && typeof value !== "object") {
        delete formData[key];
      } else if (removedKeysToMap.includes(key) && typeof value !== "object") {
        delete formData[key];
      }
    }
  }

  return formData;
};
