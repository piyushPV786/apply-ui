import { useState } from "react";

import LoginApplicationServices from "../../../services/loginApplication";

const LoginCustomHook = () => {
  const [mobileNumber, setMobileNumber] = useState<string>("");
  const [countryCode, setCountryCode] = useState<any>("ZA");
  const [otp, setOtp] = useState<string>("");
  const [isProceed, setProceed] = useState<boolean>(false);

  const sendOtpToMobile = async (payload) => {
    const response = await LoginApplicationServices?.register(payload);
    console.log("response =========>", response);
    if (response?.data) {
      setProceed(true);
    }
  };

  const verifyOTP = async () => {
    const payload = {
      mobileNumber: mobileNumberDetail?.mobileNumber,
      otp: +otp,
      mobileCountryCode: mobileNumberDetail?.countryCodeNumber,
    };
    const response = await LoginApplicationServices?.verifyOTP();
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
  };
};

export default LoginCustomHook;
