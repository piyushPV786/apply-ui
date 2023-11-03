import { useEffect, useState } from "react";
import DocumentServices from "../../../services/documentApi";
import { mbaDocs } from "../context/common";
import { useRouter } from "next/router";
import { documentPayload, viewProofDetails } from "./helper";

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
      if (element.code == "BURSARYLETTER") {
        return {
          name: element?.name,
          label: element?.name,
          required: userInfo?.status === "BURSARY-PEND",
          code: element.code,
        };
      } else if (mbaDocs.includes(element.code)) {
        return {
          name: element?.name,
          label: element?.name,
          required: userInfo?.education?.programCode === "MBA", //To Do how to know this program code is MBA
          code: element.code,
        };
      } else {
        return {
          name: element?.name,
          label: element?.name,
          required: true,
          code: element.code,
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
        (item) => item.code !== "PAYMENTPROOF"
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

export const ActionDocumentSubmit = () => {
  const router = useRouter();
  const uploadFiles = async (payload, masterData) => {
    const response = await DocumentServices.uploadDocuments(
      payload,
      masterData?.userDetails?.applicationCode
    );

    const result = await response?.map(async (url, index) => {
      return await DocumentServices.uploadDocumentToAws(
        url,
        payload?.files[index].file
      );
    });
  };

  const saveAsDraft = (data, masterData) => {
    const payload = documentPayload(data, true, masterData);
    if (payload) {
      uploadFiles(payload, masterData);
      router.push(`/payments/${masterData?.userDetails?.applicationCode}`);
    }
  };
  const submitDocument = (data, masterData) => {
    const payload = documentPayload(data, false, masterData);
    if (payload) {
      uploadFiles(payload, masterData);
      router.push(`/payments/${masterData?.userDetails?.applicationCode}`);
    }
  };

  return { saveAsDraft, submitDocument };
};

export const UseDownloadDeclarationLatter = () => {
  const downloadDeclarationLatter = async (masterData) => {
    const response = await DocumentServices.downloadDeclarationLetter(
      masterData?.userDetails?.applicationCode
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
        masterData?.userDetails?.studentCode
      );
      viewProofDetails(response);
    }
  };

  return { getFileUrl };
};
