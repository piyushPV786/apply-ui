import React, { useEffect, useState } from "react";
import { AccordionDetails, AccordionSummary } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {
  GreenFormHeading,
  StyledAccordion,
  StyledLabel,
} from "../common/common";
import Image from "next/image";
import UserCircleIcon from "../../../public/assets/images/user-circle-svgrepo-com.svg";
import AddressImg from "../../../public/assets/images/address-card-outlined-svgrepo-com.svg";

import { useFormContext } from "react-hook-form";
import PhoneInput, { getCountryCallingCode } from "react-phone-number-input";
import { IOption } from "../common/types";
import {
  formOptions,
  isValidDate,
  isValidEmail,
  onlyAlphabets,
  sortAscending,
  transformDate,
} from "../../Util/Util";
import AdvanceDropDown from "../dropdown/Dropdown";

interface IPersonalInfoProps {
  genders: IOption[];
  nationalities: IOption[];
  homeLanguage: IOption[];
  race: IOption[];
}

const identityDocuments = [
  {
    code: "SI",
    name: "Smart ID",
  },
  { code: "DL", name: "Driving License" },
  { code: "PA", name: "Passport" },
];

const parentKey = "lead";

const firstNameKey = `${parentKey}.firstName`;
const middleNameKey = `${parentKey}.middleName`;
const lastNameKey = `${parentKey}.lastName`;
const genderIdKey = `${parentKey}.gender`;
const dateOfBirthKey = `${parentKey}.dateOfBirth`;
const emailKey = `${parentKey}.email`;
const nationalityIdKey = `${parentKey}.nationality`;
const identificationPassportNumberKey = `${parentKey}.identificationPassportNumber`;
const raceIdKey = `${parentKey}.race`;
const identificationDocumentTypeKey = `${parentKey}.identificationDocumentType`;
const homeLanguageIdKey = `${parentKey}.language`;
const studentNumberKey = `${parentKey}.mobileNumber`;
const mobileCountryCodeKey = `${parentKey}.mobileCountryCode`;
const PersonalInfoForm = (props: IPersonalInfoProps) => {
  const { genders, nationalities, homeLanguage, race } = {
    ...props,
  };
  const {
    setValue,
    register,
    watch,
    formState: { errors, touchedFields },
  } = useFormContext();
  const TouchFields = touchedFields[parentKey] as any;
  const Errors = errors[parentKey] as any;
  const [countryCodeRef, setCountryCode] = useState<any>();
  const [mobNum, setMobile] = useState<any>("");
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
  const identificationPassportNumber = watch(identificationPassportNumberKey);
  const raceId = watch(raceIdKey);
  const identificationDocumentType = watch(identificationDocumentTypeKey);
  const homeLanguageId = watch(homeLanguageIdKey);
  const uppdateMobNumber = () => {
    const countryCode = getCountryCallingCode(countryCodeRef);
    setValue(`${countryCode}`, `+${countryCode}`);
  };
  const genderOption = [
    ...(genders || []),
    ...[{ name: "Other", code: "other", id: 21 }],
  ];

  const [isDocument, setDocument] = useState<boolean>(false);
  const [isNationality, setNationality] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const handleInternationAccordian = (state: string) => {
    setIsExpanded(true);
    if (state === "yes") {
      setNationality(false);
      setDocument(true);
      setValue(nationalityIdKey, formOptions);
      setValue(identificationDocumentTypeKey, "PA", formOptions);
    } else {
      setNationality(true);
      setDocument(false);
      setValue(nationalityIdKey, "SA", formOptions);
      setValue(identificationDocumentTypeKey, formOptions);
    }
  };

  return (
    <>
      <StyledAccordion defaultExpanded={true}>
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
                        setValue(name, value, formOptions);
                      }
                    }}
                    className="form-control"
                    id="firstName"
                    placeholder="e.g Robert"
                  />
                  {TouchFields?.firstName && Errors?.firstName && (
                    <>
                      <div className="invalid-feedback">
                        Please enter First Name
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
                        setValue(name, value, formOptions);
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
                        setValue(name, value, formOptions);
                      }
                    }}
                    id="lastName"
                    placeholder=""
                  />
                  {TouchFields?.lastName && Errors?.lastName && (
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
                    name={genderIdKey}
                    register={register}
                  />
                  {TouchFields?.gender && Errors?.gender && (
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
                  {TouchFields?.dateOfBirth && Errors?.dateOfBirth && (
                    <div className="invalid-feedback">
                      {Errors?.dateOfBirth?.type === "validate"
                        ? "Please enter valid date"
                        : "Please enter Date of Birth"}
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
                      validate: isValidEmail,
                    })}
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder=""
                  />
                  {TouchFields?.email && Errors?.email && (
                    <div className="invalid-feedback">
                      {Errors?.email?.type == "validate"
                        ? "you have entered an invalid email address. Please try again"
                        : "Please enter Email"}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <div className="mb-4 pe-none">
                  <StyledLabel required>Mobile Number</StyledLabel>
                  <PhoneInput
                    disabled={true}
                    id="1"
                    international
                    countryCallingCodeEditable={false}
                    defaultCountry={countryCodeRef}
                    placeholder="Select Country Code*"
                    {...register(studentNumberKey, { required: false })}
                    onCountryChange={(value: any) => {
                      return;
                      setCountryCode(value);
                    }}
                    onBlur={(e) => {
                      return;
                      e.stopPropagation();
                      e.preventDefault();
                      uppdateMobNumber();
                    }}
                    onChange={(value) => {
                      return;
                      setValue("mobileNumber", value);
                    }}
                    value={mobNum as any}
                  />
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
                  />
                  {TouchFields?.language && Errors?.language && (
                    <div className="invalid-feedback">
                      Please select Home Language
                    </div>
                  )}
                </div>
              </div>
              <div className="col-md-4">
                <div className="mb-4">
                  <AdvanceDropDown
                    label="Race"
                    value={raceId}
                    name={raceIdKey}
                    register={register}
                    options={race}
                  />
                  {TouchFields?.race && Errors?.race && (
                    <div className="invalid-feedback">Please select Race</div>
                  )}
                </div>
              </div>
            </div>
            <StyledAccordion expanded={isExpanded} defaultExpanded={true}>
              <AccordionSummary>
                <span className="me-2">
                  <Image src={AddressImg} alt="user" />
                </span>
                <StyledLabel required>
                  Are you an International student ?
                </StyledLabel>
                <div
                  className="form-check form-check-inline"
                  style={{ marginLeft: "20px" }}
                >
                  <input
                    className="form-check-input me-2"
                    type="radio"
                    name="isInternational"
                    onClick={() => handleInternationAccordian("yes")}
                  />
                  <label className="form-check-label">Yes</label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input me-2"
                    type="radio"
                    name="isInternational"
                    onClick={() => handleInternationAccordian("no")}
                  />
                  <label className="form-check-label">No</label>
                </div>
              </AccordionSummary>
              <AccordionDetails>
                <div className="container-fluid form-padding">
                  <div className="row">
                    <div className="col-md-4">
                      <div className="mb-4">
                        <AdvanceDropDown
                          disabled={isDocument}
                          options={identityDocuments}
                          value={identificationDocumentType}
                          name={identificationDocumentTypeKey}
                          register={register}
                          label="Identification Document Type"
                        />
                        {TouchFields?.identificationDocumentType &&
                          Errors?.identificationDocumentType && (
                            <div className="invalid-feedback">
                              Please enter Document Type
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
                          value={identificationPassportNumber}
                          defaultValue={identificationPassportNumber}
                          {...register(identificationPassportNumberKey, {
                            required: true,
                          })}
                          type="text"
                          className="form-control"
                          id="identificationPassportNumber"
                          placeholder=""
                        />
                        {TouchFields?.identificationPassportNumber &&
                          Errors?.identificationPassportNumber && (
                            <div className="invalid-feedback">
                              Please enter Identification Number
                            </div>
                          )}
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="mb-4">
                        <AdvanceDropDown
                          disabled={isNationality}
                          options={nationalities?.sort((a, b) =>
                            sortAscending(a, b, "name")
                          )}
                          value={nationalityId}
                          name={nationalityIdKey}
                          register={register}
                          label="Nationality"
                        />
                        {TouchFields?.nationality && Errors?.nationality && (
                          <div className="invalid-feedback">
                            Please enter Nationality
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </AccordionDetails>
            </StyledAccordion>
          </div>
        </AccordionDetails>
      </StyledAccordion>
    </>
  );
};

export default PersonalInfoForm;
