import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { getLeadApplications } from "../service/service";

const Dashboard = () => {
  const router = useRouter();
  const redirect = () => {
    router.push("/lead/new");
  };
  const [dashboardData, setDashboardData] = useState([]);
  useEffect(() => {
    (async function () {
      const leadCode = "RLEAD00000015";
      if (leadCode) {
        const response = await getLeadApplications({ leadCode: leadCode });
        setDashboardData(response);
      }
    })();
  }, []);
  return (
    <>
      {dashboardData.map((item) => {
        return <>{console.log("item", item)}</>;
      })}
      <button onClick={(e) => redirect()}></button>
    </>
  );
};

export default Dashboard;
