import React, { useState, useEffect } from "react";
import {
  getSponsorAddressLabel,
  getSponsorEmailLabel,
  getSponsorMobileLabel,
  getSponsorNameLabel,
  GreenFormHeading,
  StyledAccordion,
  StyledLabel,
} from "../common/common";
import { AccordionDetails, AccordionSummary } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Controller, useFormContext } from "react-hook-form";
import PhoneInput, { getCountryCallingCode } from "react-phone-number-input";
import { IOption } from "../common/types";
import AdvanceDropDown from "../dropdown/Dropdown";
import {
  isObjectEmpty,
  isValidEmail,
  onlyAlphabets,
  validateNumber,
  capitalizeFirstLetter,
  sortAscending,
  formDirtyState,
} from "../../Util/Util";
import DollarIcon from "../../../public/assets/images/dollar-symbol-svgrepo-com.svg";
import Image from "next/image";
import { AlertEnums, CommonEnums, bursaryWarning } from "../common/constant";
import AlertBox from "../alert/Alert";

const SponsorCandidateDetail = "sponsor";

const sponsorMode = `${SponsorCandidateDetail}.sponsorModeCode`;
const sponsorName = `${SponsorCandidateDetail}.name`;
const sponsorEmail = `${SponsorCandidateDetail}.email`;
const sponsorAddress = `${SponsorCandidateDetail}.address`;
const sponsorCountry = `${SponsorCandidateDetail}.country`;
const sponsorCity = `${SponsorCandidateDetail}.city`;
const sponsorPinCode = `${SponsorCandidateDetail}.zipCode`;
const sponsorState = `${SponsorCandidateDetail}.state`;
const sponsorPhoneNumber = `${SponsorCandidateDetail}.mobileNumber`;
const sponsorMobileCode = `${SponsorCandidateDetail}.mobileCountryCode`;
export const isSponsor = `${SponsorCandidateDetail}.isSponsor`;
const relationShip = `${SponsorCandidateDetail}.relationshipCode`;
interface ISponsorProps {
  leadId: string;
  sponsorModeArr: IOption[];
  relationData: IOption[];
  countryData: any;
  getStateData: any;
  sponsorStateData: any;
}
export const SponsoredForm = (props: ISponsorProps) => {
  const {
    sponsorModeArr = [],
    relationData = [],
    countryData = [],
    getStateData,
    sponsorStateData,
  } = { ...props };
  const CountryData = countryData;

  const {
    setValue,
    register,
    watch,

    unregister,
    control,
    formState: { errors, touchedFields },
  } = useFormContext();
  const [countryCodeRef, setCountryCode] = useState<any>();

  const isSponsorVal = watch(isSponsor);
  const sponsorModeVal = watch(sponsorMode);
  const sponsorNameVal = watch(sponsorName);
  const sponsorAddressVal = watch(sponsorAddress);
  const sponsorCountryVal = watch(sponsorCountry);
  const sponsorPinCodeVal = watch(sponsorPinCode);
  const sponsorStateVal = watch(sponsorState);
  const sponsorCityVal = watch(sponsorCity);
  const sponsorPhoneNumberVal = watch(sponsorPhoneNumber);
  const sponserEmailVal = watch(sponsorEmail);
  const relationshipVal = watch(relationShip);
  const uppdateMobNumber = () => {
    if (countryCodeRef) {
      const countryCode = getCountryCallingCode(countryCodeRef);
      setValue(`${sponsorMobileCode}`, `+${countryCode}`);
    } else {
      setValue(`${sponsorMobileCode}`, null, formDirtyState);
    }
  };
  const error = errors[SponsorCandidateDetail] as any;
  const touchedField = touchedFields[SponsorCandidateDetail] as any;
  const isSelfSponsored = sponsorModeVal === "SELF";
  const isSponserDetailExist = watch(SponsorCandidateDetail);
  const isSponserNeed = isSponsorVal === "yes";
  const disablePhoneOnSelfSponser = isSelfSponsored;
  const educationFormValues = watch("education");
  const studentType = educationFormValues?.studentTypeCode;
  const isBursaryStudentType = studentType
    ?.toLowerCase()
    .includes(CommonEnums.BURSARY);
  const isStudentAndSponsorBursary =
    studentType?.toLowerCase().includes(CommonEnums.BURSARY) &&
    sponsorModeVal?.toLowerCase() === CommonEnums.BURSARY;
  const isStudentAndSponsorEmpBursary = sponsorModeVal
    ?.toLowerCase()
    .includes(CommonEnums.EMPLOYEE_BURSARY);
  const disableSponsorForm =
    studentType?.toLowerCase() === CommonEnums.MANAGEMENT;

  useEffect(() => {
    if (!props?.leadId) {
      const userNumberDetail = JSON.parse(
        sessionStorage.getItem("studentMobile") as any
      );
      setCountryCode(userNumberDetail?.countryCode);
    }
    if (!isSponserNeed) {
      unregister(sponsorPhoneNumber, {
        keepError: false,
        keepIsValid: true,
      });
    }
    if (sponsorCountryVal) {
      getStateData(sponsorCountryVal, "SPONSOR");
    }
  }, [isSponserNeed]);
  const isRequired =
    sponsorModeVal?.toLowerCase() === CommonEnums.EMPLOYEE_BURSARY;
  const isGuardian = sponsorModeVal?.toLowerCase() === CommonEnums.GUARDIAN;
  const sponsorModeData =
    studentType?.toLowerCase() === CommonEnums.BURSARY
      ? sponsorModeArr.filter((item) => item.name !== "Guardian")
      : sponsorModeArr.filter((item) => item.name === "Guardian");

  const getEmailValidation = (value: string) => {
    if (isSponserNeed) {
      return isValidEmail(value);
    } else {
      return true;
    }
  };

  const reset = () => {
    setValue(sponsorAddress, "");
    setValue(sponsorCity, "");
    setValue(sponsorEmail, "");
    setValue(sponsorCountry, "");
    setValue(sponsorMobileCode, "");
    setValue(sponsorPhoneNumber, "");
    setValue(sponsorState, "");
    setValue(sponsorName, "");
    setValue(relationShip, "");
    setValue(sponsorPinCode, "");
    setValue(sponsorMode, "");
  };

  return (
    <>
      <StyledAccordion defaultExpanded={isSponserNeed} className="card-shadow">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          className={disableSponsorForm ? "disabled" : ""}
        >
          <GreenFormHeading>
            <span className="me-2">
              <Image alt="Dollar" src={DollarIcon} />
            </span>
            Are you Sponsored Candidate?
            <span className="me-2 ms-1" style={{ color: "red" }}>
              *
            </span>
          </GreenFormHeading>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input me-2"
              type="radio"
              {...register(`${isSponsor}`, { required: isSponserNeed })}
              value="yes"
              checked={isSponsorVal === "yes"}
            />
            <label className="form-check-label">Yes</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              disabled={isBursaryStudentType}
              className="form-check-input me-2"
              onClick={(e) => {
                reset();
              }}
              type="radio"
              {...register(`${isSponsor}`, { required: isSponserNeed })}
              value="no"
              checked={!isSponsorVal || isSponsorVal === "no"}
            />
            <label className="form-check-label">No</label>
          </div>
        </AccordionSummary>
        {!disableSponsorForm && (
          <AccordionDetails hidden={!isSponsorVal || isSponsorVal === "no"}>
            <div className="container-fluid form-padding">
              <div className="row">
                <div className="col-md-4">
                  <div className="mb-4">
                    <StyledLabel required>Sponsor Type</StyledLabel>
                    <select
                      value={sponsorModeVal}
                      className="form-select"
                      aria-label="Default select example"
                      {...register(`${sponsorMode}`, {
                        required: isSponserNeed,
                      })}
                    >
                      <option value={""}>Select Sponsor type</option>

                      {sponsorModeData &&
                        sponsorModeData.map(({ code, name }) => (
                          <option
                            key={code}
                            selected={code === sponsorModeVal}
                            value={code}
                          >
                            {name}
                          </option>
                        ))}
                    </select>
                  </div>

                  {isStudentAndSponsorEmpBursary && (
                    <div className="mb-4">
                      <AlertBox severity={AlertEnums.INFO}>
                        {bursaryWarning}
                      </AlertBox>
                    </div>
                  )}
                </div>

                {sponsorModeVal && (
                  <>
                    {" "}
                    {isGuardian && (
                      <div className="col-md-4">
                        <StyledLabel required>Relationship Type</StyledLabel>
                        <div className="mb-4">
                          <select
                            value={relationshipVal}
                            className="form-select"
                            aria-label="Default select example"
                            {...register(`${relationShip}`, {
                              required: isSponserNeed,
                            })}
                          >
                            <option value={""}>Select Relationship </option>

                            {relationData &&
                              relationData.map(({ code, name }) => (
                                <option
                                  key={code}
                                  selected={code === sponsorModeVal}
                                  value={code}
                                >
                                  {name}
                                </option>
                              ))}
                          </select>
                          {error && error?.relationship && (
                            <div className="invalid-feedback">
                              Please select relationship type
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                    {!isStudentAndSponsorBursary && (
                      <>
                        <div className="col-md-4">
                          <StyledLabel required>
                            {getSponsorNameLabel(
                              studentType?.toLowerCase(),
                              sponsorModeVal?.toLowerCase()
                            )}
                          </StyledLabel>
                          <div className="mb-4">
                            <input
                              disabled={isSelfSponsored}
                              className="form-control"
                              aria-label="Default select example"
                              value={sponsorNameVal}
                              defaultValue={sponsorNameVal}
                              {...register(`${sponsorName}`, {
                                required: true,
                              })}
                              onChange={(e) => {
                                const value = e.target.value;
                                const name = e.target.name;
                                if (onlyAlphabets(value)) {
                                  setValue(
                                    name,
                                    capitalizeFirstLetter(value),
                                    formDirtyState
                                  );
                                }
                              }}
                            />
                            {error && error?.name && (
                              <div className="invalid-feedback">
                                Please enter{" "}
                                {getSponsorNameLabel(
                                  studentType?.toLowerCase(),
                                  sponsorModeVal?.toLowerCase()
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="col-md-4">
                          <StyledLabel required>
                            {" "}
                            {getSponsorEmailLabel(
                              studentType?.toLowerCase(),
                              sponsorModeVal?.toLowerCase()
                            )}
                          </StyledLabel>
                          {isSponserNeed && (
                            <div className="mb-4">
                              <input
                                disabled={isSelfSponsored}
                                className="form-control"
                                aria-label="Default select example"
                                value={sponserEmailVal}
                                {...register(`${sponsorEmail}`, {
                                  required:
                                    !isSelfSponsored &&
                                    isSponserNeed &&
                                    isRequired,
                                  validate: (value) =>
                                    getEmailValidation(value),
                                })}
                                onChange={(e) => {
                                  const value = e.target.value;
                                  const name = e.target.name;

                                  setValue(name, value, formDirtyState);
                                }}
                              />

                              {error && error?.email && (
                                <div className="invalid-feedback">
                                  {error?.email?.type == "validate" &&
                                  sponserEmailVal?.length > 0
                                    ? "you have entered an invalid email address. Please try again"
                                    : `Please enter ${getSponsorEmailLabel(
                                        studentType?.toLowerCase(),
                                        sponsorModeVal?.toLowerCase()
                                      )}`}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </>
                    )}
                    {!isStudentAndSponsorBursary && (
                      <>
                        <div className="col-md-4">
                          <div className="mb-4">
                            <StyledLabel required>
                              {" "}
                              {getSponsorMobileLabel(
                                studentType?.toLowerCase(),
                                sponsorModeVal?.toLowerCase()
                              )}
                            </StyledLabel>
                            <Controller
                              control={control}
                              name={sponsorPhoneNumber}
                              rules={{
                                required: true,
                                validate: (value) => {
                                  if (isSponserNeed) {
                                    return (
                                      validateNumber(value, countryCodeRef) ||
                                      "Invalid phone number"
                                    );
                                  }
                                },
                              }}
                              render={({ field }) => (
                                <PhoneInput
                                  {...field}
                                  international
                                  countryCallingCodeEditable={false}
                                  defaultCountry={countryCodeRef}
                                  placeholder="Select Country Code*"
                                  disabled={disablePhoneOnSelfSponser}
                                  onCountryChange={(value: any) => {
                                    !disablePhoneOnSelfSponser &&
                                      setCountryCode(value);
                                  }}
                                  onBlur={() => {
                                    field.onBlur();
                                    uppdateMobNumber();
                                  }}
                                  onChange={(value) => {
                                    field.onChange(value);
                                  }}
                                  value={field.value}
                                />
                              )}
                            />
                            {error && error?.mobileNumber && (
                              <div className="invalid-feedback">
                                {error?.mobileNumber.type === "validate"
                                  ? "you have entered an invalid number"
                                  : " Please enter phone number"}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="mb-4">
                            <StyledLabel required={isGuardian}>
                              {" "}
                              {getSponsorAddressLabel(
                                studentType?.toLowerCase(),
                                sponsorModeVal?.toLowerCase()
                              )}
                            </StyledLabel>
                            <input
                              disabled={isSelfSponsored}
                              className="form-control"
                              value={sponsorAddressVal}
                              defaultValue={sponsorAddressVal}
                              {...register(`${sponsorAddress}`, {
                                required: true,
                              })}
                              onChange={(e) => {
                                const value = e.target.value;
                                const name = e.target.name;

                                setValue(
                                  name,
                                  capitalizeFirstLetter(value),
                                  formDirtyState
                                );
                              }}
                            />
                            {error && error?.address && (
                              <div className="invalid-feedback">
                                Please enter{" "}
                                {getSponsorAddressLabel(
                                  studentType?.toLowerCase(),
                                  sponsorModeVal?.toLowerCase()
                                )}
                              </div>
                            )}
                          </div>
                        </div>{" "}
                        <div className="col-md-4">
                          <div className="mb-4">
                            <AdvanceDropDown
                              value={sponsorCountryVal}
                              options={CountryData.sort((a, b) =>
                                sortAscending(a, b, "name")
                              )}
                              register={register}
                              mapKey="code"
                              name={sponsorCountry}
                              onChange={(e: any) => {
                                getStateData(e.target.value, "SPONSOR");
                                const value = e.target.value;
                                setValue(sponsorCountry, value, formDirtyState);
                              }}
                              label="Country"
                            />

                            {error && error?.country && (
                              <div className="invalid-feedback">
                                Please enter Country
                              </div>
                            )}
                          </div>
                        </div>{" "}
                        <div className="col-md-4">
                          <div className="mb-4">
                            <AdvanceDropDown
                              value={sponsorStateVal}
                              options={sponsorStateData.sort((a, b) =>
                                sortAscending(a, b, "name")
                              )}
                              register={register}
                              mapKey="code"
                              name={sponsorState}
                              onChange={(e) => {
                                const value = e.target.value;
                                const name = e.target.name;
                                if (onlyAlphabets(value)) {
                                  setValue(
                                    name,
                                    capitalizeFirstLetter(value),
                                    formDirtyState
                                  );
                                }
                              }}
                              label="State/Provinces"
                            />
                            {error && error?.state && (
                              <div className="invalid-feedback">
                                Please enter State Name
                              </div>
                            )}
                          </div>
                        </div>{" "}
                        <div className="col-md-4">
                          <div className="mb-4">
                            <StyledLabel required> City</StyledLabel>
                            <input
                              className="form-control"
                              value={sponsorCityVal}
                              defaultValue={sponsorCityVal}
                              {...register(`${sponsorCity}`, {
                                required: isSponserNeed,
                              })}
                              onChange={(e) => {
                                const value = e.target.value;
                                const name = e.target.name;
                                if (onlyAlphabets(value)) {
                                  setValue(
                                    name,
                                    capitalizeFirstLetter(value),
                                    formDirtyState
                                  );
                                }
                              }}
                            />
                            {error && error?.city && (
                              <div className="invalid-feedback">
                                Please enter City Name
                              </div>
                            )}
                          </div>
                        </div>{" "}
                        <div className="col-md-4">
                          <div className="mb-4">
                            <StyledLabel required>
                              {" "}
                              Pin Code / Zip Code
                            </StyledLabel>
                            <input
                              className="form-control"
                              value={sponsorPinCodeVal}
                              defaultValue={sponsorPinCodeVal}
                              {...register(`${sponsorPinCode}`, {
                                required: isSponserNeed,
                                maxLength: 10,
                                minLength: 4,
                              })}
                              type="number"
                            />

                            {error?.zipCode && (
                              <div className="invalid-feedback">
                                {error?.zipCode?.type === "maxLength"
                                  ? "Max length exceeded"
                                  : error?.zipcode?.type === "minLength"
                                  ? "Minimum length should be 4"
                                  : "Please enter Zip/Postal Code"}
                              </div>
                            )}
                          </div>
                        </div>
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          </AccordionDetails>
        )}
      </StyledAccordion>
    </>
  );
};
