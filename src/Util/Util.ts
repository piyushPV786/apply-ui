import axios from "axios";
import { FieldValues, UseFormSetValue } from "react-hook-form";
import {
  acceptedKeysToMap,
  APPLICATION_STATUS,
  BLUE,
  CommonApi,
  DARK_GRAY,
  GREEN,
  MagicNumbers,
  NAVY_BLUE,
  ORANGE,
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
  document: "",
};
/**
 * Maps form data by removing specific keys and values based on conditions.
 * @param {Object} data - The form data to be mapped.
 * @param {boolean} isDraft - Flag indicating whether the form is in draft mode.
 * @param {number} activeStep - indicate active step.
 * @returns {Object} - The mapped form data.
 */
export const mapFormData = (data, isDraft?: boolean, activeStep?: number) => {
  let formData = data;
  if (activeStep == MagicNumbers.TWO && isDraft && ignorKeys.document) {
    delete (ignorKeys as any).document;
  }
  if (formData) {
    for (let [key, value] of Object.entries(formData)) {
      // Remove specific keys from the formData object
      if (key in ignorKeys) {
        delete formData[key];
      }

      // Remove keys with empty values if isDraft flag is true
      if (formData[key]?.length <= 0 && isDraft) {
        delete formData[key];
      }

      // Set default value for "zipcode" key if it doesn't exist
      if (key == "zipcode" && !formData[key]) {
        formData[key] = 0;
      }

      // Set default value for "kin" key if it doesn't exist or isKin is "no"
      if (
        key == "kin" &&
        (formData[key]?.isKin == "no" || !formData[key]?.isKin)
      ) {
        formData[key] = { isKin: "no" };
      }

      // Set default value for "sponsor" key if it doesn't exist or isSponsor is "no"
      if (
        key == "sponsor" &&
        (formData[key]?.isSponsor === "no" || !formData[key]?.isSponsor)
      ) {
        formData[key] = { isSponsor: "no" };
      }

      // Set default value for "employment" key if it doesn't exist or isEmployment is "no"
      if (
        key == "employment" &&
        (formData[key]?.isEmployment == "no" || !formData[key]?.isEmployment)
      ) {
        formData[key] = { isEmployment: "no" };
      }

      // Delete specific keys from formData based on the removedKeysToMap array
      if (removedKeysToMap[key] && typeof formData[key] !== "object") {
        delete formData[key];
      }

      // Convert "identificationPassportNumber" value to a number
      if (
        key === "identificationPassportNumber" &&
        typeof formData[key] !== "object"
      ) {
        formData[key] = Number(value);
      }

      // Recursively map formData if the value is an object
      if (typeof formData[key] === "object") {
        mapFormData(formData[key]);
      }
    }
    return formData;
  }
};

/**
 * Performs a deep clone of an object.
 * @param {any} obj - The object to be cloned.
 * @returns {any} - The cloned object.
 */
export const deepClone = (obj) => {
  if (typeof obj !== "object" || obj === null) {
    return obj; // Return primitives and null as is
  }

  let clone;

  if (Array.isArray(obj)) {
    clone = [];
    for (let i = 0; i < obj.length; i++) {
      clone[i] = deepClone(obj[i]); // Recursively clone array elements
    }
  } else {
    clone = {};
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        clone[key] = deepClone(obj[key]); // Recursively clone object properties
      }
    }
  }

  return clone;
};

/**
 * Returns the color associated with the application status.
 * @param {string} status - The application status.
 * @returns {string} - The color associated with the status.
 */
