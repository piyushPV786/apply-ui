import { useForm, useFormContext } from "react-hook-form";
import ApplicationServices from "../../../services/applicationForm";
import { Router } from "mdi-material-ui";
import { useRouter } from "next/router";

export const useHelperHook = (masterData, watch, setError) => {
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
      const payload = {
        ...data,
        kin: data?.kin?.isKin ? data?.kin : { isKin: "no" },
        sponsor: data?.sponsor?.isSponsor ? data?.sponsor : { isSponsor: "no" },
        employment: data?.employment?.isEmployment
          ? data?.employment
          : { isEmployment: "no" },
      };
      response = await ApplicationServices.updateLead(
        payload,
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

  const saveApplicationAsDraft = async () => {
    const data = watch();
    const { lead } = data;
    if (
      lead?.firstName.length === 0 ||
      lead?.lastName.length === 0 ||
      lead?.email.length === 0
    ) {
      if (lead?.firstName.length === 0) {
        setError("lead.firstName", {
          type: "manual",
          message: "Please enter your first name",
        });
      }
      if (lead?.lastName.length === 0) {
        setError("lead.lastName", {
          type: "manual",
          message: "Please enter your last name",
        });
      }
      if (lead?.email.length === 0) {
        setError("lead.email", {
          type: "custom",
          message: "Please enter your email",
        });
      }
      return;
    }

    const payload = {
      ...data,
      education: {
        ...data.education,
        isInternationDegree:
          data.education.isInternationDegree === "yes" ? true : false,
      },
    };

    if (
      applicationData?.status === "APP-DRAFT" &&
      applicationData?.applicationCode
    ) {
      const response = await ApplicationServices?.updateDraft(
        payload,
        applicationData?.applicationCode
      );
      if (response?.statusCode === 200) {
        router.push("/dashboard");
      }
    } else {
      const response = await ApplicationServices?.createDraft(payload);
      if (response?.statusCode === 201) {
        router.push("/dashboard");
      }
    }
  };
  return { saveApplication, saveApplicationAsDraft };
};
