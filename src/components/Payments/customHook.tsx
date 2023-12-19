import { useEffect, useState } from "react";
import PaymentServices from "../../services/payment";
import DocumentServices from "../../services/documentApi";
import ApplicationFormService from "../../services/applicationForm";
import { CommonEnums } from "../../components/common/constant";
import { feeMode } from "../../components/common/constant";
import {
  uploadDocumentsToAws,
  getConvertedAmount,
  getUkheshePayload,
  getStatusPayload,
  bursaryFeeCalculation,
  signedUrlPayload,
  changeFileExactions,
} from "./helper";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { ErrorMessage, SuccessMessage } from "../../constants";
export const usePaymentHook = (applicationCode: string) => {
  const [masterData, setMasterData] = useState({
    applicationData: null,
    currencyData: null,
    feeData: null,
    studyModeData: null,
    programData: null,
    bursaryData: null,
    rmatDetails: null,
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
          PaymentServices.getCurrencyConversion(response?.address[0]?.country),
          ApplicationFormService.getStudentProgram(
            response?.education?.programCode
          ),
          PaymentServices.getProgramDetails(response?.education?.programCode),
          PaymentServices.getProgramRmatDetails(
            response?.education?.programCode
          ),
        ]);
        payload.feeData = data[1].find(
          (item) => item?.programCode === response?.education?.programCode
        );
        payload.currencyData = data[0];
        payload.programData = data[2];
        payload.rmatDetails = data[3];

        if (response?.education?.studentTypeCode === CommonEnums?.BURSARY) {
          const response = await PaymentServices.getApplicationDataForBursary(
            applicationCode
          );
          const bursaryAmountFee = bursaryFeeCalculation(response, payload);
          if (bursaryAmountFee) {
            payload.feeData = bursaryAmountFee;
          }
        }
        setMasterData(payload);
      }
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
  const [feeModeCode, setFeeModeCode] = useState(feeMode.APPLICATION);
  let studyModes: any = { helpText: "" };
  if (masterData?.applicationData?.education?.studyModeCode) {
    const studyModeCode = masterData?.applicationData?.education?.studyModeCode;
    studyModes = masterData?.feeData?.studyModes?.find(
      (item: any) => item?.studyModeCode === studyModeCode
    );

    const studyModeDetails = masterData?.studyModeData?.find(
      (item: any) => item?.code === studyModeCode
    );
    studyModes.helpText = studyModeDetails?.description;
  }

  let fees: any = {};
  const feesStructure = studyModes?.fees?.find(
    (item: any) => item?.feeMode === feeModeCode
  );
  if (masterData?.applicationData?.status === CommonEnums.FEES_PENDING_STATUS) {
    fees = {
      ...feesStructure,
      label: "Application Fee",
      helpText: "(Non-refundable)",
      amount: `${
        masterData?.currencyData?.currencySymbol
          ? masterData?.currencyData?.currencySymbol
          : ""
      } ${getConvertedAmount(
        masterData?.currencyData?.forecastRate,
        String(feesStructure?.fee)
      )}`,
    };
  } else {
    fees = {
      fee: "0.0",
      feeMode: "",
      label: "Qualification Fees",
      helpText: "",
      amount: `${
        masterData?.currencyData?.currencySymbol
          ? masterData?.currencyData?.currencySymbol
          : ""
      } ${getConvertedAmount(
        masterData?.currencyData?.forecastRate,
        String(0)
      )}`,
      ...(feeModeCode !== feeMode.APPLICATION && { ...feesStructure }),
      ...(feeModeCode !== feeMode.APPLICATION && {
        amount: `${
          masterData?.currencyData?.currencySymbol
            ? masterData?.currencyData?.currencySymbol
            : ""
        } ${getConvertedAmount(
          masterData?.currencyData?.forecastRate,
          String(feesStructure?.fee)
        )}`,
      }),
    };
  }

  const updateFeeMode = (feeModeCode: any) => {
    if (feeModeCode) {
      setFeeModeCode(feeModeCode);
    }
  };

  return {
    studyModes,
    fees,
    updateFeeMode,
  };
};