export const getStatusColor = (status) => {
  const applicationStatus = status;

  switch (applicationStatus) {
    case APPLICATION_STATUS.SAVED_AS_DRAFT:
      return DARK_GRAY;
      break;
    case APPLICATION_STATUS.BURSARY_DOCUMENTS_ACCEPTED:
    case APPLICATION_STATUS.RESUBMIT_BURSARY_DOCUMENTS:
    case APPLICATION_STATUS.BURSARY_CONFIRMATION_PENDING:
    case APPLICATION_STATUS.UPLOAD_APPLICATION_DOCUMENTS:
    case APPLICATION_STATUS.RESUBMIT_APPLICATION_DOCUMENTS:
    case APPLICATION_STATUS.RMAT_PENDING:
    case APPLICATION_STATUS.PROGRAM_FEES_PENDING:
    case APPLICATION_STATUS.UPLOAD_BURSARY_DOCUMENTS:
    case APPLICATION_STATUS.RESUBMIT_BURSARY_DOCUMENTS:
      return ORANGE;
      break;
    case APPLICATION_STATUS.ENROLLED_TO_APPLICATION:
    case APPLICATION_STATUS.APPLICATION_FEE_ACCEPTED:
    case APPLICATION_STATUS.ENROLMENT_ACCEPTED:
    case APPLICATION_STATUS.APPLICATION_DOCUMENTS_ACCEPTED:
      return BLUE;
      break;
    case APPLICATION_STATUS.APPLICATION_DOCUMENTS_UPLOADED:
    case APPLICATION_STATUS.BURSARY_DOCUMENTS_UPLOADED:
      return GREEN;
      break;
    case APPLICATION_STATUS.REQUEST_FOR_BURSARY:
      return NAVY_BLUE;
      break;
    default:
      return DARK_GRAY;
      break;
  }
};

/**
 * Checks if a given date is valid.
 * @param {string} value - The date value to be validated.
 * @returns {boolean} - Whether the date is valid or not.
 */
export const isValidDate = (value) => {
  const currentYear = new Date().getFullYear();
  const year = value.split("-")[0];
  const age = currentYear - +year;

  if (age < 16) return false;
  if (age > 100) return false;
  if (age > currentYear) return false;
  else return true;
};

/**
 * Checks if a given email is valid.
 * @param {string} email - The email to be validated.
 * @param {any} passValidator - A password validator.
 * @returns {boolean} - Whether the email is valid or not.
 */
export const isValidEmail = async (email, passValidator?) => {
  if (passValidator) return true;

  return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
};

/**
 * Checks if a given file type is invalid.
 * @param {string} type - The file type to be checked.
 * @returns {boolean} - Whether the file type is invalid or not.
 */
export const isInvalidFileType = (type) => {
  switch (type) {
    case "image/png":
    case "image/jpeg":
    case "image/jpg":
    case "application/pdf":
      return false;
    default:
      return true;
  }
};

/**
 * Removes duplicate objects from an array based on a specific key.
 * @param {Array} array - The array to be processed.
 * @param {string} key - The key to check for uniqueness.
 * @returns {Array} - The array with unique objects.
 */
export const uniqueArrayOfObject = (array, key) => [
  ...(new Map(array.map((item) => [item[key], item])).values() as any),
];

/**
 * Checks if any of the files in an array have an invalid file type.
 * @param {Array} files - The array of files to be checked.
 * @returns {Array} - The array of files with invalid file types.
 */
export const isValidFileType = (files) => {
  if (!files || files.length === 0) return [];

  return files.filter((file) => file?.error === true);
};

/**
 * Checks if a given value contains only alphabets.
 * @param {string} value - The value to be checked.
 * @returns {boolean} - Whether the value contains only alphabets or not.
 */
export const onlyAlphabets = (value) => /^[a-zA-Z ]*$/.test(value);
export const onlyNumber = (value) => /^[0-9]*$/.test(value);

/**
 * Capitalizes the first letter of a string.
 * @param {string} str - The string to be capitalized.
 * @returns {string} - The string with the first letter capitalized.
 */
export const capitalizeFirstLetter = (str) => {
  const capitalized = str.charAt(0).toUpperCase() + str.slice(1);
  return capitalized;
};

/**
 * Checks if a given value contains only alphanumeric characters.
 * @param {string} value - The value to be checked.
 * @returns {boolean} - Whether the value contains only alphanumeric characters or not.
 */
export const onlyAlphaNumeric = (value) =>
  /^(?![0-9]*$)[a-zA-Z0-9]+$/.test(value);

/**
 * Checks if a given value contains only alphanumeric characters and spaces.
 * @param {string} value - The value to be checked.
 * @returns {boolean} - Whether the value contains only alphanumeric characters and spaces or not.
 */
export const onlyAlphaNumericSpace = (value) =>
  /^(?![0-9]*$)[a-zA-Z0-9 ]+$/.test(value);

