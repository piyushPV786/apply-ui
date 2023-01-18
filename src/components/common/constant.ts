export enum AddressEnums {
  ADDRESSTYPE1 = 1,
  ADDRESSTYPE2 = 2,
  STATE = "state",
  COUNTRY = "country",
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
  GETSTUDYMODEPROGRAMS: "programs",
  GETMASTERDATA: "master/loadMasterData",
  GETAGENT: "global/agent",
  GETUSERDETAIL: "/user",
  SAVEUSER: "/lead",
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
  { id: 1, name: "Agent" },
  { id: 2, name: "Social Media" },
];
export const studentType = [
  { name: "Regular", id: 0 },

  { name: "Bursary", id: 1 },

  { name: "Management", id: 2 },
];
