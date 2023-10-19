import { useEffect, useState } from "react";
import DashboardApplicationServices from "../../../services/dashboardApplication";
import { StorageName } from "../../common/constant";

const UseDashboardHook = () => {
  const [applicationData, setApplicationData] = useState([]);
  const [allPrograms, setAllPrograms] = useState([]);

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
  };

  const getAllPrograms = async () => {
    const programResponse = await DashboardApplicationServices?.getAllProgram();
    if (programResponse?.statusCode === 200 && programResponse?.data) {
      setAllPrograms(programResponse?.data);
    }
  };

  useEffect(() => {
    getApplicationData();
    getAllPrograms();
  }, []);

  return { applicationData, allPrograms, getApplicationData };
};

export default UseDashboardHook;
