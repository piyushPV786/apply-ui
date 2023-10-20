import { useEffect, useState } from "react";
import DashboardApplicationServices from "../../../services/dashboardApplication";
import { StorageName } from "../../common/constant";

const UseDashboardHook = () => {
  const [applicationData, setApplicationData] = useState([]);

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

  useEffect(() => {
    getApplicationData();
  }, []);

  return { applicationData, getApplicationData };
};

export default UseDashboardHook;
