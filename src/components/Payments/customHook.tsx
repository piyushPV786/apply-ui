import { useEffect, useState } from "react";
import PaymentServices from "../../services/payment";
import DocumentServices from "../../services/documentApi";
import FinanceServices from "../../services/applicationForm";

const CustomHookPayment = (applicationCode) => {
  const [userDetails, setUserDetails] = useState<any>({});
  const [paymentDetails, setPaymentDetails] = useState<any>();
  const [paymentPayload, setPaymentPayload] = useState<any>();
  const [conversionRateDetails, setConversionRateDetails] = useState<any>();
  const getUserDetails = async (applicationCode) => {
    const response = await PaymentServices?.getApplicationData(applicationCode);
    if (response) {
      setUserDetails(response);
      response?.education?.programCode &&
        getPaymentDetail(response?.education?.programCode, 0, "");
    }
  };

  const getCurrencyConversion = async (nationality) => {
    const response = await PaymentServices?.getCurrencyConversion(nationality);
    setConversionRateDetails(response);
  };

  const getConvertedAmount = (conversionRate: number | null, amount) => {
    return conversionRate ? Number(amount * conversionRate).toFixed(2) : amount;
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
    console.log("paymentProofRes=====>", response);
  };

  const paymentDiscount = async (promoCode) => {
    const res = await PaymentServices.applicationDiscount(
      userDetails?.education?.studentTypeCode,
      applicationCode,
      promoCode
    );
    if (res.id) {
      console.log("discountApplied");

      getPaymentDetail(
        userDetails?.education?.programCode,
        res?.maxAmount,
        res?.discountCode
      );
    }
  };

  const getPaymentDetail = async (
    programCode,
    discountAmount,
    discountCode
  ) => {
    const res = await FinanceServices.getStudentProgram(programCode);

    const paymentDetails = {
      programCode: res[0]?.programCode,
      programName: res[0]?.programName,

      feeDetails: {
        fee: res[0]?.studyModes[0]?.fees?.filter((item) => {
          return item.feeMode == "APPLICATION";
        })[0].fee,
        rmatFee: res[0]?.rmatFee,
        discountAmount: discountAmount,
        discountCode: discountCode,
        totaAmount:
          Number(
            res[0]?.studyModes[0]?.fees?.filter((item) => {
              return item.feeMode == "APPLICATION";
            })[0].fee
          ) +
          res[0]?.rmatFee -
          discountAmount,
      },
    };

    setPaymentDetails(paymentDetails);
  };

  useEffect(() => {
    if (applicationCode) {
      getUserDetails(applicationCode);
    }
  }, [applicationCode]);

  useEffect(() => {
    console.log("user", userDetails);
    if (userDetails) {
      getCurrencyConversion(userDetails?.lead?.nationality);
    }
  }, [userDetails]);

  return {
    paymentDiscount,
    userDetails,
    getPayuDetails,
    paymentPayload,
    uploadPaymentProof,
    paymentDetails,
    conversionRateDetails,
    getConvertedAmount,
  };
};
export default CustomHookPayment;
