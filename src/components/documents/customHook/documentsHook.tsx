import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import DocumentServices from "../../../services/documentApi";

interface documentTypeApiResponseType {
  code: string;
  name: string;
}

const LoadDocumentHook = () => {
  const [documentTypeData, setDocumentTypeData] = useState<
    documentTypeApiResponseType[]
  >([]);

  const getDocumentTypeData = async () => {
    const response = await DocumentServices.DocumentType();

    setDocumentTypeData(response);
  };

  useEffect(() => {
    getDocumentTypeData();
  }, []);

  return { documentTypeData };
};

export default LoadDocumentHook;
