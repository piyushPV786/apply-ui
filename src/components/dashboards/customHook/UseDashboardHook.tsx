import { useEffect, useState } from "react";
import DashboardApplicationServices from "../../../services/dashboardApplication";
import { StorageName } from "../../common/constant";

const UseDashboardHook = () => {
  const [applicationData, setApplicationData] = useState([]);
  const [allProgram, setAllProgram] = useState([]);

  const getApplicationData = async () => {
    const userDetails = window?.localStorage?.getItem(
      StorageName?.STUDENT_DETAIL
    );

    const data = JSON?.parse(userDetails ? userDetails : "");
    const applicationResponse =
      await DashboardApplicationServices?.getApplicationData(data?.leadCode);
    if (applicationResponse?.statusCode === 200 && applicationResponse?.data) {
      setApplicationData(applicationResponse?.data);
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
