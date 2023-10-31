import { useEffect, useState } from "react";
import PaymentServices from "../../services/payment";
import DocumentServices from "../../services/documentApi";
import ApplicationFormService from "../../services/applicationForm";
import {
  CommonEnums,
  UPLOAD_DOCUMENT_BUTTON_STATUS,
  studyMode,
} from "../../components/common/constant";
import { feeMode } from "../../components/common/constant";
import { getConvertedAmount } from "./helper";

// const CustomHookPayment2 = (applicationCode) => {
//   const [userDetails, setUserDetails] = useState<any>({});
//   const [paymentDetailsJson, setPaymentDetailsJson] = useState<any>();
//   const [paymentPayload, setPaymentPayload] = useState<any>();
//   const [conversionRateDetails, setConversionRateDetails] = useState<any>();
//   const [studyModes, setStudyModes] = useState<any>();
//   const [isProgamFee, setIsProgramFee] = useState<any>();
//   const [selectedCode, setSelectedCode] = useState<any>();
//   const [discountDetails, setDiscountDetails] = useState<any>({
//     discountAmount: 0,
//     discountCode: "",
//   });
//   const [discountPercent, setDiscountPercent] = useState<any>();

//   const getStudyModeData = async (programCode) => {
//     // const response = await FinanceServices.getStudentProgram(programCode);
//     // if (response) {
//     //   let studyModeData = {
//     //     programCode: response[0]?.programCode,
//     //     programName: response[0]?.programName,
//     //     rmatFee: response[0]?.rmatFee,
//     //     studyModes: response[0]?.studyModes[0]?.fees,
//     //   };

//       // setStudyModes(studyModeData);
//     }
//   };

//   const getUserDetails = async (applicationCode) => {
//     await PaymentServices?.getApplicationData(applicationCode).then((data) => {
//       setSelectedCode(data?.education?.studyModeCode);
//       setUserDetails(data);
//       data?.lead?.nationality && getCurrencyConversion(data?.lead?.nationality);
//       data?.education?.programCode &&
//         getStudyModeData(data?.education?.programCode);

//       if (UPLOAD_DOCUMENT_BUTTON_STATUS.includes(data?.status)) {
//         setIsProgramFee(false);
//       } else {
//         setIsProgramFee(true);
//       }
//     });
//   };

//   const getCurrencyConversion = async (nationality) => {
//     const response = await PaymentServices?.getCurrencyConversion(nationality);
//     setConversionRateDetails(response);
//   };

//   const getConvertedAmount = (conversionRate: number | null, amount) => {
//     return conversionRate ? Number(amount * conversionRate).toFixed(2) : amount;
//   };

//   const getPayuDetails = async (payload) => {
//     const apiPayload = {
//       amount: Number(payload?.amount) || 0,
//       feeModeCode: selectedCode ? selectedCode : feeMode.APPLICATION,
//       email: userDetails?.lead?.email,
//       firstname: userDetails?.lead?.firstName,
//       phone: userDetails?.lead?.mobileNumber,
//       productinfo: "test",
//       studentTypeCode: userDetails?.education?.studentTypeCode,
//       discountAmount: payload?.discountAmount,
//       discountCode: payload?.discountCode,
//       currencyCode: conversionRateDetails?.currencyCode,
//     };
//     const response = await PaymentServices?.getPayuDetais(
//       applicationCode,
//       apiPayload
//     );
//     setPaymentPayload(response);
//   };

//   const uploadPaymentProof = async (payload) => {
//     const apiPayload = {
//       files: payload?.files,
//       amount: payload?.amount,
//       paymentModeCode: "OFFLINE",
//       discountCode: payload?.discountCode,
//       discountAmount: payload.discountAmount,
//       feeModeCode: selectedCode ? selectedCode : feeMode.APPLICATION,
//       isDraft: false,
//       currencyCode: conversionRateDetails?.currencyCode,
//       studentCode: userDetails?.studentCode,
//     };
//     const response = await DocumentServices?.uploadDocuments(
//       apiPayload,
//       applicationCode
//     );
//     console.log("paymentProofRes=====>", response);
//   };

//   const updateDiscount = () => {
//     let discount = {
//       discountAmount:
//         (paymentDetailsJson[selectedCode]?.fee * discountPercent) / 100,
//       discountCode: discountDetails?.discountCode,
//     };

