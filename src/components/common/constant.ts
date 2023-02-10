export enum CommonEnums {
  DRAFT_STATUS = "APP-DRAFT",
  FEES_PENDING_STATUS = "APP-FEE-PEND",
  APP_ENROLLED_STATUS = "APP-ENROLLED",
  APP_ENROLLED_ACCEPTED = "ENRL-ACCEPTED",
  RESUB_APP_FEE_PROOF = "RESUB-APP-FEE-PROOF",
  RESUB_APP_DOC = "RESUB-APP-DOC",
  MANAGEMENT = "management",
  BURSARY = "bursary",
  EMPLOYEE_BURSARY = "EMPBURSARY",
  REGULAR = "regular",
  GUARDIAN = "guardian",
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
};

export const RoutePaths = {
  Application_Form: "/student-registration-form/application-form",
  Payment_Success: "/student-registration-form/student-payment-docs-success",
  Document_Success: "/payment/document-upload-success",
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
