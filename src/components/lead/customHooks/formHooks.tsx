import { useEffect, useState } from "react";
import ApplicationFormServices from "../../../services/applicationForm";

export const useFormHook = (applicationCode: string) => {
  const [masterData, setMasterData] = useState({
    masterData: null,
    salesAgentData: null,
    applicationData: null,
    programsData: null,
    nationalityStatus: null,
    identificationType: null,
  });

  const getAllData = async () => {
    const data = await Promise.all([
      ApplicationFormServices?.getMasterData(),
      ApplicationFormServices?.getSalesAgentData(),
      ApplicationFormServices?.getProgramData(),
      applicationCode &&
        applicationCode !== "new" &&
        ApplicationFormServices?.getApplicationData(applicationCode),
      ApplicationFormServices?.getNationalityStatus(),
      ApplicationFormServices?.getIdentificationType(),
    ]);
    console.log("data ======>", data);
    const payload = {
      ...masterData,
      masterData: data[0],
      salesAgentData: data[1],
      programsData: data[2],
      applicationData: data[3],
      nationalityStatus: data[4],
      identificationType: data[5],
    };
    setMasterData(payload);
  };
  useEffect(() => {
    getAllData();
  }, []);

  return masterData;
};
