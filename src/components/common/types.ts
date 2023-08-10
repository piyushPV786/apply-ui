export interface HighestQualificationElement {
  id: number;
  qualification: QualificationEnum;
}

export enum QualificationEnum {
  Graduate = "Graduate",
  PostGraduation = "Post Graduation",
}

export enum NationalityEnum {
  southAfrica = "SA",
  India = "IND",
}

interface ICountry {
  name: string;
  isoCode: string;
  flag: string;
  phonecode: string;
  currency: string;
  latitude: string;
  longitude: string;
  timezones: ITimezone[];
}

interface ICountry {}

interface ITimezone {
  zoneName: string;
  gmtOffset: number;
  gmtOffsetName: string;
  abbreviation: string;
  tzName: string;
}

interface IState {
  name: string;
  isoCode: string;
  countryCode: string;
  latitude: string;
  longitude: string;
}

export interface IAddressDetailType {
  country: ICountry[];
  state: IState[];
  city: IState[];
}

export interface IStudyModeQualification {
  programCode: string;
  programName: string;
  studyModes: IStudyMode[];
}

export interface IStudyMode {
  studyModeCode: string;
  fees: IFee[];
  description: string;
}

export interface IFee {
  fee: string;
  feeMode: string;
}

export interface ILeadFormValues {
  isAgreedTermsAndConditions: boolean;
  lead: Lead;
  address: Address[];
  education: Education;
  payment?: Payment;
  sponsor?: any;
  employment?: any;
  document?: any;
  kin?: any;
  [key: string]: any;
}

interface Education {
  programCode: string;
  qualificationCode: string;
  highSchoolName: string;
  referredById: string;
  studentTypeCode: string;
  applicationFees: string;
  studyModeCode: string;
  socialMediaCode: string;
  agentCode: string;
  studyModeDetail?: any;
  programName?: string;
  internationDegreeVal: string;
}
export interface Payment {
  paymentProof: File & { typeCode: string }[];
  paymentType: null;
  selectedCurrency: string;
  managementDiscountCode: string;
  selectedFeeModeFee?: string;
  discountAmount?: string | number;
  [key: string]: any;
}
interface Address {
  street: string;
  zipcode: string;
  city: string;
  state: string;
  country: string;
  addressType: string;
}

interface Lead {
  firstName: string;
  middleName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
  mobileNumber: string;
  identificationNumber: string;
  gender: string;
  language: string;
  race: string;
  identificationDocumentType: string;
  nationality: string;
  mobileCountryCode: string;
  leadCode: string;
  isAgreedTermsAndConditions: boolean;
}

export interface IMasterData {
  languageData: IOption[];
  relationData: IOption[];
  nationalityData: IOption[];
  programs: IOption[];
  raceData: IOption[];
  genderData: IOption[];
  qualifications: IOption[];
  studyModeData: IOption[];
  socialMediaData: IOption[];
  employmentIndustryData: IOption[];
  employmentStatusData: IOption[];
  sponsorModeData: IOption[];
  highestQualificationData: IOption[];
  documentTypeData: IOption[];
  salutaionData: IOption[];
  countryData: IOption[];
  disablityData: IOption[];
  agentData: IOption[];
  studentTypeData: IOption[];
  nationalityStatus: IOption[];
}

export interface IOption {
  isActive: boolean;
  id: number;
  createdBy?: any;
  createdAt: string;
  updatedBy?: any;
  updatedAt: string;
  deletedBy?: any;
  deletedAt?: any;
  name: string;
  code: string;
  category?: string;
}

export interface Mode {
  id: number;
  name: string;
}

export interface IApplication {
  isActive: boolean;
  id: number;
  applicationCode: string;
  programName?: string;
  updatedAt?: string;
  status: string;
  enrolmentCode?: string;
  education: IEducation;
  lead: ILead;
  document: IDocument;
  studentCode: string;
  username: string;
  password: string;
}

export interface IDocument {
  id: number;
  documentTypeCode: string;
  name: string;
  status: string;
  comments: null;
}

export interface IEducation {
  programCode: string;
  [key: string]: any;
}
export interface ILead {
  isActive: boolean;
  id: number;
  leadCode: string;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  mobileCountryCode: string;
  dateOfBirth: Date;
  identificationNumber: null;
  gender: null;
  nationality: null;
  language: string;
  race: null;
  enrollmentCode?: string;
}

export interface IDynamicObject {
  [key: string]: any;
}
