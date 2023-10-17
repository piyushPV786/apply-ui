import { useEffect, useState } from "react";
import { getMasterData } from "../../../service/service";
import { useForm } from "react-hook-form";

const LoadFormCustomHook = () => {
  const [masterData, setMasterData] = useState({});
  const methods = useForm();

  const getCommonMasterData = async () => {
    const response = await getMasterData();
    setMasterData(response);
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
