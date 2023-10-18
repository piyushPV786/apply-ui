import { useState } from "react";

import LoginApplicationServices from "../../../services/loginApplication";

const LoginCustomHook = () => {
  const sendOtpToMobile = async (payload) => {
    const response = await LoginApplicationServices?.register(payload);
    return response;
  };

  const verifyOTP = async (payload) => {
    const response = await LoginApplicationServices?.verifyOTP(payload);
    return response;
  };

  return {
    sendOtpToMobile,
    verifyOTP,
  };
};

export default LoginCustomHook;
