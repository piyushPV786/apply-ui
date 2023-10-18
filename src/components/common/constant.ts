export enum StorageName {
  STUDENT_DETAIL = "studentDetails",
  ACCESS_TOKEN = "access_token",
  REFRESH_TOKEN = "refresh_token",
}

export enum CommonEnums {
  TRUE = "true",
  NEW_STATUS = "New-Application",
  DRAFT_STATUS = "APP-DRAFT",
  FEES_PENDING_STATUS = "APP-FEE-PEND",
  APP_ENROLLED_STATUS = "APP-ENROLLED",
  APP_ENROLLED_ACCEPTED = "ENRL-ACCEPTED",
  RESUB_APP_FEE_PROOF = "RESUB-APP-FEE-PROOF",
  APP_FEE_DOC_VER_PEND = "APP-FEE-DOC-VER-PEND",
  APP_FEE_VER_PEND = "APP-FEE-VER-PEND",
  RESUB_APP_DOC = "RESUB-APP-DOC",
  APP_FEE_ACCEPTED = "APP-FEE-ACCEPTED",
  RMAT_PENDING = "RMAT-PENDING",
  MANAGEMENT = "management",
  BURSARY = "bursary",
  EMPLOYEE_BURSARY = "empbursary",
  REGULAR = "regular",
  GUARDIAN = "guardian",
  SOUTH_AFRICA_CURRENCY = "RAND",
  DOCUMENT = "Document",
  PROG_ADMITTED = "PROG-ADMITTED",
  ACCEPTANCE_LETTER = "ACCEPTANCE-LETTER",
  CONFIRMATION_LETTER = "CONFIRMATION-LETTER",
  WELCOME_LETTER = "WELCOME-LETTER",
}

export enum GraduationType {
  PG = "postgraduate",
  UG = "undergraduate",
}

export const DARK_GRAY = "#4f4f4f";
export const ORANGE = "#dd6d0b";
export const BLUE = "#0070c0";
export const OLIVE_GREEN = "#548235";
export const DARK_YELLOW = "#7a6e00";
export const RED = "#ff0000";
export const NAVY_BLUE = "#203764";
export const STEEL_TEAL = "#4F958E";
export const GREEN = "#548235";

export const APPLICATION_STATUS = {
  SAVED_AS_DRAFT: "APP-DRAFT",
  APPLICATION_FEE_PENDING: "APP-FEE-PEND",
  APPLICATION_FEE_VERIFICATION_PENDING: "APP-FEE-VER-PEND",
  RESUBMIT_APPLICATION_FEE_PROOF: "RESUB-APP-FEE-PROOF",
  APPLICATION_FEE_ACCEPTED: "APP-FEE-ACCEPTED",
  ENROLLED_TO_APPLICATION: "APP-ENROLLED",
  UPLOAD_APPLICATION_DOCUMENTS: "UPLD-APP-DOC",
  APPLICATION_DOCUMENTS_UPLOADED: "APP-DOC-UPLOADED",
  APPLICATION_DOCUMENT_VERIFICATION_PENDING: "APP-DOC-VER-PEND",
  RESUBMIT_APPLICATION_DOCUMENTS: "RESUB-APP-DOC",
  APPLICATION_DOCUMENTS_ACCEPTED: "APP-DOC-ACCEPTED",
  RMAT_PENDING: "RMAT-PEND",
  RMAT_PASS: "RMAT-PASS",
  RMAT_FAIL: "RMAT-FAIL",
  ENROLMENT_ACCEPTED: "ENRL-ACCEPTED",
  INTAKE_ASSIGNMENT_PENDING: "INTAKE-ASSIGNMENT-PEND",
  PROGRAM_FEES_PENDING: "PROG-FEE-PEND",
  REQUEST_FOR_BURSARY: "BURSARY-REQUESTED",
  UPLOAD_BURSARY_DOCUMENTS: "UPLD-BURSARY-DOC",
  BURSARY_DOCUMENTS_UPLOADED: "BURSARY-DOC-UPLOADED",
  RESUBMIT_BURSARY_DOCUMENTS: "RESUB-BURSARY-DOC",
  BURSARY_DOCUMENTS_ACCEPTED: "BURSARY-DOC-ACCEPTED",
  BURSARY_CONFIRMATION_PENDING: "BURSARY-PEND",
  BURSARY_APPROVED: "BURSARY-APPROVED",
  BURSARY_REJECTED: "BURSARY-REJECTED",
  REQUEST_FOR_LOAN: "LOAN-REQUESTED",
  UPLOAD_LOAN_DOCUMENTS: "UPLD-LOAN-DOC",
  LOAN_DOCUMENTS_UPLOADED: "LOAN-DOC-UPLOADED",
  RESUBMIT_LOAN_DOCUMENTS: "RESUB-LOAN-DOC",
  LOAN_DOCUMENTS_ACCEPTED: "LOAN-DOC-ACCEPTED",
  LOAN_CONFIRMATION_PENDING: "LOAN-PEND",
  LOAN_APPROVED: "LOAN-APPROVED",
  LOAN_REJECTED: "LOAN-REJECTED",
  PROGRAM_FEES_VERIFICATION_PENDING: "PROG-FEE-VER-PEND",
  RESUBMIT_PROGRAM_FEE_PROOF: "RESUB-PROG-FEE-PROOF",
  PROGRAM_FEE_ACCEPTED: "PROG-FEE-ACCEPTED",
  ADMITTED_TO_PROGRAM: "INTAKE-ASSIGNMENT PENDING",
  INTAKE_ASSIGNED: "INTAKE-ASSIGNED",
  ENROLLED_BY_ADMISSION: "PROG-ADMITTED/ENROLLED",
};

export enum DocumentStatus {
  UploadPending = "upload pending",
  Approved = "approved",
  Submitted = "submitted",
  Rejected = "rejected",
}

export const ErrorMessage = "Something went wrong please try again later";
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
  REGISTERUSER: "/auth/register",
  VERIFYOTP: "/auth/verify-otp",
  PAYUPAYMENT: "global/payuPayment",
  GETINTRESTEDQUALIFICATION: "programs/all",
  GETDOCUMENTURL: "global/file",
  GETCOMMONDOCUMENTURL: "/document",
  GETDOCUMENT: "/document/upload",
  GETCURRENCYCONVERSION: "/programs-fee/fee-conversion-rate/",
  GETRMATDETAILS: "/application/rmat/details/",
  NATIONALITYSTATUS: "/nationality-status",
  AGENT_LIST: "/user/role/Sales",
  IDENTIFICATIONDOCUMENT: "/identification-Type",
  EMAILCHECK: "/lead/check-duplicate-email",
  STATE: "state",
};

export const RoutePaths = {
  Application_Form: "/student-registration-form/application-form",
  Payment_Success: "/payment/document-success",
  Document_Success: "/payment/document-upload-success",
  Document_Save_Success: "/payment/document-save-success",
  APPLICATION_ENROLLED_SUCCESS: "/payment/application-enrolled-success",
  Dashboard: "/student-registration-form/dashboard",
  StudentDashboard: "/dashboard",
  RMATView: "/rmat",
};

export const FeemodeCode = {
  APPLICATION: "APPLICATION",
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
  { code: "BI", name: "BookId" },
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

export const tokenName = {
  accessToken: "accessToken",
  refreshToken: "refreshToken",
};
