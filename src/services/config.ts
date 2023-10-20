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
  programAll: "programs/all",
  commonDocuments: "document-type",
  document: "document",
};
