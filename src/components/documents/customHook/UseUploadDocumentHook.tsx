import { useState } from "react";
import DocumentServices from "../../../services/documentApi";
const UseUploadDocumentHook = (masterData) => {
  const [uploadProgress, setUploadProgress] = useState({});
  const config = {
    onUploadProgress: (progressEvent) => {
      console.log("progressEvent ======>", progressEvent);
      const uploadPercent = Math.ceil(
        (progressEvent.loaded / progressEvent.total) * 100
      );
      updateProgress(uploadPercent, "");
    },
  };
  const updateProgress = (percent, code) => {
    const newProgress = { ...uploadProgress };
    newProgress[code] = percent;
    setUploadProgress(newProgress);
  };
  const uploadDocument = async (file, element) => {
    const { studentCode } = masterData?.userDetails;

    if (file?.length && studentCode) {
      const fileName = file[0].name;
      const ext = fileName?.split(".").pop();
      const documentCode = await DocumentServices?.DocumentCode();
      const name = `${documentCode}.${ext}`;
      const signedUrl = await DocumentServices?.getFileSignUrl(
        name,
        `.${ext}`,
        studentCode
      );
      const responseAWS = await DocumentServices.uploadDocumentToAws(
        signedUrl,
        file[0],
        config,
        element?.code
      );
    }
  };

  return { uploadDocument, uploadProgress };
};

export default UseUploadDocumentHook;
