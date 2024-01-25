import { useEffect, useState } from "react";
import DocumentServices from "../../../services/documentApi";
export const UseUploadDocumentHook = (masterData) => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [documentCode, setDocumentCode] = useState("");

  const updateProgress = (percent) => {
    setUploadProgress(percent);
  };

  const uploadDocument = async (file, element) => {
    const { studentCode } = masterData?.userDetails;
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
      const ext = fileName?.split(".").pop();
      let documentCode = documentDetails?.code;
      if (!documentDetails?.code) {
        documentCode = await DocumentServices?.DocumentCode();
      }
      setDocumentCode(documentCode);
      const name = `${documentCode}.${ext}`;
      const signedUrl = await DocumentServices?.getFileSignUrl(
        name,
        `.${ext}`,
        studentCode
      );
      await DocumentServices.uploadDocumentToAws(
        signedUrl,
        file[0],
        setUploadPercent
      );
    }
  };

  return { uploadDocument, uploadProgress, documentCode };
};
