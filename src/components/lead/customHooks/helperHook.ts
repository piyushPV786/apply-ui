import { useForm } from "react-hook-form";

export const useHelperHook = (watch) => {
  const saveApplication = (e: any) => {
    e.preventDefault();
    const data = watch();
    console.log("data", data);
  };

  const saveApplicationAsDraft = (e: any) => {
    e.preventDefault();
    const data = watch();
    console.log("data", data);
  };
  return { saveApplication, saveApplicationAsDraft };
};
