import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ApplicationFormServices from "../../../services/applicationForm";

const LoadFormCustomHook = () => {
  const [masterData, setMasterData] = useState({});
  const methods = useForm();

  const getCommonMasterData = async () => {
    const response = await ApplicationFormServices?.getMasterData();
    if (response?.data) {
      setMasterData(response?.data);
    }
  };

  useEffect(() => {
    getCommonMasterData();
  }, []);

  const saveApplication = (e: any) => {
    e.preventDefault();
    const data = methods.watch();
    console.log("data", data);
  };

  const saveApplicationAsDraft = (e: any) => {
    e.preventDefault();
    const data = methods.watch();
    console.log("data", data);
  };

  return { masterData, methods, saveApplication, saveApplicationAsDraft };
};

export default LoadFormCustomHook;
