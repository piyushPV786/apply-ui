import { useEffect, useState } from "react";
import { nationalityStatusEnum } from "../../../constants";
import { useFormContext } from "react-hook-form";

export const useNationalityHook = (nStatus: string) => {
  const [nationalityStatus, setNationalityStatus] = useState("");
  const { setValue } = useFormContext();
  useEffect(() => {
    if (nStatus) {
      setNationalityStatus(nStatus);
      if (nStatus === nationalityStatusEnum.PRSA) {
        setValue("lead.permenantResident", nationalityStatusEnum.SA);
      } else if (nStatus === nationalityStatusEnum.SA) {
        setValue("lead.nationality", nationalityStatusEnum.SA);
      }
    }
  }, [nStatus]);

  return nationalityStatus;
};
