import { useState } from "react";

import LoginApplicationServices from "../../../services/loginApplication";

const LoginCustomHook = () => {
  const [mobileNumber, setMobileNumber] = useState<string>("");
  const [countryCode, setCountryCode] = useState<any>("ZA");
  const [otp, setOtp] = useState<string>("");
  const [isProceed, setProceed] = useState<boolean>(false);

  const sendOtpToMobile = async (payload) => {
    setProceed(!isProceed);
    const response = await LoginApplicationServices?.register(payload);
    console.log("isProceed =========>", isProceed);
    if (response?.data) {
      setProceed(!isProceed);
    }
  };

  const verifyOTP = async (payload) => {
    const response = await LoginApplicationServices?.verifyOTP(payload);
    console.log("otp verify response =========>", response);
    return response;
  };

  return {
    mobileNumber,
    setMobileNumber,
    countryCode,
    setCountryCode,
    otp,
    setOtp,
    sendOtpToMobile,
    isProceed,
    verifyOTP,
    setProceed,
  };
};

export default LoginCustomHook;
