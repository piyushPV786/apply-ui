import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import DocumentServices from "../../../services/documentApi";

interface documentTypeApiResponseType {
  code: string;
  name: string;
}

const UseDocumentHook = (applicationCode) => {
  const [documentTypeData, setDocumentTypeData] = useState<
    documentTypeApiResponseType[]
  >([]);
  const [userDetails, setUserDetails] = useState({});

  const getDocumentTypeData = async () => {
    const response = await DocumentServices.DocumentType();
    setDocumentTypeData(response);
  };

  const getUserDetails = async (applicationCode) => {
    const response = DocumentServices?.getApplicationData(applicationCode);
    setUserDetails(response);
  };

  useEffect(() => {
    getDocumentTypeData();
  }, []);

  useEffect(() => {
    if (applicationCode) {
      getUserDetails(applicationCode);
    }
  }, [applicationCode]);

  return { documentTypeData, userDetails };
};

export default UseDocumentHook;
