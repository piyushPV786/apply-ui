import { useRouter } from "next/router";
import { useEffect } from "react";
import { ApplicationDashboard } from "../../components/Dashboard/Dashboard";

export default function DashboardHome() {
  const router = useRouter();
  // const isAuthenticate = JSON.parse(
  //   sessionStorage?.getItem("authenticate") as any
  // );
  
  useEffect(() => {
    // if (!isAuthenticate && studentId) {
    //   router.push("/");
    // }
  }, []);
  return (
    <div>
      <ApplicationDashboard />
    </div>
  );
}

