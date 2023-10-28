import { useForm } from "react-hook-form";
import ApplicationServices from "../../../services/applicationForm";
import { Router } from "mdi-material-ui";
import { useRouter } from "next/router";

export const useHelperHook = () => {
  const router = useRouter();
  const saveApplication = async (data: any) => {
    console.log("data", data);
    const response = await ApplicationServices.createLead(data, false);
    if (
      response &&
      response?.applicationData &&
      response?.applicationData?.applicationCode
    ) {
      router.push(`/uploads/${response?.applicationData?.applicationCode}`);
    }
    // ApplicationServices.updateLead(payload, leadCode);
  };

  const saveApplicationAsDraft = async (data: any) => {
    console.log("data", data);
    const response = await ApplicationServices?.createDraft(data);
    if (response?.statusCode === 201) {
      router.push("/dashboard");
    }
    // ApplicationServices.createLead(payload, isDraft);
    // ApplicationServices.updateLead(payload, leadCode);
  };
  return { saveApplication, saveApplicationAsDraft };
};
