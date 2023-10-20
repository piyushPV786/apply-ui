import { useEffect, useState } from "react";
import PaymentServices from "../../services/payment";
import { Toaster } from "../common/common";
import { IPaymentPayload } from "./commonDataType";

const CustomHookPayment = (applicationCode) => {
  const [userDetails, setUserDetails] = useState({});
  const paymentDiscount = async (payload: IPaymentPayload) => {
    await PaymentServices.applicationDiscount(payload);
  };

  const getUserDetails = async (applicationCode) => {
    const response = PaymentServices?.getApplicationData(applicationCode);
    setUserDetails(response);
  };

  useEffect(() => {
    if (applicationCode) {
      getUserDetails(applicationCode);
    }
  }, [applicationCode]);

  return { paymentDiscount, userDetails };
};
export default CustomHookPayment;
