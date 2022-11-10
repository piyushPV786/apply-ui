import React, { useEffect, useState, useRef } from "react";
import { AccordionDetails, AccordionSummary } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {
  GreenFormHeading,
  StyledAccordion,
  StyledLabel,
} from "../common/common";
import { useFormContext } from "react-hook-form";
import PhoneInput, {
  getCountryCallingCode,
  parsePhoneNumber,
} from "react-phone-number-input";
import { Gender, Language, Nationality, Race } from "../common/types";
interface IPersonalInfoProps {
  genders: Gender[];
  nationalities: Nationality[];
  homeLanguage: Language[];
  race: Race[];
}
const PersonalInfoForm = (props: IPersonalInfoProps) => {
  const { genders, nationalities, homeLanguage, race } = { ...props };
  const { control, setValue, register, watch } = useFormContext();
  const [countryCodeRef, setCountryCode] = useState<any>();
  const [mobNum, setMobile] = useState<any>("");
  useEffect(() => {
    const userNumberDetail = JSON.parse(
      sessionStorage.getItem("studentMobile") as any
    );
    console.log({userNumberDetail})
    setMobile(userNumberDetail?.mobileNumber);
    setCountryCode(userNumberDetail?.countryCode);
    // setValue("mobileNumber", userNumber);
  }, []);
  console.log({countryCodeRef})
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
      <StyledAccordion>
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
                    {...register("firstName", { required: true })}
                    className="form-control"
                    id="firstName"
                    placeholder="e.g Robert"
                  />
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
                    id="lastName"
                    placeholder=""
                  />
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
                    value={genderId}
                    defaultValue={genderId}
                    {...register("gender", { required: true })}
                  >
                    {genders &&
                      genders.map(({ id, gender }) => (
                        <option key={id} value={Number(id)}>
                          {gender}
                        </option>
                      ))}
                  </select>
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
                </div>
              </div>
              <div className="col-md-4">
                <div className="mb-4">
                  <StyledLabel required>Email</StyledLabel>
                  <input
                    value={email}
                    defaultValue={email}
                    {...register("email", { required: true })}
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder=""
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <div className="mb-4">
                  <StyledLabel required>Mobile Number</StyledLabel>
                  <PhoneInput
                    disabled={true}
                    id="1"
                    international
                    countryCallingCodeEditable={false}
                    defaultCountry={countryCodeRef}
                    placeholder="Select Country Code*"
                    {...register("mobileNumber", { required: false })}
                    onCountryChange={(value: any) => {
                      setCountryCode(value);
                    }}
                    onBlur={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      uppdateMobNumber();
                    }}
                    onChange={(value) => {
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
                </div>
              </div>
              <div className="col-md-4">
                <div className="mb-4">
                  <StyledLabel required>Nationality</StyledLabel>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    value={nationalityId}
                    defaultValue={nationalityId}
                    {...register("nationalityId", { required: true })}
                  >
                    {nationalities &&
                      nationalities.map(({ id, nationality }) => (
                        <option key={id} value={Number(id)}>
                          {nationality}
                        </option>
                      ))}
                  </select>
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
                    value={homeLanguageId}
                    defaultValue={homeLanguageId}
                    {...register("homeLanguageId", { required: true })}
                  >
                    <option selected disabled>
                      Home Language
                    </option>
                    {homeLanguage &&
                      homeLanguage.map(({ id, language }) => (
                        <option key={id} value={Number(id)}>
                          {language}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
              <div className="col-md-4">
                <div className="mb-4">
                  <StyledLabel required>Race</StyledLabel>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    value={raceId}
                    defaultValue={raceId}
                    {...register("raceId", { required: true })}
                  >
                    {race &&
                      race.map(({ id, race }) => (
                        <option key={id} value={Number(id)}>
                          {race}
                        </option>
                      ))}
                  </select>
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
