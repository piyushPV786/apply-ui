export enum CommonEnums {
  DRAFT_STATUS = "APP-DRAFT",
  FEES_PENDING_STATUS = "APP-FEE-PEND",
  APP_ENROLLED_STATUS = "APP-ENROLLED",
  APP_ENROLLED_ACCEPTED = "ENRL-ACCEPTED",
  RESUB_APP_FEE_PROOF = "RESUB-APP-FEE-PROOF",
  APP_FEE_DOC_VER_PEND = "APP-FEE-DOC-VER-PEND",
  APP_FEE_VER_PEND="APP-FEE-VER-PEND",
  RESUB_APP_DOC = "RESUB-APP-DOC",
  APP_FEE_ACCEPTED = "APP-FEE-ACCEPTED",
  RMAT_PENDING ="RMAT-PENDING",
  MANAGEMENT = "management",
  BURSARY = "bursary",
  EMPLOYEE_BURSARY = "empbursary",
  REGULAR = "regular",
  GUARDIAN = "guardian",
  SOUTH_AFRICA_CURRENCY = "RAND",
  DOCUMENT='Document',
}
export enum AlertEnums {
  INFO = "info",
  DANGER = "danger",
  WARNING = "warning",
  SUCCESS = "success",
}

export enum MagicNumbers {
  ZERO = 0,
  ONE = 1,
  TWO = 2,
  THREE = 3,
  Four = 4,
  FIVE = 5,
}

export const AddressApi = {
  GETCOUNTRIES: "global/getCountries",
  GETSTATES: "global/getStatesOfCountry",
  GETCITY: "global/getCitiesOfState",
};
export const CommonApi = {
  GETSTUDYMODEPROGRAMS: "programs-fee/byProgramCode",
  GETMASTERDATA: "master/loadMasterData",
  GETAGENT: "global/agent",
  GETUSERDETAIL: "/user",
  SAVEUSER: "/lead",
  SAVEDRAFT: "/draft",
  REGISTERUSER: "/register",
  VERIFYOTP: "/verify-otp",
  PAYUPAYMENT: "global/payuPayment",
  GETINTRESTEDQUALIFICATION: "programs",
  GETDOCUMENTURL: "global/file",
  GETCOMMONDOCUMENTURL: "/document",
  GETDOCUMENT: "/document/upload",
  GETCURRENCYCONVERSION: "/programs-fee/fee-conversion-rate/",
};

export const RoutePaths = {
  Application_Form: "/student-registration-form/application-form",
  Payment_Success: "/student-registration-form/student-payment-docs-success",
  Document_Success: "/payment/document-upload-success",
  APPLICATION_ENROLLED_SUCCESS: "/payment/application-enrolled-success",
  Dashboard: "/student-registration-form/dashboard",
};

export const PaymentTypes = [
  {
    name: "Payu",
    value: "payu",
  },
  { name: "RazorPay", value: "razorpay" },
  { name: "Stripe", value: "stripe" },
];

export const AgentandSocialMedia = [
  { code: "AGENT", name: "Agent" },
  { code: "SOCIALMEDIA", name: "Social Media" },
];
export const studentType = [
  { name: "Regular", code: "REGULAR" },

  { name: "Bursary", code: "BURSARY" },

  { name: "Management", code: "MANAGEMENT" },
];

export const identityDocuments = [
  {
    code: "SI",
    name: "Smart ID",
  },
  { code: "DL", name: "Driving License" },
  { code: "PA", name: "Passport" },
];

export const acceptedKeysToMap = [
  "kin",
  "address",
  "lead",
  "education",
  "employment",
  "sponsor",
];

export const removedKeysToMap = [
  "id",
  "isActive",
  "updatedAt",
  "deletedAt",
  "createdAt",
];

export const bursaryWarning =
  "You must upload Bursary letter in upload document section";
