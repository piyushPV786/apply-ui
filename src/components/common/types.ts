export interface IMasterData {
  languages: Language[];
  nationalities: Nationality[];
  qualifications: HighestQualificationElement[];
  races: Race[];
  genders: Gender[];
  highestQualifications: HighestQualificationElement[];
  referredBy: ReferredBy[];
  studyModes: Mode[];
  socialMedias: SocialMedia[];
  employmentIndustries: EmploymentIndustry[];
  employmentStatus: EmploymentStatus[];
  sponsorModes: Mode[];
}

export interface Agent {
  id:   number;
  name: string;
}


export interface EmploymentIndustry {
  id: number;
  industry: string;
}

export interface EmploymentStatus {
  id: number;
  status: string;
}

export interface Gender {
  id: number;
  gender: string;
}

export interface HighestQualificationElement {
  id: number;
  qualification: QualificationEnum;
}

export enum QualificationEnum {
  Graduate = "Graduate",
  PostGraduation = "Post Graduation",
}

export interface Language {
  id: number;
  language: string;
}

export interface Nationality {
  id: number;
  nationality: string;
}

export interface Race {
  id: number;
  race: string;
}

export interface ReferredBy {
  id: number;
  referredBy: string;
}

export interface SocialMedia {
  id: number;
  socialMedia: string;
}

export interface Mode {
  id: number;
  mode: string;
}
