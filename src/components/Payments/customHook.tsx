import { useEffect, useState } from "react";
import PaymentServices from "../../services/payment";
import DocumentServices from "../../services/documentApi";
import ApplicationFormService from "../../services/applicationForm";
import { CommonEnums } from "../../components/common/constant";
import { feeMode } from "../../components/common/constant";
import { uploadDocumentsToAws, getFeeDetails } from "./helper";

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
  const [selectedFeeMode, setSelectedFeeMode] = useState("");
  const [discountDetails, setDiscountDetails] = useState<any>({
    discountPercent: 0,
    discountCode: "",
  });
  const [paymentPayload, setPaymentPayload] = useState<any>();

  const uploadPaymentProof = async (payload) => {
    const apiPayload = {
      files: payload?.files,
      amount: payload?.amount,
      paymentModeCode: "OFFLINE",
      discountCode: discountDetails?.discountCode,
      discountAmount: payload.discountAmount,
      feeModeCode:
        masterData?.applicationData?.status === CommonEnums.FEES_PENDING_STATUS
          ? feeMode.APPLICATION
          : selectedFeeMode,
      isDraft: false,
      currencyCode: masterData?.currencyData?.currencyCode,
      studentCode: masterData?.applicationData?.studentCode,
    };
    const response = await DocumentServices?.uploadDocuments(
      apiPayload,
      masterData?.applicationData?.applicationCode
    );
    if (response) {
      response?.data?.forEach((element, index) => {
        uploadDocumentsToAws(element, payload?.files[index]);
      });
    }
    console.log("paymentProofRes=====>", response);
  };

  const getPayuDetails = async (payload) => {
    const apiPayload = {
      amount: Number(payload?.amount) || 0,
      feeModeCode:
        masterData?.applicationData?.status === CommonEnums.FEES_PENDING_STATUS
          ? feeMode.APPLICATION
          : selectedFeeMode,
      email: masterData?.applicationData?.lead?.email,
      firstname: masterData?.applicationData?.lead?.firstName,
      phone: masterData?.applicationData?.lead?.mobileNumber,
      productinfo: "test",
      studentTypeCode: masterData?.applicationData?.education?.studentTypeCode,
      discountAmount: payload?.discountAmount,
      discountCode: discountDetails?.discountCode,
      currencyCode: masterData?.currencyData?.currencyCode,
    };
    const response = await PaymentServices?.getPayuDetais(
      masterData?.applicationData?.applicationCode,
      apiPayload
    );
    setPaymentPayload(response);
  };

  const paymentDiscount = async (promoCode) => {
    const res = await PaymentServices.applicationDiscount(
      masterData?.applicationData?.education?.studentTypeCode,
      masterData?.applicationData?.applicationCode,
      promoCode
    );
    if (res?.maxAmount) {
      setDiscountDetails({
        discountPercent: res?.percent,
        discountCode: res?.discountCode,
      });
    }
  };

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

  if (masterData?.applicationData?.status === CommonEnums.FEES_PENDING_STATUS) {
    const feesStructure = studyModes?.fees?.find(
      (item: any) => item?.feeMode === feeMode.APPLICATION
    );
    fees = getFeeDetails(
      feesStructure,
      "Application Fees",
      masterData,
      discountDetails
    );
  } else {
    const feeJson = {};
    studyModes?.fees?.map((item) => {
      if (item?.feeMode !== feeMode.APPLICATION) {
        feeJson[item?.feeMode] = getFeeDetails(
          item,
          "Program Fees",
          masterData,
          discountDetails
        );
      }
    });

    if (selectedFeeMode in feeJson) {
      fees = feeJson[selectedFeeMode];
    }
  }

  return {
    studyModes,
    fees,
    setSelectedFeeMode,
    selectedFeeMode,
    paymentDiscount,
    getPayuDetails,
    paymentPayload,
    uploadPaymentProof,
  };
};
