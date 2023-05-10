import { SetStateAction } from "react";
import { CommonApi, CommonEnums } from "../components/common/constant";
import {
  ILeadFormValues,
  IMasterData,
  IOption,
} from "../components/common/types";
import { UseFormSetValue } from "react-hook-form";
import { AxiosInstance } from "axios";

export const getIntrestedQualificationPrograms = (
  AcadmicApi: AxiosInstance,
  setMasterData: (value: SetStateAction<IMasterData | null>) => void
) => {
  AcadmicApi.get(CommonApi.GETINTRESTEDQUALIFICATION)
    .then(({ data }: any) => {
      setMasterData((prevState: any) => ({
        ...prevState,
        programs: data.data.data as IOption[],
      }));
    })
    .catch((err) => console.log(err))
    .finally(() => {});
};

export const getUserDetailHelper = (
  leadDetail,
  transformFormData,
  mapFormDefaultValue,
  routeTo,
  setActiveStep: (value: number) => void,
  setSubmitted: (value: SetStateAction<boolean>) => void,
  setPaymentDone: (value: SetStateAction<boolean>) => void,
  routeIfStepDone: (routeTo: string) => void,
  setValue: UseFormSetValue<ILeadFormValues>,
  AuthApi: AxiosInstance
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
      if (leadDetail?.isPaymentPending && routeTo !== CommonEnums.DOCUMENT) {
        setActiveStep(1);
        setSubmitted(true);
        setPaymentDone(true);
      }
      if (leadDetail?.isDocumentPending) {
        setActiveStep(2);
        setSubmitted(true);
        setPaymentDone(true);
      }
      if (routeTo === CommonEnums.DOCUMENT) {
        routeIfStepDone(routeTo); /// calling this if user coming back from payment success screen
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
