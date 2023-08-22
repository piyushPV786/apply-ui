import React, { useEffect, useState } from "react";
import { AccordionDetails, AccordionSummary } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {
  GreenFormHeading,
  StyledAccordion,
  GreyStyledAccordion,
  StyledLabel,
} from "../common/common";
import Image from "next/image";
import UserCircleIcon from "../../../public/assets/images/user-circle-svgrepo-com.svg";
import AddressImg from "../../../public/assets/images/address-card-outlined-svgrepo-com.svg";

import { useFormContext } from "react-hook-form";
import PhoneInput, { getCountryCallingCode } from "react-phone-number-input";
import { IOption } from "../common/types";
import {
  formDirtyState,
  isValidDate,
  emailValidation,
  isValidEmail,
  onlyAlphabets,
  capitalizeFirstLetter,
  sortAscending,
  onlyAlphabetsOrNumbers,
  transformDate,
} from "../../Util/Util";
import AdvanceDropDown from "../dropdown/Dropdown";
import { AuthApi } from "../../service/Axios";
import { CommonApi } from "../../components/common/constant";

interface IPersonalInfoProps {
  genders: IOption[];
  nationalities: IOption[];
  homeLanguage: IOption[];
  race: IOption[];
  nationalityStatusData: any[];
  identityDocuments: any[];
}

const parentKey = "lead";

