export enum CommonEnums {
  DRAFT = "APP-DRAFT",
  FEES_PENDING = "APP-FEE-PEND",
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
};

export const RoutePaths = {
  Application_Form: "/student-registration-form/application-form",
  Payment_Success: "/student-registration-form/student-payment-docs-success",
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
  { code: 1, name: "Agent" },
  { code: 2, name: "Social Media" },
];
export const studentType = [
  { name: "Regular", code: "REGULAR" },

  { name: "Bursary", code: "BURSARY" },

  { name: "Management", code: "MANAGEMENT" },
];
