import React from "react";
import {
  GreenFormHeading,
  StyledAccordion,
  StyledLabel,
} from "../common/common";
import { AccordionDetails, AccordionSummary } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { useFormContext } from "react-hook-form";
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
              <img
                src={"/assets/images/address-card-outlined-svgrepo-com.svg"}
              />
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
                  >
                    <option value={""}>Select Country</option>
                    <option value="India">India</option>
                    <option value="USA">USA</option>
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
                      maxLength: 5,
                    })}
                    type="number"
                    maxLength={5}
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
                    <option value="Mumbai">Mumbai</option>
                    <option value="Delhi">Delhi</option>
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
                  >
                    <option value={""}>Select State</option>
                    <option value="MP">MP</option>
                    <option value="UP">UP</option>
                    <option value="Other">Other</option>
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
                    >
                      <option value={""}>Select Country</option>
                      <option value="India">India</option>
                      <option value="China">China</option>
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
                        maxLength: 5,
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
                      <option value="Mumbai">Mumbai</option>
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
                    >
                      <option value={""}>Select State</option>
                      <option value="MP">MP</option>
                      <option value="UP">UP</option>
                      <option value="Other">Other</option>
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
