import { useState } from "react";
import ApplicationServices from "../../../services/applicationForm";
import { useRouter } from "next/router";

export const useHelperHook = (masterData, watch, setError) => {
  const [disable, setDisable] = useState(false);
  const { applicationData, programsData } = masterData;
  const router = useRouter();
  const { applicationCode } = router?.query;

  const saveApplication = async (data: any) => {
    setDisable(true);
    const programName = programsData?.find(
      (item) => item?.code === data?.education?.programCode
    );
    let response: any = null;
    if (applicationCode === "new") {
      const payload = {
        ...data,
        address: Object.values(data?.address).filter(
          (value) => typeof value === "object"
        ),
        education: {
          ...data?.education,
          programName: programName?.name ? programName?.name : "",
          isInternationDegree:
            data.education.isInternationDegree === "yes" ? true : false,
        },
      };
      response = await ApplicationServices.createLead(payload, false);
    } else if (
      applicationData?.status === "APP-DRAFT" &&
      applicationData?.applicationCode
    ) {
      const payload = {
        ...data,
        address: Object.values(data?.address).filter(
          (value) => typeof value === "object"
        ),
        applicationCode: applicationData?.applicationCode,
        education: {
          ...data?.education,
          programName: programName?.name ? programName?.name : "",
          isInternationDegree:
            data.education.isInternationDegree === "yes" ? true : false,
        },
      };
      response = await ApplicationServices.createLead(payload, true);
    } else if (applicationData?.applicationCode) {
      const payload = {
        ...data,
        address: Object.values(data?.address).filter(
          (value) => typeof value === "object"
        ),
        kin: data?.kin?.isKin ? data?.kin : { isKin: "no" },
        sponsor: data?.sponsor?.isSponsor ? data?.sponsor : { isSponsor: "no" },
        employment: data?.employment?.isEmployment
          ? data?.employment
          : { isEmployment: "no" },

        education: {
          ...data?.education,
          programName: programName?.name ? programName?.name : "",
          isInternationDegree:
            data.education.isInternationDegree === "yes" ? true : false,
        },
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

    // ApplicationServices.updateLead(payload, leadId);
  };

  const saveApplicationAsDraft = async () => {
    setDisable(true);
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
      setDisable(false);
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
  return { saveApplication, saveApplicationAsDraft, disable };
};
