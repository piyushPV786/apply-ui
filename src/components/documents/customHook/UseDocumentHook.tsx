import { useEffect, useState } from "react";
import UseDashboardHook from "../../dashboards/customHook/UseDashboardHook";
import DocumentServices from "../../../services/documentApi";
import { mbaDocs } from "../context/common";

interface documentTypeApiResponseType {
  code: string;
  name: string;
}

const UseDocumentHook = (applicationCode) => {
  const { applicationData } = UseDashboardHook();
  const [documentTypeData, setDocumentTypeData] = useState<
    documentTypeApiResponseType[]
  >([]);
  const [userDetails, setUserDetails] = useState<any>({});
  const [application, setApplication] = useState<any>();
  const [docJson, setDocJson] = useState<any>({});

  const mapDraftFiles = (code) => {
    let files = [];
    if (application && application?.document) {
      files = application && application?.document;
      application?.document?.filter((element) => {
        return element?.documentTypeCode == code;
      });
    }

    return files;
  };

  const Createjson = () => {
    let docJson = {};
    documentTypeData?.map((item) => {
      if (item.code == "BURSARYLETTER") {
        docJson[item.code] = {
          code: item?.code,
          isRequired: application?.status == "BURSARY-PEND",
          draftFiles: mapDraftFiles(item?.code),
        };
      } else if (mbaDocs.includes(item.code)) {
        docJson[item.code] = {
          code: item?.code,
          isRequired: application?.education?.programCode == "MBA",
          draftFiles: mapDraftFiles(item?.code),
        };
      } else {
        docJson[item.code] = {
          code: item?.code,
          isRequired: true,
          draftFiles: mapDraftFiles(item?.code),
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
      application?.applicationCode
    );
  };
  const onSubmit = (data, isDraft) => {
    let Files: any = [];
    documentTypeData.forEach((element) => {
      data[`fileInput_${element?.code}`].forEach((item) => {
        let Obj = {
          documentTypeCode: element?.code,
          fileName: item.name,
          fileType: item?.fileExtension ? item.fileExtension : item.type,
        };
        Files.push(Obj);
      });
    });

    const payload = {
      files: Files,
      paymentModeCode: "OFFLINE",
      isDraft: isDraft,
      studentCode: application?.studentCode,
    };
    uploadDocuments(payload);
  };

  useEffect(() => {
    getDocumentTypeData();
    const res = applicationData.find((item: any) => {
      return item?.applicationCode == applicationCode;
    });
    res && setApplication(res);
  }, [applicationData]);

  useEffect(() => {
    application && Createjson();
  }, [application, documentTypeData]);

  return {
    documentTypeData,
    userDetails,
    application,
    docJson,
    uploadDocuments,
    onSubmit,
  };
};

export default UseDocumentHook;
