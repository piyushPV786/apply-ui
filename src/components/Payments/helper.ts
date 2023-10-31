import axios from "axios";
export const getConvertedAmount = (
  conversionRate: string | null,
  amount: string
) => {
  return conversionRate
    ? Number(parseInt(amount) * parseInt(conversionRate)).toFixed(2)
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
    amount: `${masterData?.currencyData?.currencySymbol} ${getConvertedAmount(
      masterData?.currencyData?.forecastRate,
      String(fee)
    )}`,
    label: feeLabel,
    helpText: feeLabel === "Application Fees" ? "(Non-refundable)" : "",
    rmatFee,
    rmatAmount: `${
      masterData?.currencyData?.currencySymbol
    } ${getConvertedAmount(masterData?.currencyData?.forecastRate, rmatFee)}`,
    totalAmount: `${
      masterData?.currencyData?.currencySymbol
    } ${getConvertedAmount(
      masterData?.currencyData?.forecastRate,
      fee - discountAmount + rmatFee
    )}`,
    totalFee: fee - discountAmount + rmatFee,
    discountAmount: `${
      masterData?.currencyData?.currencySymbol
    } ${getConvertedAmount(
      masterData?.currencyData?.forecastRate,
      String(discountAmount)
    )}`,
    discountFee: discountAmount,
  };
};

export const uploadDocumentsToAws = async (uploadFileUrl, file) => {
  try {
    const response = await axios.put(uploadFileUrl, file);

    if (response.status === 200) {
      return response.data;
    } else {
      return response.data;
    }
  } catch (error: any) {
    console.log(error.message);
    return error;
  }
};
