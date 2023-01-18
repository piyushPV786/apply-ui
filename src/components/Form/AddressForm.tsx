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
import AdvanceDropDown from "../dropdown/Dropdown";
const Address = "address";
const resPostalAddress = `${Address}[1].street`;
const resCountry = `${Address}[1].country`;
const resPostalCode = `${Address}[1].zipcode`;
const resCity = `${Address}[1].city`;
const resState = `${Address}[1].state`;
const postalAddress = `${Address}[0].street`;
const postalCountry = `${Address}[0].country`;
const postalZipCode = `${Address}[0].zipcode`;
const postalCity = `${Address}[0].city`;
const postalState = `${Address}[0].state`;
const isSameAsPostalAddress = `${Address}.isSameAsPostalAddress`;
const addressType = `${Address}[0].addressType`;
const addressTypeResidential = `${Address}[1].addressType`;
export const AddressForm = (props: any) => {
  const CountryData = props?.countryData;
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
    setValue(`${addressType}`, "POSTAL");
    setValue(`${addressTypeResidential}`, "RESIDENTIAL");

    // if (allFields && allFields?.address && !allApiExecuted) {
    //   Promise.allSettled([getCountry(), getStates(), getCity()]).then((res) => {
    //     if (
    //       res.every((item) => item.status.includes("fulfilled")) &&
    //       !allApiExecuted
    //     ) {
    //       if (postalCountryVal && postalCountryVal.length > 0) {
    //         onDropDownChange(postalCountryVal, AddressEnums.COUNTRY, 1);
    //       }
    //       if (postalStateVal && postalStateVal.length > 0) {
    //         onDropDownChange(postalStateVal, AddressEnums.STATE, 1);
    //       }
    //       if (resCountryVal && resCountryVal.length > 0) {
    //         onDropDownChange(resCountryVal, AddressEnums.COUNTRY, 2);
    //       }
    //       if (resStateVal && resStateVal.length > 0) {
    //         onDropDownChange(resStateVal, AddressEnums.STATE, 2);
    //       }
    //       setApiExecuted(true);
    //     }
    //   });
    // }
  }, []);

  // const getCountry = async () => {
  //   await AuthApi.get(AddressApi.GETCOUNTRIES)
  //     .then(async ({ data: res }) => {
  //       setAddressDetail((prevState) => ({ ...prevState, country: res.data }));
  //       setAddressDetailTwo((prevState) => ({
  //         ...prevState,
  //         country: res.data,
  //       }));
  //       return new Promise((resolve) => resolve(true));
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       return new Promise((resolve) => resolve(false));
  //     });
  // };
  // const getStates = async (
  //   country: string = "IN",
  //   addressType?: number | null
  // ) => {
  //   await AuthApi.get(`${AddressApi.GETSTATES}/${country}`)
  //     .then(({ data: res }) => {
  //       if (addressType === AddressEnums.ADDRESSTYPE1) {
  //         setAddressDetail((prevState) => ({
  //           ...prevState,
  //           state: res.data,
  //         }));
  //         return;
  //       }
  //       if (addressType === AddressEnums.ADDRESSTYPE2) {
  //         setAddressDetailTwo((prevState) => ({
  //           ...prevState,
  //           state: res.data,
  //         }));
  //         return;
  //       }
  //       if (!addressType) {
  //         setAddressDetail((prevState) => ({ ...prevState, state: res.data }));
  //         setAddressDetailTwo((prevState) => ({
  //           ...prevState,
  //           state: res.data,
  //         }));
  //         return;
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
  // const getCity = async (
  //   country: string = "IN",
  //   state: string = "AN",
  //   addressType?: number | null
  // ) => {
  //   await AuthApi.get(`${AddressApi.GETCITY}/${country}/${state}`)
  //     .then(({ data: res }) => {
  //       if (addressType === AddressEnums.ADDRESSTYPE1) {
  //         setAddressDetail((prevState) => ({ ...prevState, city: res.data }));
  //         return;
  //       }
  //       if (addressType === AddressEnums.ADDRESSTYPE2) {
  //         setAddressDetailTwo((prevState) => ({
  //           ...prevState,
  //           city: res.data,
  //         }));
  //         return;
  //       }
  //       if (!addressType) {
  //         setAddressDetail((prevState) => ({ ...prevState, city: res.data }));
  //         setAddressDetailTwo((prevState) => ({
  //           ...prevState,
  //           city: res.data,
  //         }));
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
  // const { city, state, country } = addressDetails;
  // const {
  //   city: cityTwo,
  //   state: stateTwo,
  //   country: countryTwo,
  // } = addressDetailsTwo;

  // const onDropDownChange = (
  //   value: string,
  //   dropdownType: string,
  //   addressType: number
  // ) => {
  //   if (
  //     dropdownType === AddressEnums.COUNTRY &&
  //     addressType === AddressEnums.ADDRESSTYPE1
  //   ) {
  //     getStates(value, addressType);
  //   }
  //   if (
  //     dropdownType === AddressEnums.STATE &&
  //     addressType === AddressEnums.ADDRESSTYPE1
  //   ) {
  //     getCity(postalCountryVal, value, addressType);
  //   }
  //   if (
  //     dropdownType === AddressEnums.COUNTRY &&
  //     addressType === AddressEnums.ADDRESSTYPE2
  //   ) {
  //     getStates(value, addressType);
  //   }
  //   if (
  //     dropdownType === AddressEnums.STATE &&
  //     addressType === AddressEnums.ADDRESSTYPE2
  //   ) {
  //     getCity(resCountryVal, value, addressType);
  //   }
  // };
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
                  {touchedField &&
                    error &&
                    touchedField[0]?.street &&
                    error[0]?.street && (
                      <div className="invalid-feedback">
                        Please enter Postal Address
                      </div>
                    )}
                </div>
              </div>
              <div className="col-md-4">
                <div className="mb-4">
                  <AdvanceDropDown
                    value={postalCountryVal}
                    options={CountryData}
                    register={register}
                    hideLabel={true}
                    name={postalCountry}
                    onChange={(e: any) => {
                      const value = e.target.value;
                      setValue(postalCountry, value);
                      // onDropDownChange(value, AddressEnums.COUNTRY, 1);
                    }}
                    displayItem="name"
                    mapKey="isoCode"
                  />

                  {touchedField &&
                    error &&
                    touchedField[0]?.country &&
                    error[0]?.country && (
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
                  {touchedField &&
                    error &&
                    touchedField[0]?.zipcode &&
                    error[0]?.zipcode && (
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
                  <StyledLabel hideLabel={true}></StyledLabel>
                  <input
                    value={postalCityVal}
                    defaultValue={postalCityVal}
                    className="form-control"
                    {...register(`${postalCity}`, {
                      required: true,
                    })}
                  />
                  {touchedField &&
                    error &&
                    touchedField[0]?.city &&
                    error[0]?.city && (
                      <div className="invalid-feedback">Please enter City</div>
                    )}
                </div>
              </div>
              <div className="col-md-4">
                <div className="mb-4">
                  <StyledLabel hideLabel={true}></StyledLabel>
                  <input
                    {...register(`${postalState}`, {
                      required: true,
                    })}
                    className="form-control"
                    value={postalStateVal}
                    defaultValue={postalStateVal}
                  />
                  {touchedField &&
                    error &&
                    touchedField[0]?.state &&
                    error[0]?.state && (
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
                        // setAddressDetailTwo(addressDetails);
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
                    {touchedField &&
                      error &&
                      touchedField[1]?.street &&
                      error[1]?.street && (
                        <div className="invalid-feedback">
                          Please enter Residential Address
                        </div>
                      )}
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="mb-4">
                    <AdvanceDropDown
                      value={resCountryVal}
                      options={CountryData}
                      hideLabel={true}
                      name={resCountry}
                      register={register}
                      mapKey="isoCode"
                      displayItem="name"
                      onChange={(e: any) => {
                        const value = e.target.value;
                        setValue(resCountry, value);
                        // onDropDownChange(value, AddressEnums.COUNTRY, 2);
                      }}
                    />
                    {touchedField &&
                      error &&
                      touchedField[1]?.country &&
                      error[1]?.country && (
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
                    {touchedField &&
                      error &&
                      touchedField[1]?.zipcode &&
                      error[1]?.zipcode && (
                        <div className="invalid-feedback">
                          {error[1]?.zipcode.type === "maxLength"
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
                    <StyledLabel hideLabel={true}></StyledLabel>
                    <input
                      {...register(`${resCity}`, {
                        required: true,
                      })}
                      className="form-control"
                      value={resCityVal}
                      defaultValue={resCityVal}
                    />
                    {touchedField &&
                      error &&
                      touchedField[1]?.city &&
                      error[1]?.city && (
                        <div className="invalid-feedback">
                          Please enter Residential City
                        </div>
                      )}
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="mb-4">
                    <input
                      {...register(`${resState}`, {
                        required: true,
                      })}
                      className="form-control"
                      value={resStateVal}
                      defaultValue={resStateVal}
                      name={resState}
                      onChange={(e: any) => {
                        const value = e.target.value;
                        setValue(resState, value);
                      }}
                    />
                    {touchedField &&
                      error &&
                      touchedField[1]?.state &&
                      error[1]?.state && (
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