export const useDiscountHook = (masterData: any, fees: any) => {
  //Hide and Show promo code
  const [showDiscount, setShowDiscount] = useState(false);
  const toggleDiscount = () => {
    setShowDiscount(!showDiscount);
  };

  //Apply discount
  const [discount, setDiscount] = useState({
    percent: 0,
    code: "",
    max: 0,
  });

  const applyDiscount = async (data: any) => {
    const res = await PaymentServices.applicationDiscount(
      masterData?.applicationData?.education?.studentTypeCode,
      masterData?.applicationData?.applicationCode,
      data?.discountCode
    );

    if (res?.managementCode) {
      if (
        res?.maxAmount &&
        res.applicationCode === masterData?.applicationData?.applicationCode
      ) {
        setDiscount({
          percent: res?.percent,
          code: res?.managementCode,
          max: res?.maxAmount,
        });
        toast.success(
          `${SuccessMessage.discountSuccessMessage} ${
            res?.percent
          } % or Max Amount ${masterData.currencyData?.currencySymbol} ${
            res?.maxAmount * masterData.currencyData?.forecastRate
          } `
        );
      } else {
        toast.error(ErrorMessage.discountErrorMessage);
      }
    } else {
      if (res) {
        if (parseInt(res?.maxAmount) > parseInt(fees?.fee)) {
          toast.error(ErrorMessage.discountErrorMessage);
        } else {
          setDiscount({
            percent: res?.percent,
            code: res?.discountCode,
            max: res?.maxAmount,
          });
          toast.success(
            `${SuccessMessage.discountSuccessMessage} ${
              res?.percent
            } % or Max Amount ${masterData.currencyData?.currencySymbol} ${
              res?.maxAmount * masterData.currencyData?.forecastRate
            } `
          );
        }
      } else {
        toast.error(ErrorMessage.discountErrorMessage);
      }
    }
  };

  const resetDiscount = async () => {
    setDiscount({
      percent: 0,
      code: "",
      max: 0,
    });
  };

  const discountAmount =
    discount?.percent > 0
      ? (fees?.fee * discount.percent) / 100
      : discount?.max;

  fees.discountFee = discountAmount;
  fees.discountAmount = `${
    masterData?.currencyData?.currencySymbol
      ? masterData?.currencyData?.currencySymbol
      : ""
  } ${getConvertedAmount(
    masterData?.currencyData?.forecastRate,
    String(fees.discountFee)
  )}`;
  fees.discountCode = discount?.code;

  //Apply RMAT Fee

  let rmatFees = "0";

  if (masterData?.programData?.isRmat && !masterData?.rmatDetails?.isOptional) {
    rmatFees = masterData?.feeData?.rmatFee;
  }
  fees.rmatFees = rmatFees;
  if (masterData?.applicationData?.status === CommonEnums.FEES_PENDING_STATUS) {
    fees.rmatAmount = `${
      masterData?.currencyData?.currencySymbol
        ? masterData?.currencyData?.currencySymbol
        : ""
    } ${getConvertedAmount(masterData?.currencyData?.forecastRate, rmatFees)}`;
  }

  //Total Amount
  const totalAmount =
    parseInt(fees?.fee) - parseInt(fees.discountFee) + parseInt(fees.rmatFees);
  fees.totalFee = totalAmount;
  fees.totalAmount = `${
    masterData?.currencyData?.currencySymbol
      ? masterData?.currencyData?.currencySymbol
      : ""
  } ${getConvertedAmount(
    masterData?.currencyData?.forecastRate,
    String(totalAmount)
  )}`;
  return {
    resetDiscount,
    fees,
    showDiscount,
    toggleDiscount,
    applyDiscount,
    discount,
  };
};

export const usePayuHook = (masterData: any, fees: any) => {
  const [payuDetails, setPayuDetails] = useState({});
  const getPayuDetails = async (payload) => {
    let apiPayload: any = {
      amount: Number(fees?.totalFee) || 0,
      feeModeCode: fees?.feeMode,
      email: masterData?.applicationData?.lead?.email,
      firstname: masterData?.applicationData?.lead?.firstName,
      phone: masterData?.applicationData?.lead?.mobileNumber,
      productinfo: "test",
      studentTypeCode: masterData?.applicationData?.education?.studentTypeCode,
      currencyCode: masterData?.currencyData?.currencyCode,
    };
    if (fees?.discountFee && fees?.discountCode) {
      apiPayload = {
        ...apiPayload,
        discountAmount: fees?.discountFee,
        discountCode: fees?.discountCode,
      };
    }
    const response = await PaymentServices?.getPayuDetais(
      masterData?.applicationData?.applicationCode,
      apiPayload
    );
    setPayuDetails(response);
  };

  return {
    payuDetails,
    getPayuDetails,
  };
};

