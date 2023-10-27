import { useForm } from "react-hook-form";
import ApplicationServices from "../../../services/applicationForm";

export const useHelperHook = (watch) => {
  const saveApplication = (e: any) => {
    e.preventDefault();
    const data = watch();
    console.log("data", data);
    // ApplicationServices.createLead(payload, isDraft);
    // ApplicationServices.updateLead(payload, leadCode);
  };

  const saveApplicationAsDraft = (e: any) => {
    e.preventDefault();
    const data = watch();
    console.log("data", data);
    // ApplicationServices.createLead(payload, isDraft);
    // ApplicationServices.updateLead(payload, leadCode);
  };
  return { saveApplication, saveApplicationAsDraft };
};
