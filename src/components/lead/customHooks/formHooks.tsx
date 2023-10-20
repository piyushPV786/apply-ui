import { useEffect, useState } from "react";
import ApplicationFormServices from "../../../services/applicationForm";

export const useFormHook = (applicationCode: string) => {
  const [masterData, setMasterData] = useState({
    masterData: null,
    salesAgentData: null,
    applicationData: null,
    programsData: null,
  });

  const getAllData = async () => {
    const data = await Promise.all([
      ApplicationFormServices?.getMasterData(),
      ApplicationFormServices?.getSalesAgentData(),
      ApplicationFormServices?.getProgramData(),
      applicationCode &&
        ApplicationFormServices?.getApplicationData(applicationCode),
    ]);
    const payload = {
      ...masterData,
      masterData: data[0],
      salesAgentData: data[1],
      programsData: data[2],
      applicationData: data[3],
    };
    setMasterData(payload);
  };
  useEffect(() => {
    getAllData();
  }, []);

  return masterData;
};