export const useOfflinePaymentHook = (masterData: any, fees: any) => {
  const router = useRouter();
  const uploadPaymentProof = async (payload) => {
    const apiPayload = {
      files: changeFileExactions(payload?.files),
      amount: fees?.totalFee,
      paymentModeCode: "OFFLINE",
      discountCode: fees?.discountCode,
      discountAmount: payload.discountFee,
      feeModeCode:
        masterData?.applicationData?.status === CommonEnums.FEES_PENDING_STATUS
          ? feeMode.APPLICATION
          : fees?.feeMode,
      isDraft: false,
      currencyCode: masterData?.currencyData?.currencyCode,
      studentCode: masterData?.applicationData?.studentCode,
    };
    const response = await DocumentServices?.uploadDocuments(
      apiPayload,
      masterData?.applicationData?.applicationCode
    );

    const changePayload = signedUrlPayload(
      response,
      payload,
      masterData?.applicationData?.studentCode
    );

    if (changePayload) {
      const result = await Promise.all(
        changePayload?.map(async (item) => {
          const response = await DocumentServices?.getFileSignUrl(
            item?.fileName,
            item?.filetype,
            item?.studentCode
          );
          return await DocumentServices.uploadDocumentToAws(
            response,
            item.file
          );
        })
      );
      router.push("/payment/success");
    }
  };
  return {
    uploadPaymentProof,
  };
};

export const useUkhesheHook = (masterData: any, fees: any) => {
  const router = useRouter();
  const [loadingPayment, setLoadingPayment] = useState(false);
  const [intervalId, setIntervalId] = useState(0);

  const getPaymentRedirectURL = async () => {
    const tokenResponse = await PaymentServices?.getUkhesheToken();
    setLoadingPayment(true);
    const payload = {
      externalUniqueId: uuidv4(),
      amount: `${fees?.totalFee || 0}`,
      currency: "ZAR",
      type: "GLOBAL_PAYMENT_LINK",
      paymentMechanism: "CARD",
      paymentData: "198462",
    };
    const headers = {
      "Content-Type": "application/json",
      Authorization: tokenResponse?.headerValue,
    };

    const paymentResponse = await PaymentServices?.getPaymentDetails(
      tokenResponse?.tenantId,
      payload,
      headers
    );
    if (paymentResponse) {
      window.open(paymentResponse?.completionUrl, "_ blank");
      const intervalId: any = setInterval(async () => {
        const getPaymentResponse = await PaymentServices.getPaymentInfo(
          tokenResponse?.tenantId,
          paymentResponse?.paymentId,
          headers
        );

        if (getPaymentResponse?.data?.status == "SUCCESSFUL") {
          clearInterval(intervalId);
          const payload = getUkheshePayload(
            getPaymentResponse,
            fees,
            masterData
          );

          const sendPaymentInfo = await PaymentServices?.updateUkheshePayment(
            payload
          );
          if (sendPaymentInfo?.statusCode == 201) {
            setLoadingPayment(false);
            router?.push("/payment/success");
          }
          clearInterval(intervalId);
        } else if (getPaymentResponse?.data?.status == "ERROR_PERM") {
          clearInterval(intervalId);
          setLoadingPayment(false);
          router?.push(
            `/payment/failure?appCode=${masterData?.applicationData?.applicationCode}`
          );
        }
      }, 10000);
      setIntervalId(intervalId);
    }
  };
  const closePaymentDialog = () => {
    clearInterval(intervalId);
    router?.push("/payment/failure");
  };

  return { getPaymentRedirectURL, loadingPayment, closePaymentDialog };
};

export const useCustomizeHook = (open, closePaymentDialog) => {
  const [counter, setCounter] = useState(300);
  const [timer, setTimer] = useState(0);
  useEffect(() => {
    if (open) {
      const timer: any = setInterval(() => {
        setCounter((prev) => prev - 1);
      }, 1000);
      setTimer(timer);
      return () => {
        clearInterval(timer);
        setCounter(300);
      };
    }
  }, [open]);

  useEffect(() => {
    if (counter === 0) {
      closePaymentDialog();
      clearInterval(timer);
    }
  }, [counter]);

  return { counter };
};