/**
 * Checks if a given value contains only alphabets or numbers.
 * @param {string} value - The value to be checked.
 * @returns {boolean} - Whether the value contains only alphabets or numbers or not.
 */
export const onlyAlphabetsOrNumbers = (value) => /^[A-Za-z0-9 ]*$/.test(value);

/**
 * Checks if a given value contains only alphabets, numbers, dashes, or commas.
 * @param {string} value - The value to be checked.
 * @returns {boolean} - Whether the value contains only alphabets, numbers, dashes, or commas or not.
 */
export const onlyAlphabetsOrNumbersDash = (value) =>
  /^[A-Za-z0-9\-, ]*$/.test(value);

/**
 * Returns the image URL for a specific payment type.
 * @param {string} type - The payment type.
 * @returns {string} - The image URL for the payment type.
 */
export const GetPaymentImage = (type) => {
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

/**
 * Retrieves the application code from storage.
 * @returns {string} - The application code.
 */
export const getApplicationCode = () => {
  let appCode = "";

  const leadData =
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

/**
 * Retrieves the upload document URL for a specific document type.
 * @param {Object} payload - The parameters for the upload request.
 * @param {string} payload.documentTypeCode - The document type code.
 * @param {string} payload.fileName - The file name.
 * @param {string} payload.fileType - The file type.
 * @param {number|string} [payload.amount] - The amount (optional).
 * @param {string} [payload.paymentModeCode] - The payment mode code (optional).
 * @param {string} [code] - The application code (optional).
 * @returns {Promise<any>} - The upload document URL.
 */
export const getUploadDocumentUrl = async (payload, code?) => {
  const url = process.env.base_Url;
  const appCode = code || getApplicationCode();

  try {
    const response = await AuthApi.post(
      `${url}application/${appCode}/document`,
      payload
    );

    if (response.status === 201) {
      const { data } = response;
      return data;
    }
  } catch (error: any) {
    console.log(error.message);
    return error;
  }
};

/**
 * Retrieves all documents details for a specific application.
 * @param {string} [code] - The application code (optional).
 * @returns {Promise<any>} - The array of documents details.
 */
export const getAllDocumentsDetails = async (code?) => {
  const url = process.env.base_Url;
  const appCode = code || getApplicationCode();

  try {
    const response = await AuthApi.get(
      `${url}application/documents/${appCode}`
    );

    if (response.status === 200) {
      const { data } = response;
      return data;
    }
  } catch (error: any) {
    console.log(error.message);
    return error;
  }
};

/**
 * Downloads the declaration letter for a specific application.
 * @param {string} [code] - The application code (optional).
 * @returns {Promise<any>} - The declaration letter data.
 */
export const downloadDeclarationLetter = async (code?) => {
  const url = process.env.base_Url;
  const appCode = code || getApplicationCode();

  try {
    const response = await AuthApi.get(
      `${url}application/${appCode}/download/declarationForm`,
      { responseType: "blob" }
    );

    if (response.status === 200) {
      const { data } = response;
      return data;
    }
  } catch (error: any) {
    console.log(error.message);
    return error;
  }
};

/**
 * Retrieves the common upload document URL for a specific file name.
 * @param {string} fileName - The file name.
 * @returns {Promise<any>} - The common upload document URL.
 */
export const getCommonUploadDocumentUrl = async (fileName, studentCode) => {
  const filetype = fileName.split(".")[1];

  try {
    const response = await CommonAPI.get(
      `${CommonApi.GETCOMMONDOCUMENTURL}?filename=${fileName}&filetype=${filetype}&studentCode=${studentCode}`
    );

    if (response.status === 200) {
      const { data } = response;
      return data;
    }
  } catch (error: any) {
    console.log(error.message);
    return error;
  }
};

/**
 * Retrieves the qualification study mode data for a specific program.
 * @param {string} programCode - The program code.
 * @returns {Promise<any>} - The qualification study mode data.
 */
export const getQualificationStudyModeData = async (programCode) => {
  const response = await FinanceApi.get(
    `${CommonApi.GETSTUDYMODEPROGRAMS}/${programCode}`
  );

  try {
    if (response.status === 200) {
      return response.data?.data;
    }
  } catch (error: any) {
    return null;
  }
};

/**
 * Uploads a file to the specified upload file URL.
 * @param {string} uploadFileUrl - The upload file URL.
 * @param {File} file - The file to be uploaded.
 * @returns {Promise<any>} - The response data.
 */
export const uploadDocuments = async (uploadFileUrl, file) => {
  try {
    const response = await axios.put(uploadFileUrl, file);

    if (response.status === 200) {
      return response.data;
    } else {
      return response.data;
    }
  } catch (error: any) {
    console.log(error.message);
    return error;
  }
};

/**
 * Applies a discount code to a specific application.
 * @param {string} appCode - The application code.
 * @param {string} disCode - The discount code.
 * @param {string} studentType - The student type.
 * @param {boolean} [isManagement] - Flag indicating whether it's a management discount (optional).
 * @returns {Promise<any>} - The response data.
 */
export const applyDiscountCode = async (
  appCode,
  disCode,
  studentType,
  isManagement = false
) => {
  const url = process.env.base_Url;

  try {
    if (disCode) {
      const response = await baseAuth.get(
        `${url}application/${appCode}/discount/${disCode}?studentType=${studentType}`
      );
      return response.data;
    } else {
      return null;
    }
  } catch (err) {
    return err;
  }
};

/**
 * Clears the route information from session storage.
 */
export const clearRoute = () => {
  sessionStorage.setItem("routeTo", "");
};

/**
 * Validates a phone number based on the country code reference.
 * @param {string} number - The phone number.
 * @param {string} countryCodeRef - The country code reference.
 * @returns {boolean} - Whether the phone number is valid or not.
 */
export const validateNumber = (number, countryCodeRef) =>
  number &&
  parsePhoneNumber(number, countryCodeRef)?.nationalNumber?.length! >= 6 &&
  parsePhoneNumber(number, countryCodeRef)?.nationalNumber?.length! <= 15;

/**
 * Transforms a date into a specific format.
 * @param {Date} date - The date to be transformed.
 * @param {boolean} [transformCustom] - Flag indicating whether to transform the date in a custom format (optional).
 * @returns {string} - The transformed date.
 */
export const transformDate = (date, transformCustom = false) => {
  const month = transformCustom
    ? date.getMonth()
    : date.toLocaleString("default", { month: "short" });

  const year = date.getFullYear();
  const day = date.getDate();

  if (transformCustom) {
    return `${year}-${month < 10 ? `0${month}` : month}-${day}`;
  }

  return `${day}${getDateNth(day)} ${month} ${year}`;
};

/**
 * Retrieves the correct suffix for a given date.
 * @param {number} date - The date.
 * @returns {string} - The suffix for the date.
 */
const getDateNth = (date) => {
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

/**
 * Sorts an array of objects in ascending order based on a specific key.
 * @param {any} a - The first object to be compared.
 * @param {any} b - The second object to be compared.
 * @param {string} key - The key to compare the objects.
 * @returns {number} - The comparison result.
 */
export function sortAscending(a, b, key) {
  const name1 = a[key]?.toUpperCase();
  const name2 = b[key]?.toUpperCase();

  let comparison = 0;

  if (name1 > name2) {
    comparison = 1;
  } else if (name1 < name2) {
    comparison = -1;
  }

  return comparison;
}

/**
 * Checks if an object is empty.
 * @param {any} object - The object to be checked.
 * @returns {boolean} - Whether the object is empty or not.
 */
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

export const emailValidation = async (e) => {
  let returnVal = { message: "" };
  if (
    !/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      e?.target?.value
    )
  ) {
    returnVal = {
      message: "you have entered an invalid email address. Please try again",
    };
  } else {
    returnVal = {
      message: "clear",
    };
  }
  await AuthApi.get(
    `${CommonApi.EMAILCHECK}/${e?.target?.value}/leadCode/${
      JSON.parse(sessionStorage?.getItem("studentId") as any)?.leadCode
    }`
  ).then((data) => {
    if (
      data &&
      data?.data?.data?.message == "Provided email address alredy exists"
    ) {
      returnVal = {
        message: "Provided email address alredy exists",
      };
    }
  });
  return returnVal;
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
        setValue(key, value);
      }
      setValue(key, value);
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

export const formateInPascalCase = (value: string) => {
  const words = value.split("-");
  const formattedString = words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
  return formattedString;
};
