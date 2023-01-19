import { useEffect } from "react";
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
export const AddressForm = ({ countryData = [] }: any) => {
  const CountryData = countryData;
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
  useEffect(() => {
    setValue(`${addressType}`, "POSTAL");
    setValue(`${addressTypeResidential}`, "RESIDENTIAL");
  }, []);

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
                    name={postalCountry}
                    onChange={(e: any) => {
                      const value = e.target.value;
                      setValue(postalCountry, value);
                      // onDropDownChange(value, AddressEnums.COUNTRY, 1);
                    }}
                    displayItem="name"
                    mapKey="isoCode"
                    label="Country"
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
                  <StyledLabel required>Pin Code</StyledLabel>
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
                        {error[0]?.zipcode.type === "maxLength"
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
                  <StyledLabel required>City</StyledLabel>
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
                  <StyledLabel required>State</StyledLabel>
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
                      required: true,
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
                      {...register(`${resPostalAddress}`, {
                      required: true,
                    })}
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
                      label="country"
                      options={CountryData}
                      name={resCountry}
                      register={register}
                      mapKey="isoCode"
                      displayItem="name"
                      onChange={(e: any) => {
                        const value = e.target.value;
                        setValue(resCountry, value);
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
                    <StyledLabel required>Pin Code</StyledLabel>
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
                    <StyledLabel required>City</StyledLabel>
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
                    <StyledLabel required>State</StyledLabel>
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
