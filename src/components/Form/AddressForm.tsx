import React, { useEffect, useState } from "react";
import {
  GreenFormHeading,
  StyledAccordion,
  StyledLabel,
} from "../common/common";
import { AccordionDetails, AccordionSummary } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { useFormContext } from "react-hook-form";
import Image from "next/image";
import AddressImg from "../../../public/assets/images/address-card-outlined-svgrepo-com.svg";
import { AuthApi } from "../../service/Axios";
import { IAddressDetailType } from "../common/types";
import { AddressApi, AddressEnums } from "../common/constant";
const Address = "address";
const resPostalAddress = `${Address}.residentialAddress`;
const resCountry = `${Address}.residentialCountry`;
const resPostalCode = `${Address}.residentialZipCode`;
const resCity = `${Address}.residentialCity`;
const resState = `${Address}.residentialState`;
const postalAddress = `${Address}.postalAddress`;
const postalCountry = `${Address}.postalCountry`;
const postalZipCode = `${Address}.postalZipCode`;
const postalCity = `${Address}.postalCity`;
const postalState = `${Address}.postalState`;
const isSameAsPostalAddress = `${Address}.isSameAsPostalAddress`;
export const AddressForm = () => {
  const [addressDetails, setAddressDetail] = useState<IAddressDetailType>({
    state: [],
    country: [],
    city: [],
  });
  const [addressDetailsTwo, setAddressDetailTwo] = useState<IAddressDetailType>(
    {
      state: [],
      country: [],
      city: [],
    }
  );
  const [allApiExecuted, setApiExecuted] = useState<boolean>(false);
  const {
    setValue,
    register,
    watch,
    formState: { errors, touchedFields },
  } = useFormContext();
  const error = errors[Address] as any;
  const touchedField = touchedFields[Address] as any;
  const resPostalAddressVal: string = watch(resPostalAddress);
  const resCountryVal: string = watch(resCountry);
  const resPostalCodeVal: string = watch(resPostalCode);
  const resCityVal: string = watch(resCity);
  const resStateVal: string = watch(resState);
  const isSameAsPostalAddressVal = watch(isSameAsPostalAddress, false);

  const postalAddressVal: string = watch(postalAddress);
  const postalCountryVal: string = watch(postalCountry);
  const postalZipCodeVal: string = watch(postalZipCode);
  const postalCityVal: string = watch(postalCity);
  const postalStateVal: string = watch(postalState);
  const allFields = watch();
  useEffect(() => {
    if (allFields && allFields?.address && !allApiExecuted) {
      Promise.allSettled([getCountry(), getStates(), getCity()]).then((res) => {
        if (
          res.every((item) => item.status.includes("fulfilled")) &&
          !allApiExecuted
        ) {
          if (postalCountryVal && postalCountryVal.length > 0) {
            onDropDownChange(postalCountryVal, AddressEnums.COUNTRY, 1);
          }
          if (postalStateVal && postalStateVal.length > 0) {
            onDropDownChange(postalStateVal, AddressEnums.STATE, 1);
          }
          if (resCountryVal && resCountryVal.length > 0) {
            onDropDownChange(resCountryVal, AddressEnums.COUNTRY, 2);
          }
          if (resStateVal && resStateVal.length > 0) {
            onDropDownChange(resStateVal, AddressEnums.STATE, 2);
          }
          setApiExecuted(true);
        }
      });
    }
  }, [allFields?.address]);

  const getCountry = async () => {
    await AuthApi.get(AddressApi.GETCOUNTRIES)
      .then(async ({ data: res }) => {
        setAddressDetail((prevState) => ({ ...prevState, country: res.data }));
        setAddressDetailTwo((prevState) => ({
          ...prevState,
          country: res.data,
        }));
        return new Promise((resolve) => resolve(true));
      })
      .catch((err) => {
        console.log(err);
        return new Promise((resolve) => resolve(false));
      });
  };
  const getStates = async (
    country: string = "IN",
    addressType?: number | null
  ) => {
    await AuthApi.get(`${AddressApi.GETSTATES}/${country}`)
      .then(({ data: res }) => {
        if (addressType === AddressEnums.ADDRESSTYPE1) {
          setAddressDetail((prevState) => ({
            ...prevState,
            state: res.data,
          }));
          return;
        }
        if (addressType === AddressEnums.ADDRESSTYPE2) {
          setAddressDetailTwo((prevState) => ({
            ...prevState,
            state: res.data,
          }));
          return;
        }
        if (!addressType) {
          setAddressDetail((prevState) => ({ ...prevState, state: res.data }));
          setAddressDetailTwo((prevState) => ({
            ...prevState,
            state: res.data,
          }));
          return;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getCity = async (
    country: string = "IN",
    state: string = "AN",
    addressType?: number | null
  ) => {
    await AuthApi.get(`${AddressApi.GETCITY}/${country}/${state}`)
      .then(({ data: res }) => {
        if (addressType === AddressEnums.ADDRESSTYPE1) {
          setAddressDetail((prevState) => ({ ...prevState, city: res.data }));
          return;
        }
        if (addressType === AddressEnums.ADDRESSTYPE2) {
          setAddressDetailTwo((prevState) => ({
            ...prevState,
            city: res.data,
          }));
          return;
        }
        if (!addressType) {
          setAddressDetail((prevState) => ({ ...prevState, city: res.data }));
          setAddressDetailTwo((prevState) => ({
            ...prevState,
            city: res.data,
          }));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const { city, state, country } = addressDetails;
  const {
    city: cityTwo,
    state: stateTwo,
    country: countryTwo,
  } = addressDetailsTwo;

  const onDropDownChange = (
    value: string,
    dropdownType: string,
    addressType: number
  ) => {
    if (
      dropdownType === AddressEnums.COUNTRY &&
      addressType === AddressEnums.ADDRESSTYPE1
    ) {
      getStates(value, addressType);
    }
    if (
      dropdownType === AddressEnums.STATE &&
      addressType === AddressEnums.ADDRESSTYPE1
    ) {
      getCity(postalCountryVal, value, addressType);
    }
    if (
      dropdownType === AddressEnums.COUNTRY &&
      addressType === AddressEnums.ADDRESSTYPE2
    ) {
      getStates(value, addressType);
    }
    if (
      dropdownType === AddressEnums.STATE &&
      addressType === AddressEnums.ADDRESSTYPE2
    ) {
      getCity(resCountryVal, value, addressType);
    }
  };

  return (
    <>
      <StyledAccordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <GreenFormHeading>
            <span className="me-2">
              <Image src={AddressImg} alt="address card" />
            </span>
            Address
          </GreenFormHeading>
        </AccordionSummary>
        <AccordionDetails>
          <div className="container">
            <div className="row">
              <div className="col-md-4">
                <div className="mb-4">
                  <StyledLabel required>Postal Address</StyledLabel>
                  <input
                    value={postalAddressVal}
                    defaultValue={postalAddressVal}
                    type="text"
                    {...register(`${postalAddress}`, { required: true })}
                    className="form-control"
                    id="postalAddress"
                    placeholder="e.g 10 church street"
                  />
                  {touchedField?.postalAddress && error?.postalAddress && (
                    <div className="invalid-feedback">
                      Please enter Postal Address
                    </div>
                  )}
                </div>
              </div>
              <div className="col-md-4">
                <StyledLabel hideLabel={true}></StyledLabel>

                <div className="mb-4">
                  <select
                    placeholder="trest"
                    value={postalCountryVal}
                    className="form-select"
                    {...register(`${postalCountry}`, { required: true })}
                    onChange={(e: any) => {
                      const value = e.target.value;
                      setValue(postalCountry, value);
                      onDropDownChange(value, AddressEnums.COUNTRY, 1);
                    }}
                  >
                    <option value={""}>Select Country</option>
                    {country.map((item, idx) => (
                      <option
                        selected={postalCountryVal === item?.isoCode}
                        key={idx}
                        value={item?.isoCode}
                      >
                        {item?.name}
                      </option>
                    ))}
                  </select>
                  {touchedField?.postalCountry && error?.postalCountry && (
                    <div className="invalid-feedback">
                      Please enter Postal Country
                    </div>
                  )}
                </div>
              </div>
              <div className="col-md-4">
                <div className="mb-4">
                  <StyledLabel hideLabel={true}></StyledLabel>
                  <input
                    value={postalZipCodeVal}
                    {...register(`${postalZipCode}`, {
                      required: true,
                      maxLength: 6,
                    })}
                    type="number"
                    maxLength={6}
                    className="form-control"
                    id="postalZipCode"
                    placeholder="Enter Zip/Postal Code"
                  />
                  {touchedField?.postalZipCode && error?.postalZipCode && (
                    <div className="invalid-feedback">
                      {error.postalZipCode.type === "maxLength"
                        ? "Max length exceeded"
                        : "Please enter Zip/Postal Code"}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <div className="mb-4">
                  <select
                    className="form-select"
                    value={postalCityVal}
                    {...register(`${postalCity}`, { required: true })}
                  >
                    <option value={""}>Select City</option>
                    {city.map((item, idx) => (
                      <option
                        selected={postalCityVal === item?.isoCode}
                        key={idx}
                        value={item?.isoCode}
                      >
                        {item?.name}
                      </option>
                    ))}
                  </select>
                  {touchedField?.postalCity && error?.postalCity && (
                    <div className="invalid-feedback">Please enter City</div>
                  )}
                </div>
              </div>
              <div className="col-md-4">
                <div className="mb-4">
                  <select
                    className="form-select"
                    value={postalStateVal}
                    {...register(`${postalState}`, { required: true })}
                    onChange={(e: any) => {
                      const value = e.target.value;
                      setValue(postalState, value);
                      onDropDownChange(value, AddressEnums.STATE, 1);
                    }}
                  >
                    <option value={""}>Select State</option>
                    {state.map((item, idx) => (
                      <option
                        selected={postalStateVal === item?.isoCode}
                        key={idx}
                        value={item?.isoCode}
                      >
                        {item?.name}
                      </option>
                    ))}
                  </select>
                  {touchedField?.postalState && error?.postalState && (
                    <div className="invalid-feedback">
                      Please enter Postal State
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="mb-4">
                  <input
                    className="form-check-input me-2"
                    type="checkbox"
                    id="flexCheckDefault"
                    checked={isSameAsPostalAddressVal}
                    {...register(`${isSameAsPostalAddress}`, {
                      required: false,
                    })}
                    onClick={(e) => {
                      setValue(
                        `${isSameAsPostalAddress}`,
                        e?.currentTarget?.checked,
                        {
                          shouldDirty: true,
                          shouldTouch: true,
                          shouldValidate: true,
                        }
                      );
                      if (e?.currentTarget?.checked) {
                        setValue(`${resPostalAddress}`, postalAddressVal, {
                          shouldDirty: true,
                          shouldTouch: true,
                          shouldValidate: true,
                        });
                        setValue(`${resPostalCode}`, postalZipCodeVal, {
                          shouldDirty: true,
                          shouldTouch: true,
                          shouldValidate: true,
                        });
                        setValue(`${resCity}`, postalCityVal, {
                          shouldDirty: true,
                          shouldTouch: true,
                          shouldValidate: true,
                        });
                        setValue(`${resState}`, postalStateVal, {
                          shouldDirty: true,
                          shouldTouch: true,
                          shouldValidate: true,
                        });
                        setValue(`${resCountry}`, postalCountryVal, {
                          shouldDirty: true,
                          shouldTouch: true,
                          shouldValidate: true,
                        });
                        setAddressDetailTwo(addressDetails);
                      }
                    }}
                  />
                  <label className="form-check-label ms-2">
                    Select if same with Postal Address
                  </label>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="row">
                <div className="col-md-4">
                  <div className="mb-4">
                    <StyledLabel required>Residential Address</StyledLabel>
                    <input
                      type="text"
                      {...register(`${resPostalAddress}`, { required: true })}
                      value={resPostalAddressVal}
                      className="form-control"
                      id="postalAddress"
                      placeholder="e.g 10 church street"
                    />
                    {touchedField?.residentialAddress &&
                      error?.residentialAddress && (
                        <div className="invalid-feedback">
                          Please enter Residential Address
                        </div>
                      )}
                  </div>
                </div>
                <div className="col-md-4">
                  <StyledLabel hideLabel={true}></StyledLabel>

                  <div className="mb-4">
                    <select
                      value={resCountryVal}
                      className="form-select"
                      {...register(`${resCountry}`, { required: true })}
                      onChange={(e: any) => {
                        const value = e.target.value;
                        setValue(resCountry, value);
                        onDropDownChange(value, AddressEnums.COUNTRY, 2);
                      }}
                    >
                      <option value={""}>Select Country</option>
                      {countryTwo.map((item, idx) => (
                        <option
                          selected={resCountryVal === item?.isoCode}
                          key={idx}
                          value={item?.isoCode}
                        >
                          {item?.name}
                        </option>
                      ))}
                    </select>
                    {touchedField?.resCountry && error?.resCountry && (
                      <div className="invalid-feedback">
                        Please enter Residential Country
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="mb-4">
                    <StyledLabel hideLabel={true}></StyledLabel>
                    <input
                      value={resPostalCodeVal}
                      defaultValue={resPostalCodeVal}
                      {...register(`${resPostalCode}`, {
                        required: true,
                        maxLength: 6,
                      })}
                      type="number"
                      className="form-control"
                      id="postalCode"
                      placeholder="Enter Zip/Postal Code"
                    />
                    {touchedField?.residentialZipCode &&
                      error?.residentialZipCode && (
                        <div className="invalid-feedback">
                          {error?.residentialZipCode.type === "maxLength"
                            ? "Max length exceeded"
                            : "Please enter Zip/Postal Code"}
                        </div>
                      )}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4">
                  <div className="mb-4">
                    <select
                      value={resCityVal}
                      className="form-select"
                      {...register(`${resCity}`, { required: true })}
                    >
                      <option value={""}>Select City</option>
                      {cityTwo.map((item, idx) => (
                        <option
                          selected={resCityVal === item.isoCode}
                          key={idx}
                          value={item?.isoCode}
                        >
                          {item?.name}
                        </option>
                      ))}
                    </select>
                    {touchedField?.resCity && error?.resCity && (
                      <div className="invalid-feedback">
                        Please enter Residential City
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="mb-4">
                    <select
                      value={resStateVal}
                      className="form-select"
                      {...register(`${resState}`, { required: true })}
                      onChange={(e: any) => {
                        const value = e.target.value;
                        setValue(resState, value);
                        onDropDownChange(value, AddressEnums.STATE, 2);
                      }}
                    >
                      <option value={""}>Select State</option>
                      {stateTwo.map((item, idx) => (
                        <option
                          selected={resStateVal === item?.isoCode}
                          key={idx}
                          value={item?.isoCode}
                        >
                          {item?.name}
                        </option>
                      ))}
                    </select>
                    {touchedField?.resState && error?.resState && (
                      <div className="invalid-feedback">
                        Please enter Residential State
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AccordionDetails>
      </StyledAccordion>
    </>
  );
};
