import React, { useEffect, useRef, useState } from "react";
import {
  GreenFormHeading,
  StyledAccordion,
  StyledLabel,
} from "../common/common";
import { AccordionDetails, AccordionSummary } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { useFormContext } from "react-hook-form";
import PhoneInput, { getCountryCallingCode } from "react-phone-number-input";
import { Mode } from "../common/types";
import { onlyAlphabets } from "../../Util/Util";

const SponsorCandidateDetail = "sponsor";

const sponsorMode = `${SponsorCandidateDetail}.sponsorModeId`;
const sponsorName = `${SponsorCandidateDetail}.name`;
const sponsorAddress = `${SponsorCandidateDetail}.sponsorAddress`;
const sponsorPhoneNumber = `${SponsorCandidateDetail}.sponsorMobileNumber`;
const sponsorMobileCode = `${SponsorCandidateDetail}.sponsorMobileCode`;
const isSponsored = `${SponsorCandidateDetail}.isSponsored`;
interface ISponsorProps {
  sponsorModeArr: Mode[];
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
  const uppdateMobNumber = () => {
    const countryCode = getCountryCallingCode(countryCodeRef);
    setValue(`${sponsorMobileCode}`, `+${countryCode}`);
  };
  const error = errors[SponsorCandidateDetail] as any;
  const touchedField = touchedFields[SponsorCandidateDetail] as any;
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
              <img src={"/assets/images/dollar-symbol-svgrepo-com.svg"} />
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
              {...register(`${isSponsored}`, { required: true })}
              value="yes"
              checked={isSponsoredVal === "yes"}
            />
            <label className="form-check-label">Yes</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input me-2"
              type="radio"
              {...register(`${isSponsored}`, { required: true })}
              value="no"
              checked={isSponsoredVal === "no"}
            />
            <label className="form-check-label">No</label>
          </div>
        </AccordionSummary>
        {isSponsoredVal === "yes" && (
          <AccordionDetails>
            <div className="container">
              <div className="row">
                <div className="col-md-4">
                  <div className="mb-4">
                    <StyledLabel required>Sponsor Mode</StyledLabel>
                    <select
                      value={sponsorModeVal}
                      className="form-select"
                      aria-label="Default select example"
                      {...register(`${sponsorMode}`, { required: true })}
                    >
                      <option value={""}>Select sonsor mode</option>

                      {sponsorModeArr &&
                        sponsorModeArr.map(({ id, mode }) => (
                          <option
                            selected={id === sponsorModeVal}
                            value={Number(id)}
                          >
                            {mode}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
                <div className="col-md-4">
                  <StyledLabel required>Sponsor Name</StyledLabel>
                  <div className="mb-4">
                    <input
                      className="form-control"
                      aria-label="Default select example"
                      value={sponsorNameVal}
                      defaultValue={sponsorNameVal}
                      {...register(`${sponsorName}`, { required: true })}
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
                  <div className="mb-4">
                    <StyledLabel>Sponsor Address</StyledLabel>
                    <input
                      className="form-control"
                      value={sponsorAddressVal}
                      defaultValue={sponsorAddressVal}
                      {...register(`${sponsorAddress}`)}
                    />
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
                      {...register(`${sponsorPhoneNumber}`, { required: true })}
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
                      {touchedField?.sponsorMobileNumber && error?.sponsorMobileNumber && (
                      <div className="invalid-feedback">
                        Please enter phone number
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </AccordionDetails>
        )}
      </StyledAccordion>
    </>
  );
};
