import { useEffect, useState } from "react";
import ApplicationFormServices from "../../../services/applicationForm";

export const useAddressHook = (countryCode: string) => {
  const [stateData, setStateData] = useState({});
  const getStateData = async () => {
    if (!stateData[countryCode]) {
      const data = await ApplicationFormServices?.getStateList(countryCode);
      setStateData({
        ...stateData,
        [countryCode]: data,
      });
    }
  };

  useEffect(() => {
    if (countryCode) {
      getStateData();
    }
  }, [countryCode]);

  return stateData;
};

export default useAddressHook;
