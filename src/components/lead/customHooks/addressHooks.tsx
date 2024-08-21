import { useEffect, useState } from "react";
import ApplicationFormServices from "../../../services/applicationForm";
import { useFormContext } from "react-hook-form";

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

export const useCompareAddressHook = (address: any) => {
  const { setValue } = useFormContext();
  useEffect(() => {
    if (address?.length === 2) {
      const _p = address[0];
      const _r = address[1];

      if (
        _p?.city === _r?.city &&
        _p?.country === _r?.country &&
        _p?.state === _r?.state &&
        _p?.street === _r?.street &&
        _p?.zipcode === _r?.zipcode
      ) {
        setValue("address.isSameAsPostalAddress", true);
      }
    }
  }, [address?.length]);
};

export const useSameResidentialAddress = () => {
  const { setValue, watch } = useFormContext();
  const address = watch("address");
  const isSameAsPostalAddress = watch("address.isSameAsPostalAddress");

  useEffect(() => {
    if (isSameAsPostalAddress) {
      const _p = address?.[0];
      const _r = address?.[1];
      const { addressType, ...rest } = _r || _p;
      const data = address?.[1]? Object.keys(address?.[1]): Object.keys(address?.[0]);

      const residentialAddress: any = { addressType };
      data.forEach((item) => {
        if (item !== "addressType" && item !== "isSameAsPostalAddress") {
          residentialAddress[item] = _p[item];
        }
      });
      const newAddress: any = [];
      newAddress.push(_p);
      newAddress.push(residentialAddress);

      setValue("address", newAddress);
      setValue("address.isSameAsPostalAddress", true);
    }
  }, [isSameAsPostalAddress]);
};
