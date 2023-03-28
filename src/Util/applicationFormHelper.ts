import { SetStateAction } from "react";
import { AcadmicApi, AuthApi } from "../service/Axios";
import { CommonApi } from "../components/common/constant";
import {
  ILeadFormValues,
  IMasterData,
  IOption,
} from "../components/common/types";
import { UseFormSetValue } from "react-hook-form";

export const getIntrestedQualificationPrograms = (
  setLoading: (value: SetStateAction<boolean>) => void,
  setMasterData: (value: SetStateAction<IMasterData | null>) => void
) => {
  setLoading(true);
  AcadmicApi.get(CommonApi.GETINTRESTEDQUALIFICATION)
    .then(({ data }: any) => {
      setMasterData((prevState: any) => ({
        ...prevState,
        programs: data.data as IOption[],
      }));
    })
    .catch((err) => console.log(err))
    .finally(() => {
      setLoading(false);
    });
};

export const getUserDetailHelper = (
  leadDetail,
  transformFormData,
  mapFormDefaultValue,
  routeTo,
  setActiveStep: (value: number) => void,
  setSubmitted: (value: SetStateAction<boolean>) => void,
  setPaymentDone: (value: SetStateAction<boolean>) => void,
  setLoading: (value: SetStateAction<boolean>) => void,
  routeIfStepDone: (routeTo: string) => void,
  setValue: UseFormSetValue<ILeadFormValues>
) => {
  AuthApi.get(
    `lead/${leadDetail?.leadCode}/application/${
      leadDetail?.applicationCode
    }?isDraft=${leadDetail?.isdraftSave || "false"}`
  )
    .then(({ data: response }) => {
      const formData = { ...response?.data };
      transformFormData(formData);
      mapFormDefaultValue(formData, setValue);
      if (leadDetail?.isPaymentPending && routeTo !== "document") {
        setActiveStep(1);
        setSubmitted(true);
        setPaymentDone(true);
      }
      if (leadDetail?.isDocumentPending) {
        setActiveStep(2);
        setSubmitted(true);
        setPaymentDone(true);
      }
      if (routeTo === "Document") {
        routeIfStepDone(routeTo); /// calling this if user coming back from payment success screen
      }
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setLoading(false);
    });
};
