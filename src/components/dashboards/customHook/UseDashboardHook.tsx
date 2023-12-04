import { useEffect, useState } from "react";
import DashboardApplicationServices from "../../../services/dashboardApplication";
import { StorageName } from "../../common/constant";
import { IApplication } from "../../common/types";

const UseDashboardHook = () => {
  const [applicationData, setApplicationData] =
    useState<Array<IApplication> | null>(null);

  const [allProgram, setAllProgram] = useState([]);

  const getApplicationData = async () => {
    const userDetails = window?.localStorage?.getItem(
      StorageName?.STUDENT_DETAIL
    );
    if (userDetails) {
      const data = JSON?.parse(userDetails ? userDetails : "");
      const applicationResponse =
        await DashboardApplicationServices?.getApplicationData(data?.leadCode);
      if (
        applicationResponse?.statusCode === 200 &&
        applicationResponse?.data
      ) {
        setApplicationData(applicationResponse?.data);
      }
    }

    const allProgramData = await DashboardApplicationServices?.getAllProgram();
    setAllProgram(allProgramData);
  };

  useEffect(() => {
    getApplicationData();
  }, []);

  return { applicationData, getApplicationData, allProgram };
};

export default UseDashboardHook;
