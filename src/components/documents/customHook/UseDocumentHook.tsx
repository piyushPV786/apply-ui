import { useEffect, useState } from "react";
import DocumentServices from "../../../services/documentApi";
import { BURSARY_BUTTON_STATUS } from "../../common/constant";
import {
  mbaDocs,
  bursarryFeilds,
  dashboardRedirectStatus,
  docType,
  MBACode,
  nonMandatoryDocuments,
  actionType,
} from "../context/common";
import { useRouter } from "next/router";
import {
  documentPayload,
  signedUrlPayload,
  studentBursaryPayload,
  viewProofDetails,
} from "./helper";
import { CommonEnums } from "../../common/constant";
import { toast } from "react-toastify";

interface documentTypeApiResponseType {
  code: string;
  name: string;
}

export const UseDocumentHook = (applicationCode) => {
  const [masterData, setMasterData] = useState<any>({
    documentTypes: [],
    userDetails: {},
    documents: [],
    documentFormData: [],
  });

  const convertDataToFormData = (documentTypes, userInfo) => {
    const result = documentTypes?.map((element) => {
      if (element.code === docType?.BURSARYLETTER) {
        return {
          name: element?.name,
          label: `${element?.name} and Details`,
          required: BURSARY_BUTTON_STATUS.includes(userInfo?.status),
          code: element.code,
          show: BURSARY_BUTTON_STATUS.includes(userInfo?.status),
        };
      } else if (mbaDocs.includes(element.code)) {
        return {
          name: element?.name,
          label: element?.name,
          required: userInfo?.education?.programCode === MBACode,
          code: element.code,
          show: userInfo?.education?.programCode === MBACode,
        };
      } else if (nonMandatoryDocuments.includes(element.code)) {
        return {
          name: element?.name,
          label: element?.name,
          required: false,
          code: element.code,
          show: true,
        };
      } else {
        return {
          name: element?.name,
          label: element?.name,
          required: true,
          code: element.code,
          show: true,
        };
      }
    });
    return result;
  };

  useEffect(() => {
    const getMasterData = async (applicationCode: string) => {
      const result = await Promise.all([
        DocumentServices.getDocumentsByApplicationCode(applicationCode),
        DocumentServices?.getApplicationData(applicationCode),
        DocumentServices.DocumentType(),
      ]);
      const documentTypes = result[2].filter(
        (item) => item.code !== "PAYMENTPROOF",
      );
      const payload = {
        ...masterData,
        documents: result[0],
        userDetails: result[1],
        documentTypes: documentTypes,
        documentFormData: convertDataToFormData(documentTypes, result[1]),
      };
      setMasterData(payload);
    };

    if (applicationCode) {
      getMasterData(applicationCode);
    }
  }, [applicationCode]);

  return { masterData };
};

export const UseDocumentAction = () => {
  const [progress, setProgress] = useState({});
  const router = useRouter();

  const setDocumentProgress = (element, percent, documentCode) => {
    setProgress({ ...progress, [element?.code]: { percent, documentCode } });
  };

  const uploadFiles = async (payload, masterData, type) => {
    const response = await DocumentServices.uploadDocuments(
      payload,
      masterData?.userDetails?.applicationCode,
    );

    if (response) {
      dashboardRedirectStatus.includes(masterData?.userDetails?.status)
        ? router.push(`/dashboard`)
        : type === actionType?.draft
          ? router.push(`/dashboard`)
          : router.push(
              `/payments/${masterData?.userDetails?.applicationCode}`,
            );
    } else {
      toast.success(`Your document is not uploaded`);
    }
  };

  const saveAsDraft = (data, masterData) => {
    const payload = documentPayload(data, true, masterData, progress);
    if (payload) {
      uploadFiles(payload, masterData, actionType.draft);
    }
  };
  const submitDocument = async (data, masterData) => {
    if (masterData?.userDetails?.status == CommonEnums.BURSARY_LETTER_PEND) {
      const bursaryPayload = {
        name: data[bursarryFeilds.Name],
        mobile: data[bursarryFeilds.Phone],
        address: "",
        email: data[bursarryFeilds.Email],
        occupation: "",
        vip: false,
        bursaryFinanceDto: {
          sponsorAmount: 0,
          financialYear: 2023,
        },
        bursaryBankDto: {
          accountNumber: 0,
          ifscCode: "",
          branchCode: "",
        },
      };
      const res = await DocumentServices.updateBursary(bursaryPayload);
      if (res) {
        const payload = studentBursaryPayload(res, masterData);
        DocumentServices.updateStudentBursary(payload);
      }
    }
    const payload = documentPayload(data, false, masterData, progress);

    if (payload) {
      uploadFiles(payload, masterData, actionType.submit);
    }
  };

  return { saveAsDraft, submitDocument, progress, setDocumentProgress };
};

export const UseDownloadDeclarationLatter = () => {
  const downloadDeclarationLatter = async (masterData) => {
    const response = await DocumentServices.downloadDeclarationLetter(
      masterData?.userDetails?.applicationCode,
    );
    const blob = new Blob([response?.data], {
      type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    });
    const downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(blob);
    const filename = "declaration-letter.docx";
    downloadLink.download = filename;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    URL.revokeObjectURL(downloadLink.href);
  };

  return { downloadDeclarationLatter };
};

export const UsePreviewFile = () => {
  const getFileUrl = async (file, masterData) => {
    if (file?.size > 0) {
      const url = URL.createObjectURL(file);
      window.open(url);
    } else {
      const response = await DocumentServices?.getFileUrl(
        file?.name,
        masterData?.userDetails?.lead?.studentCode,
      );
      viewProofDetails(response);
    }
  };

  return { getFileUrl };
};
