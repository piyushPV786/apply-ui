import { useEffect, useState } from "react";
import PaymentServices from "../../services/payment";
import DocumentServices from "../../services/documentApi";
import FinanceServices from "../../services/applicationForm";
import { Toaster } from "../common/common";
import { IPaymentPayload } from "./commonDataType";

const CustomHookPayment = (applicationCode) => {
  const [userDetails, setUserDetails] = useState({});
  const [paymentDetails, setPaymentDetails] = useState();
  const [paymentPayload, setPaymentPayload] = useState();
  const paymentDiscount = async (payload: IPaymentPayload) => {
    await PaymentServices.applicationDiscount(payload);
  };

  const getUserDetails = async (applicationCode) => {
    const response = await PaymentServices?.getApplicationData(applicationCode);
    setUserDetails(response);
  };
  const getPayuDetails = async (payload) => {
    const apiPayload = {
      amount: payload?.amount,
      feeModeCode: "application",
      email: userDetails?.lead?.email,
      firstname: userDetails?.lead?.email,
      phone: userDetails?.lead?.mobileNumber,
      productinfo: "Semester fee",
      studentTypeCode: userDetails?.education?.studentTypeCode,
      discountAmount: payload?.discountAmount,
      discountCode: payload?.discountCode,
      currencyCode: userDetails?.lead?.nationality,
    };
    const response = await PaymentServices?.getPayuDetais(
      applicationCode,
      apiPayload
    );
    setPaymentPayload(response);
  };
  console.log(userDetails);

  const uploadPaymentProof = async (payload) => {
    const apiPayload = {
      files: payload?.files,
      amount: payload?.amount,
      paymentModeCode: "OFFLINE",
      discountCode: payload?.discountCode,
      discountAmount: payload.discountAmount,
      feeModeCode: "Day",
      isDraft: false,
      currencyCode: userDetails?.lead?.nationality,
      studentCode: userDetails?.studentCode,
    };
    const response = await DocumentServices?.uploadDocuments(
      apiPayload,
      applicationCode
    );
  };

  const getPaymentDetail = async () => {
    const res = await FinanceServices.getStudentProgram(
      userDetails?.education?.programCode
    );

    const paymentDetails = {
      programCode: res[0]?.programCode,
      programName: res[0]?.programName,
      rmatFee: res[0]?.rmatFee,
      feeDetails: res[0]?.studyModes[0]?.fees?.filter((item) => {
        return item.feeMode == "APPLICATION";
      }),
    };
    setPaymentDetails(paymentDetails);
  };

  useEffect(() => {
    if (applicationCode) {
      getUserDetails(applicationCode);
    }
  }, [applicationCode]);

  useEffect(() => {
    if (userDetails) {
      getPaymentDetail();
    }
  }, [userDetails]);

  return {
    paymentDiscount,
    userDetails,
    getPayuDetails,
    paymentPayload,
    uploadPaymentProof,
    paymentDetails,
  };
};
export default CustomHookPayment;
