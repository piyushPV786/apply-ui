export interface Agent {
  id: number;
  name: string;
}

export interface HighestQualificationElement {
  id: number;
  qualification: QualificationEnum;
}

export enum QualificationEnum {
  Graduate = "Graduate",
  PostGraduation = "Post Graduation",
}

export interface Mode {
  id: number;
  mode: string;
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
  id: number;
  qualification: string;
  StudyModes: IStudyMode[];
}

export interface IStudyMode {
  id: number;
  mode: string;
  fees: IFee[];
}

export interface IFee {
  id: number;
  fees: number;
  feesPeriod: string;
}

export interface IMasterData {
  languages: IOption[];
  nationalityData: IOption[];
  programs: IOption[];
  raceData: IOption[];
  genderData: IOption[];
  qualifications: IOption[];
  referrals: any[];
  studyModeData: IOption[];
  socialMediaData: IOption[];
  employmentIndustries: IOption[];
  employmentStatusData: IOption[];
  sponsorModes: IOption[];
  highestQualificationData: IOption[];
  documentTypeData: IOption[];
  salutaionData: IOption[];
  countryData: IOption[];
  disablityData: IOption[];
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
}
