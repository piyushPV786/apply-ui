import axios from "axios";

export const getConvertedAmount = (
  conversionRate: string | null,
  amount: string
) => {
  return conversionRate
    ? Number(parseInt(amount) * parseFloat(conversionRate)).toFixed()
    : amount;
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
    } ${getConvertedAmount(
      masterData?.currencyData?.forecastRate,
      String(fee)
    )}`,
    label: feeLabel,
    helpText: feeLabel === "Application Fees" ? "(Non-refundable)" : "",
    rmatFee,
    rmatAmount: `${
      masterData?.currencyData?.currencySymbol
        ? masterData?.currencyData?.currencySymbol
        : ""
    } ${getConvertedAmount(masterData?.currencyData?.forecastRate, rmatFee)}`,
    totalAmount: `${
      masterData?.currencyData?.currencySymbol
        ? masterData?.currencyData?.currencySymbol
        : ""
    } ${getConvertedAmount(
      masterData?.currencyData?.forecastRate,
      fee - discountAmount + rmatFee
    )}`,
    totalFee: fee - discountAmount + rmatFee,
    discountAmount: `${
      masterData?.currencyData?.currencySymbol
        ? masterData?.currencyData?.currencySymbol
        : ""
    } ${getConvertedAmount(
      masterData?.currencyData?.forecastRate,
      String(discountAmount)
    )}`,
    discountFee: discountAmount,
  };
};

export const uploadDocumentsToAws = async (uploadFileUrl, file) => {
  try {
    const result = await Promise.all([axios.put(uploadFileUrl, file)]);
    console.log("result", result[0]);
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
