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
        ]);
        payload.currencyData = data[0];
        payload.programData = data[2];
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
  const [feeModeCode, setFeeModeCode] = useState(feeMode.APPLICATION);
  let studyModes: any = {};
  if (masterData?.applicationData?.education?.studyModeCode) {
    const studyModeCode = masterData?.applicationData?.education?.studyModeCode;
    studyModes = masterData?.feeData?.studyModes.find(
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
      label: "Program Fees",
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

    if (res?.maxAmount) {
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
    } else {
      toast.error(ErrorMessage.discountErrorMessage);
    }
  };
  const discountAmount = (fees?.fee * discount.percent) / 100;
  fees.discountFee =
    discountAmount > discount?.max ? discount?.max : discountAmount;
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
  if (masterData?.programData?.isRmat) {
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
    fees,
    showDiscount,
    toggleDiscount,
    applyDiscount,
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
      files: payload?.files,
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

    if (response) {
      const res = [];
      response?.forEach((element, index) => {
        res.push(
          uploadDocumentsToAws(element, payload?.files[index]?.files) as never
        );
      });

      const uploadDone = await Promise?.all(res);
      uploadDone && router.push("/payment/success");
    }
  };
  return {
    uploadPaymentProof,
  };
};

export const useUkhesheHook = (masterData: any, fees: any) => {
  const router = useRouter();
  const [paymentToken, setPaymjentToken] = useState<any>();
  const [loadingPayment, setLoadingPayment] = useState(false);

  const getPaymentToken = async () => {
    const tokenResponse = await PaymentServices?.getUkhesheToken();
    setPaymjentToken(tokenResponse);
  };

  const getPaymentRedirectURL = async () => {
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
      Authorization: paymentToken?.headerValue,
    };

    const paymentResponse = await PaymentServices?.getPaymentDetails(
      paymentToken?.tenantId,
      payload,
      headers
    );
    if (paymentResponse) {
      window.open(paymentResponse?.completionUrl, "_ blank");
      const interval = setInterval(async () => {
        const getPaymentResponse = await PaymentServices.getPaymentInfo(
          paymentToken?.tenantId,
          paymentResponse?.paymentId,
          headers
        );

        if (getPaymentResponse?.data?.status == "SUCCESSFUL") {
          const payload = getUkheshePayload(
            getPaymentResponse,
            fees,
            masterData
          );

          const statusPayload = getStatusPayload("online", masterData, fees);

          const sendPaymentInfo = await PaymentServices?.updateUkheshePayment(
            payload
          );
          if (sendPaymentInfo?.statusCode == 201) {
            setLoadingPayment(false);
            PaymentServices.setStatus(statusPayload);
            router?.push("/payment/success");
          }
          clearInterval(interval);
        } else if (getPaymentResponse?.data?.status == "ERROR_PERM") {
          clearInterval(interval);
          setLoadingPayment(false);
          router?.push("/payment/failure");
        }
      }, 10000);
    }
  };

  return { getPaymentToken, getPaymentRedirectURL, loadingPayment };
};
