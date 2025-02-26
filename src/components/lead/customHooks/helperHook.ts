import { useState } from "react";
import ApplicationServices from "../../../services/applicationForm";
import { useRouter } from "next/router";
import { createCreditVettingForType } from "../../common/types";

export const useHelperHook = (masterData, watch, setError) => {
  const [disable, setDisable] = useState(false);
  const { applicationData, programsData } = masterData;
  const router = useRouter();
  const { applicationCode } = router?.query;
  const allowedDocsForCreditReport = ["SMARTID", "PASSPORT"];
  let createCreditVettingFor: createCreditVettingForType;
  const [disableForApplication, setDisableForApplication] = useState(false);

  const saveApplication = async (data: any) => {
    setDisableForApplication(true);
    const programName = programsData?.find(
      (item) => item?.code === data?.education?.programCode,
    );
    let response: any = null;
    if (applicationCode === "new") {
      const payload = {
        ...data,
        address: Object.values(data?.address).filter(
          (value) => typeof value === "object",
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
          (value) => typeof value === "object",
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
          (value) => typeof value === "object",
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
        applicationData?.applicationCode,
      );
    }

    if (
      response &&
      response?.applicationData &&
      response?.applicationData?.applicationCode
    ) {
      window.location.replace(
        `/uploads/${response?.applicationData?.applicationCode}`
      );
    }
    setDisableForApplication(false);

    if (
      allowedDocsForCreditReport.includes(
        data?.lead?.identificationDocumentType
      )
    ) {
      createCreditVettingFor = ["lead"];
    }

    if (
      allowedDocsForCreditReport.includes(
        data?.sponsor?.identificationDocumentType
      )
    ) {
      if (createCreditVettingFor?.length)
        createCreditVettingFor.push("sponsor");
      else createCreditVettingFor = ["sponsor"];
    }

    if (createCreditVettingFor?.length) {
      await ApplicationServices.updateCreditReport(
        response?.applicationData?.applicationCode,
        { createCreditVettingFor },
      );
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
        applicationData?.applicationCode,
      );
      if (response?.statusCode === 200) {
        window.location.replace("/dashboard");
      }
    } else {
      const response = await ApplicationServices?.createDraft(payload);
      if (response?.statusCode === 201) {
        window.location.replace("/dashboard");
      }
    }
  };
  return {
    saveApplication,
    saveApplicationAsDraft,
    disable,
    disableForApplication,
  };
};
