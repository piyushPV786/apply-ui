export const apiUrls = {
  applyBaseUrl: process.env.NEXT_PUBLIC_APPLY_BACKEND_API,
  academicBaseUrl: process.env.NEXT_PUBLIC_ACADEMIC_BACKEND_API,
  financeBaseUrl: process.env.NEXT_PUBLIC_FINANCE_BACKEND_API,
  commonBaseUrl: process.env.NEXT_PUBLIC_COMMON_BACKEND_API,
  userManagementBaseUrl: process.env.NEXT_PUBLIC_USER_MANAGEMENT_BACKEND_API,
  enrolmentBaseUrl: process.env.NEXT_PUBLIC_ENROLMENT_BACKEND_API,
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
  enrolmentApplicationDetails: "admissions/:applicationCode",
  studentProgram: "programs-fee/byProgramCode/:programCode",
  stateDetails: "state/:countryCode",
  nationalityStatus: "nationality-status",
  identificationType: "identification-Type",
  lead: "lead",
  payu: "/payment/payu",
  termAndCondFile: "application/terms-condition/:name/:email",
  checkDuplicateEmail: "lead/check-duplicate-email/:email/leadCode/:leadCode",
  draft: "draft",
  declarationForm: "download/declarationForm",
  GETCURRENCYCONVERSION: "programs-fee/fee-conversion-rate/",
  studyModes: "study-mode",
  program: "programs/:programCode",
  rmat: "application/rmat/details/:studentCode",
  ukhesheToken: "payments/get-ukheshe-token",
  updatePayment: "payments/ukheshe-payment",
  bursary: "bursary",
  status: "set-status",
};