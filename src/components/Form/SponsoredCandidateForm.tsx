import React, { useState, useEffect } from "react";
import {
  GreenFormHeading,
  StyledAccordion,
  StyledLabel,
} from "../common/common";
import { AccordionDetails, AccordionSummary } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { useFormContext } from "react-hook-form";
import PhoneInput, { getCountryCallingCode } from "react-phone-number-input";
import { IOption } from "../common/types";
import { isValidEmail, onlyAlphabets } from "../../Util/Util";
import DollarIcon from "../../../public/assets/images/dollar-symbol-svgrepo-com.svg";
import Image from "next/image";

const SponsorCandidateDetail = "sponser";

const sponsorMode = `${SponsorCandidateDetail}.sponsorModeCode`;
const sponsorName = `${SponsorCandidateDetail}.name`;
const sponsorEmail = `${SponsorCandidateDetail}.email`;
const sponsorAddress = `${SponsorCandidateDetail}.address`;
const sponsorPhoneNumber = `${SponsorCandidateDetail}.mobileNumber`;
const sponsorMobileCode = `${SponsorCandidateDetail}.mobileCountryCode`;
const isSponsored = `${SponsorCandidateDetail}.isSponsored`;
interface ISponsorProps {
  leadId: string;
  sponsorModeArr: IOption[];
}
export const SponsoredForm = (props: ISponsorProps) => {
  const { sponsorModeArr } = { ...props };
  const {
    setValue,
    register,
    watch,
    formState: { errors, touchedFields },
  } = useFormContext();
  const [countryCodeRef, setCountryCode] = useState<any>("SA");

  const isSponsoredVal = watch(isSponsored, "no");
  const sponsorModeVal = watch(sponsorMode);
  const sponsorNameVal = watch(sponsorName);
  const sponsorAddressVal = watch(sponsorAddress);
  const sponsorPhoneNumberVal = watch(sponsorPhoneNumber);
  const sponserEmailVal = watch(sponsorEmail);
  const uppdateMobNumber = () => {
    const countryCode = getCountryCallingCode(countryCodeRef);
    setValue(`${sponsorMobileCode}`, `+${countryCode}`);
  };
  const error = errors[SponsorCandidateDetail] as any;
  const touchedField = touchedFields[SponsorCandidateDetail] as any;
  const isSelfSponsored = sponsorModeVal === "SELF";
  const isSponserDetailExist = watch(SponsorCandidateDetail);
  const isSponserNeed = isSponsoredVal === "yes";
  useEffect(() => {
    if (isSponserDetailExist && props?.leadId) {
      setValue(isSponsored, "yes");
    }
  }, [isSponserDetailExist]);
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
        <AccordionDetails hidden={isSponsoredVal === "no"}>
          <div className="container">
            <div className="row">
              <div className="col-md-4">
                <div className="mb-4">
                  <StyledLabel required>Sponsor Mode</StyledLabel>
                  <select
                    value={sponsorModeVal}
                    className="form-select"
                    aria-label="Default select example"
                    {...register(`${sponsorMode}`, { required: isSponserNeed })}
                  >
                    <option value={""}>Select Sponsor mode</option>

                    {sponsorModeArr &&
                      sponsorModeArr.map(({ code, name }) => (
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
              <div className="col-md-4">
                <StyledLabel required>Sponsor Name</StyledLabel>
                <div className="mb-4">
                  <input
                    disabled={isSelfSponsored}
                    className="form-control"
                    aria-label="Default select example"
                    value={sponsorNameVal}
                    defaultValue={sponsorNameVal}
                    {...register(`${sponsorName}`, {
                      required: !isSelfSponsored && isSponserNeed,
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
                  />
                  {touchedField?.name && error?.name && (
                    <div className="invalid-feedback">
                      Please enter sponsor name
                    </div>
                  )}
                </div>
              </div>
              <div className="col-md-4">
                <StyledLabel required>Sponsor Email</StyledLabel>
                <div className="mb-4">
                  <input
                    disabled={isSelfSponsored}
                    className="form-control"
                    aria-label="Default select example"
                    value={sponserEmailVal}
                    {...register(`${sponsorEmail}`, {
                      required: !isSelfSponsored && isSponserNeed,
                      validate: (value) => isValidEmail(value, !isSponserNeed),
                    })}
                  />
                  {touchedField?.email && error?.email && (
                    <div className="invalid-feedback">
                      {error?.email?.type == "validate"
                        ? "you have entered an invalid email address. Please try again"
                        : "Please enter sponser email"}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <div className="mb-4">
                  <StyledLabel required>Phone Number</StyledLabel>
                  <PhoneInput
                    id="2"
                    international
                    {...register(`${sponsorPhoneNumber}`, {
                      required: !isSelfSponsored && isSponserNeed,
                    })}
                    countryCallingCodeEditable={false}
                    defaultCountry={countryCodeRef}
                    placeholder="Select Country Code*"
                    onCountryChange={(value: any) => {
                      setCountryCode(value);
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
                  <StyledLabel required>Sponsor Address</StyledLabel>
                  <input
                    disabled={isSelfSponsored}
                    className="form-control"
                    value={sponsorAddressVal}
                    defaultValue={sponsorAddressVal}
                    {...register(`${sponsorAddress}`)}
                  />
                </div>
              </div>
            </div>
          </div>
        </AccordionDetails>
      </StyledAccordion>
    </>
  );
};
