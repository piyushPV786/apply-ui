import axios from "axios";

interface IRegister {
  mobileNumber: string;
  mobileCountryCode: string;
}

interface IVerifyOtp {
  mobileCountryCode: string;
  mobileNumber: string;
  otp: number;
}

interface IGetLeadApplications {
  leadId: string;
}

interface IGetLeadApplicationDetails {
  leadId: string;
  applicationCode: string;
  isDraft: boolean;
}

const _axios = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}`,
});

const _axiosAcademic = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_ACADEMIC_BASE_URL}`,
});

const _axiosFinance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_FINANCE_BASE_URL}`,
});

export const register = async (data: IRegister) => {
  return await _axios.post("/v1/auth/register", data);
};

export const verifyOtp = async (data: IVerifyOtp) => {
  return await _axios.post("/v1/auth/verify-otp", data);
};

export const getLeadApplications = async (
  data: IGetLeadApplications
): Promise<[]> => {
  const response = await _axios.get(`lead/${data.leadId}/application`);
  return response?.data?.data ? response?.data?.data : [];
};

export const getMasterData = async (): Promise<[]> => {
  const response = await _axios.get(`master/loadMasterData`);
  return response?.data?.data ? response?.data?.data : {};
};

export const getProgramsData = async (): Promise<[]> => {
  const response = await _axiosAcademic.get(`programs`);
  return response?.data?.data ? response?.data?.data : {};
};

export const getStudyModeData = async (code: string): Promise<[]> => {
  const response = await _axiosFinance.get(
    `programs-fee/byProgramCode/${code}`
  );
  return response?.data?.data ? response?.data?.data : {};
};

export const getLeadApplicationDetails = async (
  data: IGetLeadApplicationDetails
) => {
  const response = await _axios.get(
    `lead/${data.leadId}/application/${data.applicationCode}?isDraft=${data?.isDraft}`
  );
  return response?.data?.data ? response?.data?.data : {};
};
