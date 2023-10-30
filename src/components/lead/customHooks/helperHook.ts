import { useForm } from "react-hook-form";
import ApplicationServices from "../../../services/applicationForm";
import { Router } from "mdi-material-ui";
import { useRouter } from "next/router";

export const useHelperHook = (masterData) => {
  const { applicationData } = masterData;
  const router = useRouter();
  const { applicationCode } = router?.query;

  const saveApplication = async (data: any) => {
    let response: any = null;
    if (applicationCode === "new") {
      response = await ApplicationServices.createLead(data, false);
    } else if (
      applicationData?.status === "APP-DRAFT" &&
      applicationData?.applicationCode
    ) {
      const payload = {
        ...data,
        applicationCode: applicationData?.applicationCode,
      };
      response = await ApplicationServices.createLead(payload, true);
    } else if (applicationData?.applicationCode) {
      response = await ApplicationServices.updateLead(
        data,
        applicationData?.applicationCode
      );
    }

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
    if (
      applicationData?.status === "APP-DRAFT" &&
      applicationData?.applicationCode
    ) {
      const response = await ApplicationServices?.updateDraft(
        data,
        applicationData?.applicationCode
      );
      if (response?.statusCode === 200) {
        router.push("/dashboard");
      }
    } else {
      const response = await ApplicationServices?.createDraft(data);
      if (response?.statusCode === 201) {
        router.push("/dashboard");
      }
    }

    // ApplicationServices.createLead(payload, isDraft);
    // ApplicationServices.updateLead(payload, leadCode);
  };
  return { saveApplication, saveApplicationAsDraft };
};
