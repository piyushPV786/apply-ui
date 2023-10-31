import { useEffect, useState } from "react";
import UseDashboardHook from "../../dashboards/customHook/UseDashboardHook";
import DocumentServices from "../../../services/documentApi";
import { mbaDocs } from "../context/common";
import axios from "axios";
import { useRouter } from "next/router";

interface documentTypeApiResponseType {
  code: string;
  name: string;
}

const UseDocumentHook = (applicationCode) => {
  const router = useRouter();
  const { applicationData } = UseDashboardHook();
  const [documentTypeData, setDocumentTypeData] = useState<
    documentTypeApiResponseType[]
  >([]);
  const [userDetails, setUserDetails] = useState<any>();
  const [userDocuments, setUserDocuments] = useState<any>({});

  const [docJson, setDocJson] = useState<any>({});

  const getUserDocuments = async (applicationCode) => {
    const response = await DocumentServices.getDocumentsByApplicationCode(
      applicationCode
    );

    setUserDocuments(response);
  };

  const getUserDetails = async (applicationCode) => {
    const response = await DocumentServices?.getApplicationData(
      applicationCode
    );
    setUserDetails(response);
  };
  const uploadDocumentsToAws = async (uploadFileUrl, file) => {
    try {
      const response = await axios.put(uploadFileUrl, file);

      if (response.status === 200) {
        return response.data;
      } else {
        return response.data;
      }
    } catch (error: any) {
      console.log(error.message);
      return error;
    }
  };

  const mapDraftFiles = (code, userDocuments) => {
    let files = [];
    if (userDocuments.length) {
      files = userDocuments?.filter((element) => {
        return element?.documentTypeCode == code;
      });
    }

    return files;
  };

  const documetDiclarationLeter = async () => {
    const response = await DocumentServices.downloadDeclarationLetter(
      applicationCode
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

  const Createjson = (userDocuments) => {
    let docJson = {};
    documentTypeData?.map((item) => {
      if (item.code == "BURSARYLETTER") {
        docJson[item.code] = {
          code: item?.code,
          isRequired: userDetails?.status == "BURSARY-PEND",
          draftFiles: mapDraftFiles(item?.code, userDocuments),
        };
      } else if (mbaDocs.includes(item.code)) {
        docJson[item.code] = {
          code: item?.code,
          isRequired: userDetails?.education?.programCode == "MBA",
          draftFiles: mapDraftFiles(item?.code, userDocuments),
        };
      } else {
        docJson[item.code] = {
          code: item?.code,
          isRequired: true,
          draftFiles: mapDraftFiles(item?.code, userDocuments),
        };
      }
    });
    setDocJson(docJson);
  };

  const getDocumentTypeData = async () => {
    let response = await DocumentServices.DocumentType();
    response = response.filter((item) => {
      return item.code !== "PAYMENTPROOF";
    });
    setDocumentTypeData(response);
  };

  const uploadDocuments = async (payload) => {
    let response = await DocumentServices.uploadDocuments(
      payload,
      userDetails?.applicationCode
    );
    if (response) {
      let count = 0;
      response?.data?.map((url, index) => {
        uploadDocumentsToAws(url, payload?.files[index]);
        count = count + 1;
      });

      if (response?.data.length == count) {
        router.push(`/payments/${applicationCode}`);
      }
    }
  };

  const onSubmit = (data, isDraft) => {
    let Files: any = [];
    documentTypeData.forEach((element) => {
      data[`fileInput_${element?.code}`].forEach((item) => {
        if (item.type) {
          let Obj = {
            documentTypeCode: element?.code,
            fileName: element?.name,
            fileType: item?.fileExtension ? item.fileExtension : item.type,
          };
          Files.push(Obj);
        }
      });
    });

    const payload = {
      files: Files,
      paymentModeCode: "OFFLINE",
      isDraft: isDraft,
      studentCode: userDetails?.studentCode,
    };
    payload?.files?.length
      ? uploadDocuments(payload)
      : router.push(`/payments/${applicationCode}`);
  };

  useEffect(() => {
    getDocumentTypeData();
    if (applicationCode) {
      getUserDocuments(applicationCode);
      getUserDetails(applicationCode);
    }
  }, [applicationCode]);

  useEffect(() => {
    userDocuments && Createjson(userDocuments);
  }, [userDetails, documentTypeData, userDocuments]);

  return {
    documentTypeData,
    userDetails,
    docJson,
    uploadDocuments,
    onSubmit,
    documetDiclarationLeter,
  };
};

export default UseDocumentHook;
