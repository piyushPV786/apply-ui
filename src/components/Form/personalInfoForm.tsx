import React, { useEffect, useState } from "react";
import { AccordionDetails, AccordionSummary } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {
  GreenFormHeading,
  StyledAccordion,
  StyledLabel,
} from "../common/common";
import { useFormContext } from "react-hook-form";
import PhoneInput, { getCountryCallingCode } from "react-phone-number-input";
import { Gender, Language, Nationality, Race } from "../common/types";
import { isValidEmail, onlyAlphabets } from "../../Util/Util";
interface IPersonalInfoProps {
  genders: Gender[];
  nationalities: Nationality[];
  homeLanguage: Language[];
  race: Race[];
}
const PersonalInfoForm = (props: IPersonalInfoProps) => {
  const { genders, nationalities, homeLanguage, race } = { ...props };
  const {
    setValue,
    register,
    watch,
    formState: { errors, touchedFields },
  } = useFormContext();
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
  }, []);
  const {
    firstName,
    middleName,
    lastName,
    genderId,
    dateOfBirth,
    email,
    mobileNumber,
    nationalityId,
    identificationPassportNumber,
    raceId,
    homeLanguageId,
  } = watch();

  const uppdateMobNumber = () => {
    const countryCode = getCountryCallingCode(countryCodeRef);
    setValue(`${countryCode}`, `+${countryCode}`);
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
              <img src={"/assets/images/user-circle-svgrepo-com.svg"} />
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
                    {...register("firstName", {
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
                  {touchedFields?.firstName && errors?.firstName && (
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
                    {...register("middleName")}
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
                    {...register("lastName", { required: true })}
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
                  {touchedFields?.lastName && errors?.lastName && (
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
                  <StyledLabel required>Gender</StyledLabel>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    {...register("genderId", { required: true })}
                  >
                    <option value={""}>Select Gender</option>
                    {genders &&
                      genders.map(({ id, gender }) => (
                        <option
                          selected={id === genderId}
                          key={id}
                          value={Number(id)}
                        >
                          {gender}
                        </option>
                      ))}
                  </select>
                  {touchedFields?.gender && errors?.gender && (
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
                    {...register("dateOfBirth", { required: true })}
                    type="date"
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder=""
                  />
                  {touchedFields?.dateOfBirth && errors?.dateOfBirth && (
                    <div className="invalid-feedback">
                      Please enter Date of Birth
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
                    {...register("email", {
                      required: true,
                      validate: isValidEmail,
                    })}
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder=""
                  />
                  {touchedFields?.email && errors?.email && (
                    <div className="invalid-feedback">
                      {errors?.email?.type == "validate"
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
                    {...register("mobileNumber", { required: false })}
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
                    {...register("identificationPassportNumber", {
                      required: true,
                    })}
                    type="text"
                    className="form-control"
                    id="identificationPassportNumber"
                    placeholder=""
                  />
                  {touchedFields?.identificationPassportNumber &&
                    errors?.identificationPassportNumber && (
                      <div className="invalid-feedback">
                        Please enter Identification / Passport Number
                      </div>
                    )}
                </div>
              </div>
              <div className="col-md-4">
                <div className="mb-4">
                  <StyledLabel required>Nationality</StyledLabel>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    {...register("nationalityId", { required: true })}
                  >
                    <option value={""}>Select Nationalty</option>

                    {nationalities &&
                      nationalities.map(({ id, nationality }) => (
                        <option
                          selected={id === nationalityId}
                          key={id}
                          value={Number(id)}
                        >
                          {nationality}
                        </option>
                      ))}
                  </select>
                  {touchedFields?.nationalityId && errors?.nationalityId && (
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
                  <StyledLabel required>Home Language</StyledLabel>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    {...register("homeLanguageId", { required: true })}
                  >
                    <option value={""}>Home Language</option>
                    {homeLanguage &&
                      homeLanguage.map(({ id, language }) => (
                        <option
                          selected={id === homeLanguageId}
                          key={id}
                          value={Number(id)}
                        >
                          {language}
                        </option>
                      ))}
                  </select>
                  {touchedFields?.homeLanguageId && errors?.homeLanguageId && (
                    <div className="invalid-feedback">
                      Please enter Home Language
                    </div>
                  )}
                </div>
              </div>
              <div className="col-md-4">
                <div className="mb-4">
                  <StyledLabel required>Race</StyledLabel>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    {...register("raceId", { required: true })}
                  >
                    <option value={""}>Select Race</option>

                    {race &&
                      race.map(({ id, race }) => (
                        <option
                          selected={id === raceId}
                          key={id}
                          value={Number(id)}
                        >
                          {race}
                        </option>
                      ))}
                  </select>
                  {touchedFields?.raceId && errors?.raceId && (
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
