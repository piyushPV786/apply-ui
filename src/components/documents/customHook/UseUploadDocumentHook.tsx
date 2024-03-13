import { useEffect, useState } from "react";
import DocumentServices from "../../../services/documentApi";
import { DocumentStatus, status } from "../../common/constant";
import { toast } from "react-toastify";
export const UseUploadDocumentHook = (masterData) => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [documentCode, setDocumentCode] = useState("");

  const updateProgress = (percent) => {
    setUploadProgress(percent);
  };

  const uploadDocument = async (file, element) => {
    const { studentCode, applicationCode } = masterData?.userDetails;
    const setUploadPercent = (progressEvent) => {
      const uploadPercent = Math.ceil(
        (progressEvent.loaded / progressEvent.total) * 100
      );
      updateProgress(uploadPercent);
    };

    const documentDetails = masterData?.documents?.find(
      (item) => item?.documentTypeCode === element?.code
    );

    if (file?.length && studentCode) {
      const fileName = file[0].name;
      const ext = fileName?.split(".").pop().toLowerCase();
      const documentCode = await DocumentServices?.DocumentCode();

      setDocumentCode(documentCode);
      const name = `${documentCode}.${ext}`;
      const signedUrl = await DocumentServices?.getFileSignUrl(
        name,
        `.${ext}`,
        studentCode
      );
      const response = await DocumentServices.uploadDocumentToAws(
        signedUrl,
        file[0],
        setUploadPercent
      );
      if (response?.status === status?.successCode) {
        const documentUpdatePayload = {
          name: name,
          fileExtension: `.${ext}`,
          status: DocumentStatus.Pending,
          documentTypeCode: element?.code,
          applicationCode: applicationCode,
          code: documentCode,
        };
        const updateDocumentResponse = await DocumentServices?.documentUpdate(
          documentUpdatePayload
        );
        if (updateDocumentResponse?.status === 200) {
          toast.success(`Your document is uploaded successfully.`);
        }
      }
    }
  };

  return { uploadDocument, uploadProgress, documentCode, setUploadProgress };
};
