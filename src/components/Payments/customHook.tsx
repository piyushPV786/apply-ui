import { useEffect, useState } from "react";
import PaymentServices from "../../services/payment";
import { Toaster } from "../common/common";
import { IPaymentPayload } from "./commonDataType";

const CustomHookPayment = (applicationCode) => {
  const [userDetails, setUserDetails] = useState({});
  const [paymentPayload, setPaymentPayload] = useState();
  const paymentDiscount = async (payload: IPaymentPayload) => {
    await PaymentServices.applicationDiscount(payload);
  };
  console.log(paymentPayload);
  const getUserDetails = async (applicationCode) => {
    const response = await PaymentServices?.getApplicationData(applicationCode);
    setUserDetails(response);
  };
  const getPayuDetails = async (payload) => {
    const apiPayload = {
      amount: payload.amount,
      feeModeCode: "application",
      email: userDetails?.lead?.email,
      firstname: userDetails?.lead?.email,
      phone: userDetails?.lead?.mobileNumber,
      productinfo: "Semester fee",
      studentTypeCode: userDetails?.education?.studentTypeCode,
      discountAmount: payload.discountAmount,
      discountCode: "",
      currencyCode: userDetails?.lead?.nationality,
    };
    const response = await PaymentServices?.getPayuDetais(
      applicationCode,
      apiPayload
    );
    setPaymentPayload(response);
  };

  useEffect(() => {
    if (applicationCode) {
      getUserDetails(applicationCode);
    }
  }, [applicationCode]);

  return { paymentDiscount, userDetails, getPayuDetails, paymentPayload };
};
export default CustomHookPayment;
