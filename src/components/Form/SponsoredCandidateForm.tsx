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
import { useFormContext } from "react-hook-form";
import PhoneInput, { getCountryCallingCode } from "react-phone-number-input";
import { IOption } from "../common/types";
import {
  formOptions,
  isObjectEmpty,
  isValidEmail,
  onlyAlphabets,
} from "../../Util/Util";
import DollarIcon from "../../../public/assets/images/dollar-symbol-svgrepo-com.svg";
import Image from "next/image";
import { CommonEnums } from "../common/constant";

const SponsorCandidateDetail = "sponsor";

const sponsorMode = `${SponsorCandidateDetail}.sponsorModeCode`;
const sponsorName = `${SponsorCandidateDetail}.name`;
const sponsorEmail = `${SponsorCandidateDetail}.email`;
const sponsorAddress = `${SponsorCandidateDetail}.address`;
const sponsorPhoneNumber = `${SponsorCandidateDetail}.mobileNumber`;
const sponsorMobileCode = `${SponsorCandidateDetail}.mobileCountryCode`;
const isSponsored = `${SponsorCandidateDetail}.isSponsored`;
const relationShip = `${SponsorCandidateDetail}.relationship`;
interface ISponsorProps {
  leadId: string;
  sponsorModeArr: IOption[];
  relationData: IOption[];
}
export const SponsoredForm = (props: ISponsorProps) => {
  const { sponsorModeArr = [], relationData = [] } = { ...props };
  const {
    setValue,
    register,
    watch,
    formState: { errors, touchedFields },
  } = useFormContext();
  const [countryCodeRef, setCountryCode] = useState<any>("SA");

  const isSponsoredVal = watch(isSponsored);
  const sponsorModeVal = watch(sponsorMode);
  const sponsorNameVal = watch(sponsorName);
  const sponsorAddressVal = watch(sponsorAddress);
  const sponsorPhoneNumberVal = watch(sponsorPhoneNumber);
  const sponserEmailVal = watch(sponsorEmail);
  const relationshipVal = watch(relationShip);
  const uppdateMobNumber = () => {
    const countryCode = getCountryCallingCode(countryCodeRef);
    setValue(`${sponsorMobileCode}`, `+${countryCode}`);
  };
  const error = errors[SponsorCandidateDetail] as any;
  const touchedField = touchedFields[SponsorCandidateDetail] as any;
  const isSelfSponsored = sponsorModeVal === "SELF";
  const isSponserDetailExist = watch(SponsorCandidateDetail);
  const isSponserNeed = isSponsoredVal === "yes";
  const disablePhoneOnSelfSponser = isSelfSponsored;
  const educationFormValues = watch("education");
  const studentType = educationFormValues?.studentTypeCode;
  const isStudentAndSponsorBursary =
    studentType?.toLowerCase().includes(CommonEnums.BURSARY) &&
    sponsorModeVal?.toLowerCase() === CommonEnums.BURSARY;
  const disableSponsorForm =
    studentType?.toLowerCase() === CommonEnums.MANAGEMENT;
  useEffect(() => {
    if (
      !isObjectEmpty(isSponserDetailExist) &&
      props?.leadId &&
      isSponserDetailExist
    ) {
      setValue(isSponsored, "yes", formOptions);
    }
  }, [isSponserDetailExist]);
  const isRequired =
    sponsorModeVal?.toLowerCase() === CommonEnums.EMPLOYEE_BURSARY;
  const isGuardian = sponsorModeVal?.toLowerCase() === CommonEnums.GUARDIAN;
  const sponsorModeData =
    studentType?.toLowerCase() === CommonEnums.BURSARY
      ? sponsorModeArr.filter((item) => item.name !== "Guardian")
      : sponsorModeArr.filter((item) => item.name === "Guardian");
  return (
    <>
      <StyledAccordion>
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
              {...register(`${isSponsored}`, { required: isSponserNeed })}
              value="yes"
              checked={isSponsoredVal === "yes"}
            />
            <label className="form-check-label">Yes</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input me-2"
              type="radio"
              {...register(`${isSponsored}`, { required: isSponserNeed })}
              value="no"
              checked={isSponsoredVal === "no"}
            />
            <label className="form-check-label">No</label>
          </div>
        </AccordionSummary>
        {!disableSponsorForm && (
          <AccordionDetails hidden={!isSponsoredVal || isSponsoredVal === "no"}>
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
                </div>

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
                      {touchedField?.relationship && error?.relationship && (
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
                            required:
                              !isSelfSponsored && isSponserNeed && isRequired,
                          })}
                          onChange={(e) => {
                            const value = e.target.value;
                            const name = e.target.name;
                            if (onlyAlphabets(value)) {
                              setValue(name, value, formOptions);
                            }
                          }}
                        />
                        {touchedField?.name && error?.name && (
                          <div className="invalid-feedback">
                            Please enter sponsor name
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
                      <div className="mb-4">
                        <input
                          disabled={isSelfSponsored}
                          className="form-control"
                          aria-label="Default select example"
                          value={sponserEmailVal}
                          {...register(`${sponsorEmail}`, {
                            required:
                              !isSelfSponsored && isSponserNeed && isRequired,
                            validate: (value) =>
                              !isSponsoredVal ||
                              !isSponserNeed ||
                              isSelfSponsored
                                ? true
                                : isValidEmail(value),
                          })}
                        />
                        {touchedField?.email &&
                          error?.email &&
                          !isSelfSponsored &&
                          isSponserNeed &&
                          isRequired && (
                            <div className="invalid-feedback">
                              {error?.email?.type == "validate"
                                ? "you have entered an invalid email address. Please try again"
                                : "Please enter sponser email"}
                            </div>
                          )}
                      </div>
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
                        <PhoneInput
                          id="2"
                          international
                          {...register(`${sponsorPhoneNumber}`, {
                            required:
                              !isSelfSponsored && isSponserNeed && isRequired,
                          })}
                          countryCallingCodeEditable={false}
                          defaultCountry={countryCodeRef}
                          placeholder="Select Country Code*"
                          disabled={disablePhoneOnSelfSponser}
                          onCountryChange={(value: any) => {
                            !disablePhoneOnSelfSponser && setCountryCode(value);
                          }}
                          onBlur={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            uppdateMobNumber();
                          }}
                          onChange={(value) => {
                            setValue(`${sponsorPhoneNumber}`, value);
                          }}
                          value={sponsorPhoneNumberVal}
                        />
                        {touchedField?.sponsorMobileNumber &&
                          error?.sponsorMobileNumber && (
                            <div className="invalid-feedback">
                              Please enter phone number
                            </div>
                          )}
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="mb-4">
                        <StyledLabel required>
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
                          {...register(`${sponsorAddress}`)}
                        />
                      </div>
                    </div>{" "}
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