const firstNameKey = `${parentKey}.firstName`;
const middleNameKey = `${parentKey}.middleName`;
const lastNameKey = `${parentKey}.lastName`;
const genderIdKey = `${parentKey}.gender`;
const dateOfBirthKey = `${parentKey}.dateOfBirth`;
const emailKey = `${parentKey}.email`;
const nationalityIdKey = `${parentKey}.nationality`;
const identificationNumberKey = `${parentKey}.identificationNumber`;
const raceIdKey = `${parentKey}.race`;
export const identificationDocumentTypeKey = `${parentKey}.identificationDocumentType`;
const homeLanguageIdKey = `${parentKey}.language`;
const studentNumberKey = `${parentKey}.mobileNumber`;
const mobileCountryCodeKey = `${parentKey}.mobileCountryCode`;
const nationalityStatusKey = `${parentKey}.nationalityStatus`;
const permenantResidentKey = `${parentKey}.permenantResident`;
const PersonalInfoForm = (props: IPersonalInfoProps) => {
  const {
    genders,
    nationalities,
    homeLanguage,
    race,
    nationalityStatusData,
    identityDocuments,
  } = {
    ...props,
  };
  const {
    setValue,
    register,
    clearErrors,
    setError,
    trigger,
    watch,
    formState: { errors, touchedFields },
  } = useFormContext();

  const TouchFields = touchedFields[parentKey] as any;

  const Errors = errors[parentKey] as any;
  const [countryCodeRef, setCountryCode] = useState<any>();
  const [mobNum, setMobile] = useState<any>("");
  const [isNationality, setNationality] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [isYes, setIsYes] = useState<boolean>(false);

  useEffect(() => {
    const userNumberDetail = JSON.parse(
      sessionStorage.getItem("studentMobile") as any
    );
    setMobile(
      "+" + userNumberDetail?.countryCodeNumber + userNumberDetail?.mobileNumber
    );
    setCountryCode(userNumberDetail?.countryCode);
    setValue(studentNumberKey, userNumberDetail?.mobileNumber);

    setValue(mobileCountryCodeKey, userNumberDetail?.countryCodeNumber);
  }, []);
  const firstName = watch(firstNameKey);
  const middleName = watch(middleNameKey);
  const lastName = watch(lastNameKey);
  const genderId = watch(genderIdKey);
  const dateOfBirth = watch(dateOfBirthKey);
  const email = watch(emailKey);
  const nationalityId = watch(nationalityIdKey);
  const nationalityStatus = watch(nationalityStatusKey);
  const identificationNumber = watch(identificationNumberKey);
  const raceId = watch(raceIdKey);
  const identificationDocumentType = watch(identificationDocumentTypeKey);
  const homeLanguageId = watch(homeLanguageIdKey);
  const permenantResident = watch(permenantResidentKey);

  const genderOption = [
    ...(genders || []),
    ...[{ name: "Other", code: "other", id: 21 }],
  ];

  const handleInternationAccordian = (state) => {
    if (state === "SA") {
      setValue(nationalityIdKey, "SA", formDirtyState);
      clearErrors(nationalityIdKey);
    } else if (state.target.value == "PRSA") {
      setValue(permenantResidentKey, "SA", formDirtyState);
      setValue(nationalityIdKey, "", formDirtyState);
    } else {
      setValue(permenantResidentKey, "", formDirtyState);
      setValue(nationalityIdKey, "", formDirtyState);
    }

    setValue(identificationDocumentTypeKey, "", formDirtyState);
    setValue(identificationNumberKey, "", formDirtyState);
  };

  return (
    <>
      <StyledAccordion defaultExpanded={true} className="card-shadow mt-0">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <GreenFormHeading>
            <span className="me-2">
              <Image src={UserCircleIcon} alt="user" />
            </span>
            Personal Information
          </GreenFormHeading>
        </AccordionSummary>
        <AccordionDetails>
          <div className="container-fluid form-padding">
            <div className="row">
              <div className="col-md-4">
                <div className="mb-4">
                  <StyledLabel required>First Name</StyledLabel>
                  <input
                    value={firstName}
                    defaultValue={firstName}
                    type="text"
                    {...register(firstNameKey, {
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
                        setValue(
                          name,
                          capitalizeFirstLetter(value),
                          formDirtyState
                        );
                      }
                    }}
                    className="form-control"
                    id="firstName"
                    placeholder="e.g Robert"
                  />
                  {Errors?.firstName && (
                    <>
                      <div className="invalid-feedback">
                        Please enter your First Name
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div className="col-md-4">
                <div className="mb-4">
                  <StyledLabel>Middle Name</StyledLabel>
                  <input
                    value={middleName}
                    defaultValue={middleName}
                    {...register(middleNameKey)}
                    type="text"
                    className="form-control"
                    onChange={(e) => {
                      const value = e.target.value;
                      const name = e.target.name;
                      if (onlyAlphabets(value)) {
                        setValue(
                          name,
                          capitalizeFirstLetter(value),
                          formDirtyState
                        );
                        setValue(
                          name,
                          capitalizeFirstLetter(value),
                          formDirtyState
                        );
                      }
                    }}
                    id="middleName"
                    placeholder=""
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="mb-4">
                  <StyledLabel required>Last Name</StyledLabel>
                  <input
                    value={lastName}
                    defaultValue={lastName}
                    {...register(lastNameKey, { required: true })}
                    type="text"
                    className="form-control"
                    onChange={(e) => {
                      const value = e.target.value;
                      const name = e.target.name;
                      if (onlyAlphabets(value)) {
                        setValue(
                          name,
                          capitalizeFirstLetter(value),
                          formDirtyState
                        );
                        setValue(
                          name,
                          capitalizeFirstLetter(value),
                          formDirtyState
                        );
                      }
                    }}
                    id="lastName"
                    placeholder=""
                  />
                  {Errors?.lastName && (
                    <div className="invalid-feedback">
                      Please enter Last Name
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <div className="mb-4">
                  <AdvanceDropDown
                    options={genderOption}
                    label={"Gender"}
                    value={genderId}
                    onChange={(e) => {
                      setValue(genderIdKey, e.code);
                    }}
                    name={genderIdKey}
                    register={register}
                    onBlur={() => {
                      trigger(genderIdKey);
                    }}
                  />
                  {Errors?.gender && (
                    <div className="invalid-feedback">Please enter Gender</div>
                  )}
                </div>
              </div>
              <div className="col-md-4">
                <div className="mb-4">
                  <StyledLabel required>Date of Birth</StyledLabel>
                  <input
                    value={dateOfBirth}
                    defaultValue={dateOfBirth}
                    {...register(dateOfBirthKey, {
                      required: true,
                      validate: isValidDate,
                    })}
                    max={transformDate(new Date(), true)}
                    type="date"
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder=""
                  />
                  {Errors?.dateOfBirth && (
                    <div className="invalid-feedback">
                      {Errors?.dateOfBirth?.type === "validate"
                        ? "Please enter valid date"
                        : "Please enter valid  Date of Birth"}
                    </div>
                  )}
                </div>
              </div>
              <div className="col-md-4">
                <div className="mb-4">
                  <StyledLabel required>Email</StyledLabel>
                  <input
                    value={email}
                    defaultValue={email}
                    {...register(emailKey, {
                      required: true,
                    })}
                    type="text"
                    className="form-control"
                    id="email"
                    onBlur={async (e) => {
                      if (e.target.value) {
                        const res = await emailValidation(e);
                        if (
                          res.message == "Provided email address alredy exists"
                        ) {
                          setError(emailKey, {
                            type: "custom",
                            message: "Provided email address already exists",
                          });
                        } else {
                          clearErrors(emailKey);
                        }
                      } else if (e.target.value == "") {
                        setError(emailKey, {
                          type: "custom",
                          message: "Please enter Email",
                        });
                      }
                    }}
                    onChange={(e) => {
                      const name = e.target.name;
                      const value = e.target.value;
                      setValue(name, value, formDirtyState);
                    }}
                  />
                  {Errors?.email && (
                    <div className="invalid-feedback">
                      {Errors?.email?.type === "custom" &&
                        Errors?.email?.message}
                    </div>
                  )}
                  {email?.length > 1 && !isValidEmail(email) && (
                    <div className="invalid-feedback">
                      you have entered an invalid email address. Please try
                      again
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <div className="mb-4 pe-none ">
                  <StyledLabel required>Mobile Number</StyledLabel>
                  <div className="disabled">
                    <PhoneInput
                      id="1"
                      international
                      disabled
                      countryCallingCodeEditable={false}
                      defaultCountry={countryCodeRef}
                      placeholder="Select Country Code*"
                      {...register(studentNumberKey, { required: false })}
                      onCountryChange={(value: any) => {
                        return;
                      }}
                      onBlur={() => {
                        return;
                      }}
                      onChange={() => {
                        return;
                      }}
                      value={mobNum as any}
                    />
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="mb-4">
                  <AdvanceDropDown
                    name={homeLanguageIdKey}
                    label="Home Language"
                    register={register}
                    options={homeLanguage}
                    value={homeLanguageId}
                    onChange={(e) => {
                      setValue(homeLanguageIdKey, e.code);
                    }}
                    onBlur={() => {
                      trigger(homeLanguageIdKey);
                    }}
                  />
                  {Errors?.language && (
                    <div className="invalid-feedback">
                      Please select Home Language
                    </div>
                  )}
                </div>
              </div>
              <div className="col-md-4">
                <div className="mb-4">
                  <AdvanceDropDown
                    onChange={(e) => {
                      setValue(raceIdKey, e.code);
                    }}
                    label="Race"
                    value={raceId}
                    name={raceIdKey}
                    register={register}
                    options={race}
                    onBlur={() => {
                      trigger(raceIdKey);
                    }}
                  />
                  {Errors?.race && (
                    <div className="invalid-feedback">Please select Race</div>
                  )}
                </div>
              </div>
            </div>

            <GreyStyledAccordion
              expanded={nationalityStatus}
              defaultExpanded={true}
            >
              <AccordionSummary className="nationality-card">
                <div className="me-4">
                  <span className="me-2">
                    <Image
                      className="user-icon-circle"
                      src={AddressImg}
                      alt="user"
                    />
                  </span>
                  <StyledLabel required>Nationality Status</StyledLabel>
                </div>

                <AdvanceDropDown
                  options={nationalityStatusData}
                  value={nationalityStatus}
                  name={nationalityStatusKey}
                  register={register}
                  onChange={(e) => {
                    handleInternationAccordian(e.code);
                  }}
                  label="Nationality Status"
                  hideLabel
                  onBlur={() => {
                    trigger(nationalityStatusKey);
                  }}
                />

                <div className="m-2">
                  {Errors?.nationalityStatus && (
                    <div className="invalid-feedback">
                      Please Select Nationality Status
                    </div>
                  )}
                </div>
              </AccordionSummary>
              <AccordionDetails>
                <div className="container-fluid form-padding">
                  <div className="row">
                    {nationalityStatus == "PRSA" ? (
                      <div className="col-md-4">
                        <div className="mb-4">
                          <AdvanceDropDown
                            onChange={(e) => {
                              setValue(permenantResidentKey, e.code);
                            }}
                            disabled={nationalityStatus == "PRSA"}
                            options={nationalities?.sort((a, b) =>
                              sortAscending(a, b, "name")
                            )}
                            value={permenantResident}
                            name={permenantResidentKey}
                            register={register}
                            label="Permanent Resident"
                            onBlur={() => {
                              trigger(permenantResidentKey);
                            }}
                          />
                        </div>
                      </div>
                    ) : null}

                    <div className="col-md-4">
                      <div className="mb-4">
                        <AdvanceDropDown
                          onChange={(e) => {
                            setValue(nationalityIdKey, e.code);
                          }}
                          disabled={nationalityStatus == "SA"}
                          options={nationalities?.sort((a, b) =>
                            sortAscending(a, b, "name")
                          )}
                          value={nationalityId}
                          name={nationalityIdKey}
                          register={register}
                          label="Nationality"
                          onBlur={() => {
                            trigger(nationalityIdKey);
                          }}
                        />
                        {Errors?.nationalityId && (
                          <div className="invalid-feedback">
                            Please Select Nationality
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="col-md-4">
                      <div className="mb-4">
                        <AdvanceDropDown
                          onChange={(e) => {
                            setValue(identificationDocumentTypeKey, e.code);
                          }}
                          options={identityDocuments}
                          value={identificationDocumentType}
                          name={identificationDocumentTypeKey}
                          register={register}
                          label="Identification Document Type"
                          onBlur={() => {
                            trigger(identificationDocumentTypeKey);
                          }}
                        />
                        {Errors?.identificationDocumentType && (
                          <div className="invalid-feedback">
                            Please Select Document Type
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="mb-4">
                        <StyledLabel required>
                          Identification Number
                        </StyledLabel>
                        <input
                          value={identificationNumber}
                          defaultValue={identificationNumber}
                          {...register(identificationNumberKey, {
                            required: true,
                          })}
                          type="text"
                          className="form-control"
                          id="identificationPassportNumber"
                          placeholder=""
                          onChange={(e) => {
                            const name = e.target.name;
                            const value = e.target.value;
                            if (onlyAlphabetsOrNumbers(value)) {
                              setValue(name, value, formDirtyState);
                            }
                          }}
                        />
                        {Errors?.identificationNumber && (
                          <div className="invalid-feedback">
                            Please enter Identification Number
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </AccordionDetails>
            </GreyStyledAccordion>
          </div>
        </AccordionDetails>
      </StyledAccordion>
    </>
  );
};

export default PersonalInfoForm;
