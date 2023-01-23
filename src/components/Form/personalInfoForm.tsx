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
import { useFormContext } from "react-hook-form";
import PhoneInput, { getCountryCallingCode } from "react-phone-number-input";
import { IOption } from "../common/types";
import { isValidDate, isValidEmail, onlyAlphabets } from "../../Util/Util";
import AdvanceDropDown from "../dropdown/Dropdown";
interface IPersonalInfoProps {
  genders: IOption[];
  nationalities: IOption[];
  homeLanguage: IOption[];
  race: IOption[];
}
const parentKey = "lead";
const firstNameKey = `${parentKey}.firstName`;
const middleNameKey = `${parentKey}.middleName`;
const lastNameKey = `${parentKey}.lastName`;
const genderIdKey = `${parentKey}.gender`;
const dateOfBirthKey = `${parentKey}.dateOfBirth`;
const emailKey = `${parentKey}.email`;
const nationalityIdKey = `${parentKey}.nationality`;
const identificationPassportNumberKey = `${parentKey}.identificationNumber`;
const raceIdKey = `${parentKey}.race`;
const homeLanguageIdKey = `${parentKey}.language`;
const studentNumberKey = `${parentKey}.mobileNumber`;
const mobileCountryCodeKey = `${parentKey}.mobileCountryCode`;
const PersonalInfoForm = (props: IPersonalInfoProps) => {
  const { genders, nationalities, homeLanguage, race } = { ...props };
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
  const homeLanguageId = watch(homeLanguageIdKey);
  const uppdateMobNumber = () => {
    const countryCode = getCountryCallingCode(countryCodeRef);
    setValue(`${countryCode}`, `+${countryCode}`);
  };
  const genderOption = [
    ...(genders || []),
    ...[{ name: "Other", code: "other", id: 21 }],
  ];
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
          <div className="container">
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
                        setValue(name, value, {
                          shouldDirty: true,
                          shouldTouch: true,
                          shouldValidate: true,
                        });
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
                        setValue(name, value, {
                          shouldDirty: true,
                          shouldTouch: true,
                          shouldValidate: true,
                        });
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
                        setValue(name, value, {
                          shouldDirty: true,
                          shouldTouch: true,
                          shouldValidate: true,
                        });
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
                  {TouchFields?.genderId && Errors?.genderId && (
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
                  <StyledLabel required>
                    Identification / Passport Number
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
                        Please enter Identification / Passport Number
                      </div>
                    )}
                </div>
              </div>
              <div className="col-md-4">
                <div className="mb-4">
                  <AdvanceDropDown
                    options={nationalities}
                    value={nationalityId}
                    name={nationalityIdKey}
                    register={register}
                    label="Nationality"
                  />
                  {TouchFields?.nationalityId && Errors?.nationalityId && (
                    <div className="invalid-feedback">
                      Please enter Nationality
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <div className="mb-4">
                  <AdvanceDropDown
                    name={homeLanguageIdKey}
                    label="Home Language"
                    register={register}
                    options={homeLanguage}
                    value={homeLanguageId}
                  />
                  {TouchFields?.homeLanguageId && Errors?.homeLanguageId && (
                    <div className="invalid-feedback">
                      Please enter Home Language
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
                  {TouchFields?.raceId && Errors?.raceId && (
                    <div className="invalid-feedback">Please enter Race</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </AccordionDetails>
      </StyledAccordion>
    </>
  );
};

export default PersonalInfoForm;
