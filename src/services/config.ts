export const apiUrls = {
  applyBaseUrl: process.env.base_Url,
  academicBaseUrl: process.env.Academic_Url,
  financeBaseUrl: process.env.Finance_Url,
  commonBaseUrl: process.env.Common_Url,
  userManagementBaseUrl: process.env.NEXT_PUBLIC_USER_MANAGEMENT_REDIRECT_URI,
};

export const apiEndPoint = {
  loadMasterData: "master/loadMasterData ",
  register: "auth/register",
  verifyOtp: "auth/verify-otp",
  refreshToken: "auth/refresh-token",
  salesAgent: "user/role/Sales",
  application: "application",
  programs: "programs/all",
  commonDocuments: "document-type",
  document: "document",
  applicationDetails: "lead/:leadCode/application/:applicationCode",
  studentProgram: "programs-fee/byProgramCode/:programCode",
  stateDetails: "state/:countryCode",
  nationalityStatus: "nationality-status",
  identificationType: "identification-Type",
  lead: "lead",
  payu: "/payment/payu",
  termAndCondFile: "application/terms-condition/:name/:email",
  checkDuplicateEmail: "lead/check-duplicate-email/:email/leadCode/:leadCode",
};
