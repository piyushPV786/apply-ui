import { useEffect, useState } from "react";
import DashboardApplicationServices from "../../../services/dashboardApplication";
import { StorageName } from "../../common/constant";

const UseDashboardHook = () => {
  const [applicationData, setApplicationData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [allProgram, setAllProgram] = useState([]);

  const getApplicationData = async () => {
    setIsLoading(true);
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
    setIsLoading(false);
  };

  useEffect(() => {
    getApplicationData();
  }, []);

  return { applicationData, getApplicationData, allProgram, isLoading };
};

export default UseDashboardHook;
