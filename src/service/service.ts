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
  leadCode: string;
}

interface IGetLeadApplicationDetails {
  leadCode: string;
  applicationCode: string;
  isDraft: boolean;
}

const _axios = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}`,
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
  const response = await _axios.get(`lead/${data.leadCode}/application`);
  return response?.data?.data ? response?.data?.data : [];
};

export const getMasterData = async (): Promise<[]> => {
  const response = await _axios.get(`master/loadMasterData`);
  return response?.data?.data ? response?.data?.data : {};
};

export const getLeadApplicationDetails = async (
  data: IGetLeadApplicationDetails
) => {
  const response = await _axios.get(
    `lead/${data.leadCode}/application/${data.applicationCode}?isDraft=${data?.isDraft}`
  );
  return response?.data?.data ? response?.data?.data : {};
};
