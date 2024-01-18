import axios from "axios";
import { CommonEnums, FeemodeCode, feeMode } from "../common/constant";
export const getConvertedAmount = (currencyData: any, amount: string) => {
  if (currencyData && parseInt(currencyData?.forecastRate)) {
    return Number(
      parseInt(amount) * parseFloat(currencyData?.forecastRate)
    ).toFixed();
  } else if (parseInt(currencyData?.rate)) {
    return Number(parseInt(amount) * parseFloat(currencyData?.rate)).toFixed();
  } else {
    return Number(amount);
  }
};

export const getFeeDetails = (
  feeStructure,
  feeLabel,
  masterData,
  discountDetails
) => {
  const fee = Number(feeStructure?.fee);
  const rmatFee = masterData?.feeData?.rmatFee;
  const discountAmount = (fee * discountDetails.discountPercent) / 100;

  return {
    fee,
    amount: `${
      masterData?.currencyData?.currencySymbol
        ? masterData?.currencyData?.currencySymbol
        : ""
    } ${getConvertedAmount(masterData?.currencyData, String(fee))}`,
    label: feeLabel,
    helpText: feeLabel === "Application Fees" ? "(Non-refundable)" : "",
    rmatFee,
    rmatAmount: `${
      masterData?.currencyData?.currencySymbol
        ? masterData?.currencyData?.currencySymbol
        : ""
    } ${getConvertedAmount(masterData?.currencyData, rmatFee)}`,
    totalAmount: `${
      masterData?.currencyData?.currencySymbol
        ? masterData?.currencyData?.currencySymbol
        : ""
    } ${getConvertedAmount(
      masterData?.currencyData,
      fee - discountAmount + rmatFee
    )}`,
    totalFee: fee - discountAmount + rmatFee,
    discountAmount: `${
      masterData?.currencyData?.currencySymbol
        ? masterData?.currencyData?.currencySymbol
        : ""
    } ${getConvertedAmount(masterData?.currencyData, String(discountAmount))}`,
    discountFee: discountAmount,
  };
};

export const uploadDocumentsToAws = async (uploadFileUrl, file) => {
  try {
    const result = await Promise.all([axios.put(uploadFileUrl, file)]);

    if (result) {
      return result[0];
    }
  } catch (error: any) {
    console.log(error.message);
    return error;
  }
};

export const getUkheshePayload = (getPaymentResponse, fees, masterData) => {
  return {
    transactionId: getPaymentResponse?.data?.externalUniqueId,
    totalAmount: fees?.totalFee,
    totalPaidAmount: getPaymentResponse?.data?.amount,
    feeModeCode: fees?.feeMode,
    currencyCode: masterData?.currencyData?.currencyCode,
    paymentStatus: getPaymentResponse?.data?.status,
    discountCode: fees?.discountCode,
    discountAmount: fees.discountFee,
    studentCode: masterData?.applicationData?.studentCode,
    applicationCode: masterData?.applicationData?.applicationCode,
    paymentType: "ONLINE",
    ukheshe: {
      paymentId: getPaymentResponse?.data?.paymentId,
      gatewayTransactionId: getPaymentResponse?.data?.externalUniqueId,
      amount: getPaymentResponse?.data?.amount,
      status: getPaymentResponse?.data?.status,
      walletId: getPaymentResponse?.data?.walletId,
      currency: getPaymentResponse?.data?.currency,
      externalUniqueId: getPaymentResponse?.data?.externalUniqueId,
      paymentType: getPaymentResponse?.data?.paymentType,
    },
    programName: masterData?.programData?.name,
  };
};

export const getStatusPayload = (paymentMode, masterData, fees) => {
  return {
    source: "apply,enrolment",
    status:
      fees?.feeMode === "APPLICATION"
        ? "APP-FEE-ACCEPTED"
        : "PROG-FEE-ACCEPTED",
    aapCode: masterData.applicationData.applicationCode,
    paymentMode: `${paymentMode}`,
  };
};

export const bursaryFeeCalculation = (bursaryDetails, payload) => {
  if (
    bursaryDetails?.education &&
    bursaryDetails?.education[0]?.bursaryAmount &&
    payload?.feeData &&
    payload?.programData &&
    payload?.applicationData &&
    payload?.applicationData?.education
  ) {
    const feeDetails = payload?.feeData?.studyModes?.find(
      (item) =>
        item?.studyModeCode ===
        payload?.applicationData?.education?.studyModeCode
    );
    if (feeDetails?.fees) {
      const totalFeeAmount = getTotalFeeAmount(feeDetails?.fees);
      if (totalFeeAmount > 0) {
        const feeCalculationResult = feeCalculate(
          totalFeeAmount - bursaryDetails?.education[0]?.bursaryAmount,
          payload?.programData?.noOfYear
        );

        const feeChange = feeDetails?.fees?.map((item: any) => {
          return item?.feeMode !== FeemodeCode?.APPLICATION
            ? { ...item, fee: feeCalculationResult[item?.feeMode] }
            : item;
        });

        return {
          ...payload?.feeData,
          studyModes: payload?.feeData?.studyModes?.map((element) => {
            return { ...element, fees: feeChange };
          }),
        };
      }
    }
  }
};

const feeCalculate = (TOTAL, noOfYears) => {
  const numberOfMonths = noOfYears * 12;
  const numberOfSemesters = (noOfYears * 12) / 6;
  const numberOfYears = noOfYears;
  const MONTHLY = checkGreaterThanZero(Math.round(TOTAL / numberOfMonths));
  const SEMESTER = checkGreaterThanZero(Math.round(TOTAL / numberOfSemesters));
  const ANNUALLY = checkGreaterThanZero(Math.round(TOTAL / numberOfYears));
  return { MONTHLY, SEMESTER, ANNUALLY, TOTAL };
};

const checkGreaterThanZero = (NumberOfEMi: number) => {
  return NumberOfEMi > 0 ? NumberOfEMi : 0;
};

const getTotalFeeAmount = (feesList) => {
  let result = 0;
  const totalFee = feesList?.find(
    (item) => item?.feeMode === CommonEnums?.TOTAL
  );
  if (totalFee?.fee) {
    result = totalFee?.fee;
  }
  return result;
};

export const signedUrlPayload = (response, payload, studentCode) => {
  const signPayload: any = [];
  if (payload?.files) {
    payload?.files?.forEach((element, index) => {
      const ext = element?.fileName?.split(".").pop();
      const document = response?.find(
        (item) => item?.documenttypeCode === element?.documentTypeCode
      );
      if (document) {
        signPayload?.push({
          fileName: `${document?.documentCode}.${ext}`,
          filetype: `.${ext}`,
          studentCode: studentCode,
          file: element?.files,
          documentCode: document?.documentCode,
        });
      }
    });
  }
  return signPayload;
};

export const changeFileExactions = (files: any) => {
  const paymentProofPayload: any = [];
  files?.forEach((element) => {
    const ext = element?.fileName?.split(".").pop();
    paymentProofPayload.push({
      documentTypeCode: element?.documentTypeCode,
      fileName: element?.fileName,
      fileType: `.${ext}`,
      files: element?.file,
    });
  });
  return paymentProofPayload;
};
