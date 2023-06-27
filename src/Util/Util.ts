import axios from "axios";
import { FieldValues, UseFormSetValue } from "react-hook-form";
import {
  acceptedKeysToMap,
  CommonApi,
  removedKeysToMap,
} from "../components/common/constant";
import { ILeadFormValues } from "../components/common/types";
import { AuthApi, CommonAPI, FinanceApi, baseAuth } from "../service/Axios";
import { parsePhoneNumber } from "react-phone-number-input";
import { toast } from "react-toastify";
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
        formData[key] = { isKin: "no" };
      }

      if (
        key == "sponsor" &&
        (formData[key]?.isSponsor === "no" || !formData[key]?.isSponsor)
      ) {
        formData[key] = { isSponsor: "no" };
      }

      if (
        key == "employment" &&
        (formData[key]?.isEmployment == "no" || !formData[key]?.isEmployment)
      ) {
        formData[key] = { isEmployment: "no" };
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
  if (age > 100) return false;
  if (age > currentYear) return false;
  else return true;
};
export const isValidEmail = (email: string, passValidator?: any) => {
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
export const isValidFileType = (files: any[]) => {
  if (!files || files.length === 0) return [];
  return files.filter((file) => file?.error === true);
};
export const onlyAlphabets = (value: string) => /^[a-zA-Z ]*$/.test(value);
export const onlyAlphaNumeric = (value: string) =>
  /^(?![0-9]*$)[a-zA-Z0-9]+$/.test(value);
export const onlyAlphaNumericSpace = (value: string) =>
  /^(?![0-9]*$)[a-zA-Z0-9 ]+$/.test(value);
export const onlyAlphabetsOrNumbers = (value: string) =>
  /^[A-Za-z0-9 ]*$/.test(value);
export const onlyAlphabetsOrNumbersDash = (value: string) =>
  /^[A-Za-z0-9\-, ]*$/.test(value);

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
  const leadData: any =
    window.localStorage.getItem("leadData") &&
    window.localStorage.getItem("leadData") !== "undefined" &&
    window.localStorage.getItem("leadData") !== "{}"
      ? window.localStorage.getItem("leadData")
      : "";
  const applicationCode = leadData
    ? JSON.parse(leadData)?.applicationData?.applicationCode
    : JSON.parse(window.sessionStorage.getItem("activeLeadDetail")!)
        ?.applicationCode;
  const activeLeadDetail = JSON.parse(
    sessionStorage?.getItem("activeLeadDetail") as any
  )?.applicationCode;
  const leadCode = activeLeadDetail || applicationCode;
  if (leadCode) {
    appCode = leadCode;
  }
  return appCode;
};
interface getSignParams {
  documentTypeCode: string;
  fileName: string;
  fileType: string;
  amount?: number | string;
  paymentModeCode?: string;
}
export const getUploadDocumentUrl = async (
  payload: getSignParams,
  code?: string
) => {
  const url = process.env.base_Url;
  const appCode = code || getApplicationCode();
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
export const getAllDocumentsDetails = async (code?: string) => {
  const url = process.env.base_Url;
  const appCode = code || getApplicationCode();
  try {
    const response: any = await AuthApi.get(
      `${url}application/documents/${appCode}`
    );
    if (response.status === 200) {
      const { data } = response;
      return await data;
    }
  } catch (error: any) {
    console.log(error.message);
    return error;
  }
};
export const downloadDeclarationLetter = async (code?: string) => {
  const url = process.env.base_Url;
  const appCode = code || getApplicationCode();
  try {
    const response: any = await AuthApi.get(
      `${url}application/${appCode}/download/declarationForm`
    );
    if (response.status === 200) {
      const { data } = response;
      return await data;
    }
  } catch (error: any) {
    console.log(error.message);
    return error;
  }
};
export const getCommonUploadDocumentUrl = async (fileName: string) => {
  try {
    const response: any = await CommonAPI.get(
      `${CommonApi.GETCOMMONDOCUMENTURL}?filename=${fileName}`
    );
    if (response.status === 200) {
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
  // const request = new FormData();
  // request.append("file", file);
  try {
    const response = await axios.put(uploadFileUrl, file);
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
  studentType: string,
  isManagement?: boolean
) => {
  const url = process.env.base_Url;
  try {
    const response = await baseAuth.get(
      `${url}application/${appCode}/discount/${disCode}?studentType=${studentType}`
    );
    return response.data;
  } catch (err: any) {
    return err;
  }
};

export const clearRoute = () => {
  sessionStorage.setItem("routeTo", "");
};

export const validateNumber = (number, countryCodeRef) =>
  number &&
  parsePhoneNumber(number, countryCodeRef)?.nationalNumber?.length! >= 6 &&
  parsePhoneNumber(number, countryCodeRef)?.nationalNumber?.length! <= 15;

export const transformDate = (date: Date, transformCustom?: boolean) => {
  const month: any = transformCustom
    ? date.getMonth()
    : date.toLocaleString("default", { month: "short" });

  const year = date.getFullYear();
  const day = date.getDate();
  if (transformCustom) {
    return `${year}-${month < 10 ? `0${month}` : month}-${day}`;
  }
  return `${day}${getDateNth(day)} ${month} ${year}`;
};

const getDateNth = (date: number) => {
  if (date > 3 && date < 21) return "th";
  switch (date % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
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
  const isSponsor = "isSponsor";
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
    isSponsor in newCloneObject &&
    delete newCloneObject[isSponsor];
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

export const formDirtyState = {
  shouldDirty: true,
  shouldTouch: true,
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

export const downloadDocument = (url, fileName: string) => {
  let alink = document.createElement("a");
  alink.href = url;
  alink.download = fileName;
  alink.click();
};

export const mapFormDefaultValue = (
  studentData: object,
  setValue: UseFormSetValue<ILeadFormValues>
) => {
  let valueCode;
  for (let [key, value] of Object.entries(studentData)) {
    if (acceptedKeysToMap.includes(key)) {
      if (key === "education" && studentData[key]) {
        valueCode = studentData[key]?.socialMediaCode
          ? "SOCIALMEDIA"
          : studentData[key]?.agentCode
          ? "AGENT"
          : "";
        setValue(key, value, formOptions);
      }
      setValue(key, value, formOptions);
    }
    setValue("education.referredById", valueCode, formOptions);
  }
};

export const showSuccessToast = (message: string) => {
  toast.success(message, {
    className: "toast-success",
  });
};

export const showErrorToast = (message: string) => {
  toast.error(message, {
    className: "toast-error",
  });
};

export const showWarningToast = (message: string) => {
  toast.warning(message, {
    className: "toast-warning",
  });
};