//     setDiscountDetails(discount);
//   };

//   const paymentDiscount = async (promoCode) => {
//     const res = await PaymentServices.applicationDiscount(
//       userDetails?.education?.studentTypeCode,
//       applicationCode,
//       promoCode
//     );
//     if (res?.maxAmount) {
//       let discount = {
//         discountAmount: isProgamFee
//           ? (paymentDetailsJson[selectedCode]?.fee * res?.percent) / 100
//           : (paymentDetailsJson[feeMode.APPLICATION]?.fee * res?.percent) / 100,
//         discountCode: res?.discountCode,
//       };
//       setDiscountPercent(res?.percent);
//       setDiscountDetails(discount);
//     }
//   };

//   const createPaymentDetailsJson = async () => {
//     const paymentDetaisjson = {};
//     studyModes?.studyModes.map((item) => {
//       paymentDetaisjson[item?.feeMode] = {
//         programCode: studyModes?.programCode,
//         programName: studyModes?.programName,
//         fee: Number(item?.fee),
//         rmatFee: Number(studyModes?.rmatFee),
//         currrencyCode: conversionRateDetails?.currencyCode,
//         currencySymbol: conversionRateDetails?.currencySymbol,
//       };
//     });

//     setPaymentDetailsJson(paymentDetaisjson);
//   };

//   useEffect(() => {
//     if (applicationCode) {
//       getUserDetails(applicationCode);
//     }
//   }, [applicationCode]);

//   useEffect(() => {
//     createPaymentDetailsJson();
//   }, [studyModes]);

//   return {
//     paymentDiscount,
//     userDetails,
//     getPayuDetails,
//     paymentPayload,
//     uploadPaymentProof,
//     paymentDetailsJson,
//     getConvertedAmount,
//     isProgamFee,
//     conversionRateDetails,
//     selectedCode,
//     setSelectedCode,
//     studyModes,
//     discountDetails,
//     updateDiscount,
//   };
// };

export const usePaymentHook = (applicationCode: string) => {
  const [masterData, setMasterData] = useState({
    applicationData: null,
    currencyData: null,
    feeData: null,
    studyModeData: null,
  });

  useEffect(() => {
    const getMasterData = async (applicationCode: string) => {
      const payload = { ...masterData };
      const result = await Promise.all([
        PaymentServices?.getApplicationData(applicationCode),
        ApplicationFormService.getStudyModes(),
      ]);

      const response = result[0];
      payload.applicationData = response;
      payload.studyModeData = result[1];
      if (response?.lead?.nationality && response?.education?.programCode) {
        const data = await Promise.all([
          PaymentServices.getCurrencyConversion(response?.lead?.nationality),
          ApplicationFormService.getStudentProgram(
            response?.education?.programCode
          ),
        ]);
        payload.currencyData = data[0];
        if (data[1]?.length) {
          payload.feeData = data[1].find(
            (item) => item?.programCode === response?.education?.programCode
          );
        }
      }
      setMasterData(payload);
    };

    if (applicationCode) {
      getMasterData(applicationCode);
    }
  }, [applicationCode]);

  return {
    masterData,
  };
};

export const usePaymentDetailsHook = (masterData: any) => {
  let studyModes: any = {};
  if (masterData?.applicationData?.education?.studyModeCode) {
    studyModes = masterData?.feeData?.studyModes.find(
      (item: any) =>
        item?.studyModeCode ===
        masterData?.applicationData?.education?.studyModeCode
    );
    const studyModeDetails = masterData?.studyModeData?.find(
      (item: any) =>
        item?.code === masterData?.applicationData?.education?.studyModeCode
    );
    studyModes.helpText = studyModeDetails?.description;
  }
  let fees: any = {};

  if (masterData?.applicationData?.status === CommonEnums.FEES_PENDING_STATUS) {
    const feesStructure = studyModes?.fees?.find(
      (item: any) => item?.feeMode === feeMode.APPLICATION
    );
    fees = {
      ...feesStructure,
      amount: `${masterData?.currencyData?.currencySymbol} ${getConvertedAmount(
        masterData?.currencyData?.forecastRate,
        feesStructure?.fee
      )}`,
      label: "Application Fees",
      helpText: "( Non-refundable )",
    };
  }

  return { studyModes, fees };
};
