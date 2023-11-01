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
    const payload = {
      ...masterData,
      masterData: {
        ...data[0],
        nationalityData: data[0]?.nationalityData?.map((item) => {
          return { ...item, code: item?.code === "SA" ? "ZA" : item?.code };
        }),
      },
      salesAgentData: data[1],
      programsData: data[2],
      applicationData: data[3],
      nationalityStatus: data[4].map((item) => {
        return { ...item, code: item?.code === "SA" ? "ZA" : item?.code };
      }),

      identificationType: data[5],
    };
    setMasterData(payload);
  };
  useEffect(() => {
    getAllData();
  }, []);

  return masterData;
};
