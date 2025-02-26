export enum StorageName {
  STUDENT_DETAIL = "studentDetails",
  ACCESS_TOKEN = "access_token",
  REFRESH_TOKEN = "refresh_token",
}

export const status = {
  successCode: 200,
  successCodeOne: 201,
  unauthorizedStatus: 401,
};

export const documentType = {
  "WELCOME-LETTER": "Welcome Letter",
  "ACCEPTANCE-LETTER": "Acceptance Letter",
  "CONFIRMATION-LETTER": "Confirmation Letter",
  QUOTE: "Quote",
};
export const applicationFeesStatus = ["APP-FEE-PEND", "RESUB-APP-FEE-PROOF"];
export const qualificationFeesStatus = [
  "ENRL-ACCEPTED",
  "MONTHLY_PAYMENT_REJECTED",
];
export const rplFeeStatus = ["RPL-FEE-PEND"];
export enum CommonEnums {
  TRUE = "true",
  TOTAL = "TOTAL",
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
  BURSARY = "BURSARY",
  EMPLOYEE_BURSARY = "EMPBURSARY",
  REGULAR = "regular",
  GUARDIAN = "guardian",
  SOUTH_AFRICA_CURRENCY = "RAND",
  DOCUMENT = "Document",
  PROG_ADMITTED = "PROG-ADMITTED",
  ACCEPTANCE_LETTER = "ACCEPTANCE-LETTER",
  CONFIRMATION_LETTER = "CONFIRMATION-LETTER",
  WELCOME_LETTER = "WELCOME-LETTER",
  QUOTE = "QUOTE",
  BURSARY_LETTER_PEND = "BURSARY-LETTER-PEND",
  RESUB_BURSARY_DOC = "RESUB-BURSARY-DOC",
  MONTHLY_PAYMENT_REJECT = "MONTHLY_PAYMENT_REJECTED",
  RPL_FEE_PEND = "RPL-FEE-PEND",
  GRADUATED = "GRADUATED",
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
  UPLOAD_BURSARY_DOCUMENTS: "BURSARY-PEND",
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
  MONTHLY_PAYMENT_REJECT: "MONTHLY_PAYMENT_REJECTED",
  BURSARY_APP_FEE_PEND: "BURSARY-APP-FEE-PEND",
  RPL_FEE_PEND: "RPL-FEE-PEND",
};

// export const docTypes={WELCOME-LETTER=}

export const PRORAM_FEE_BUTTON_STATUS = [
  APPLICATION_STATUS.APPLICATION_FEE_VERIFICATION_PENDING,
  APPLICATION_STATUS.RESUBMIT_APPLICATION_FEE_PROOF,
  APPLICATION_STATUS.APPLICATION_FEE_PENDING,
];
export const UPLOAD_DOCUMENT_BUTTON_STATUS = [
  APPLICATION_STATUS.APPLICATION_FEE_VERIFICATION_PENDING,
  APPLICATION_STATUS.RESUBMIT_APPLICATION_FEE_PROOF,
  APPLICATION_STATUS.ENROLLED_TO_APPLICATION,
  APPLICATION_STATUS.APPLICATION_FEE_PENDING,
  APPLICATION_STATUS.UPLOAD_BURSARY_DOCUMENTS,
  APPLICATION_STATUS.RESUBMIT_APPLICATION_DOCUMENTS,
  APPLICATION_STATUS?.BURSARY_APP_FEE_PEND,
  APPLICATION_STATUS?.RPL_FEE_PEND,
];
export const BURSARY_BUTTON_STATUS = [
  CommonEnums.BURSARY_LETTER_PEND,
  CommonEnums.RESUB_BURSARY_DOC,
];

export enum DocumentStatus {
  UploadPending = "upload pending",
  Approved = "approved",
  Submitted = "submitted",
  Rejected = "rejected",
  Pending = "PENDING",
}
export enum studyMode {
  DAY = "DAY",
  ONLINE = "ONLINE",
  Weekend = "WEEKEND",
  Fulltime = "FULLTIME",
}

export enum feeMode {
  APPLICATION = "APPLICATION",
  TOTAL = "TOTAL",
  MONTHLY = "MONTHLY",
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
  GETMASTERDATA: "apply/master/loadMasterData",
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
  EMAILCHECK: "/apply/lead/check-duplicate-email",
  STATE: "state",
};

export const RoutePaths = {
  Application_Form: "/student-registration-form/application-form",
  Payment_Success: "/payment/document-success",
  Document_Success: "/payment/document-upload-success",
  Document_Save_Success: "/payment/document-save-success",
  APPLICATION_ENROLLED_SUCCESS: "/payment/application-enrolled-success",
  Dashboard: "/dashboard",
  StudentDashboard: "/dashboard",
  RMATView: "/rmat",
};

export const FeemodeCode = {
  APPLICATION: "APPLICATION",
};

export const PaymentTypes = [
  {
    registerName: "paymentType",
    name: "Ukheshe",
    value: "ukheshe",
    label: "Online",
  },
  {
    registerName: "paymentType",
    name: "Offline",
    value: "offline",
    label: "Upload Payment Proof",
  },
  // {
  //   registerName: "paymentType",
  //   name: "Payu",
  //   value: "payuForm",
  // },
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

export const rhfErrorMessage = {
  maxLength: "Max length should be 30",
  minLength: "Minimum length should be 3",
  min: "Please enter positive number",
  numeric: "name must be Characters",
};
export enum RhfErrorTypes {
  MaxLength = "maxLength",
  MinLength = "minLength",
  Min = "min",
  Valid = "validate",
}

export const AddressTypeData = [
  {
    isActive: true,
    id: 0,
    name: "Postal",
    code: "POSTAL",
  },
  {
    isActive: true,
    id: 1,
    name: "Residential",
    code: "RESIDENTIAL",
  },
];

export enum userInformationStatus {
  IdentificationNumberSmart = "Identification number must be 13 digits and contain only numbers for smartID, e.g.- YYMMDD1234567",
  IdentificationNumberPassport = "Passport number must be valid, e.g:- P4366918",
}
