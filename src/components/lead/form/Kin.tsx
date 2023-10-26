import React, { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import {
  GreenFormHeading,
  StyledAccordion,
  StyledLabel,
} from "../../common/common";
import { AccordionDetails, AccordionSummary } from "@material-ui/core";
import Image from "next/image";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DollarIcon from "../../../../public/assets/images/dollar-symbol-svgrepo-com.svg";
import CommonAutocomplete from "./components/CommonAutocomplete ";
import { formOptions, isValidEmail, validateNumber } from "../../../Util/Util";
import PhoneInput, { getCountryCallingCode } from "react-phone-number-input";
const Kin = (props: any) => {
  const { masterData } = props?.masterData;
  const {
    register,
    watch,
    control,
    setValue,
    formState: { errors },
  } = useFormContext();
  const isKinNeed = watch("kin.isActive");
  const error = errors["kin"] as any;
  const isNextKinVal = watch("kin.isActive");
  const [countryCodeRef, setCountryCode] = useState<any>("SA");
  const updateMobNumber = () => {
    if (countryCodeRef) {
      const countryCode = getCountryCallingCode(countryCodeRef);
      setValue(`kin.mobileCountryCode`, `+${countryCode}`);
    } else {
      setValue(`kin.mobileCountryCode`, "", formOptions);
    }
  };
  return (
    <StyledAccordion
      defaultExpanded={isKinNeed === "true"}
      className="card-shadow"
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <GreenFormHeading>
          <Image alt="Dollar" src={DollarIcon} className="me-2" />
          Next of Kin? <span className="text-danger me-2">*</span>
        </GreenFormHeading>

        <input
          className="form-check-input me-2"
          type="radio"
          {...register(`kin.isActive`, { required: true })}
          value={"true"}
          checked={Boolean(isNextKinVal) === true}
        />
        <label className="form-check-label me-2">Yes</label>
        <input
          className="form-check-input me-2"
          type="radio"
          {...register(`kin.isActive`, { required: true })}
          value={"false"}
          checked={!Boolean(isNextKinVal) || Boolean(isNextKinVal) === false}
        />
        <label className="form-check-label">No</label>
      </AccordionSummary>
      <AccordionDetails>
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-4 mb-4">
              <StyledLabel required>Full Name</StyledLabel>
              <input
                className="form-control"
                type={"text"}
                placeholder="text"
                {...register("kin.fullName", { required: isKinNeed })}
              />
              {error && error?.fullName && (
                <div className="invalid-feedback">Please enter full name</div>
              )}
            </div>
            <div className="col-lg-4 mb-4">
              {!!masterData?.relationData?.length && (
                <CommonAutocomplete
                  options={masterData?.relationData}
                  label="RelationShip"
                  registerName={`kin.relationshipCode`}
                  required={isKinNeed}
                />
              )}
              {error && error?.relationship && (
                <div className="invalid-feedback">
                  Please enter relationship
                </div>
              )}
            </div>
            <div className="col-lg-4 mb-4">
              <StyledLabel required>Email</StyledLabel>
              <input
                className="form-control"
                type={"text"}
                placeholder="text"
                {...register("kin.email", {
                  required: isKinNeed,
                  validate: (value) => isValidEmail(value, !isKinNeed),
                })}
              />
              {error && error?.email && (
                <div className="invalid-feedback">
                  {error?.email?.type == "validate"
                    ? "you have entered an invalid email address. Please try again"
                    : "Please enter email"}
                </div>
              )}
            </div>
            <div className="col-md-4">
              <div className="mb-4">
                <StyledLabel required>Mobile Number</StyledLabel>
                <Controller
                  control={control}
                  name={"kin.mobileNumber"}
                  rules={{
                    required: isKinNeed ? true : false,
                    validate: {
                      validPhoneNumber: (value) => {
                        if (isKinNeed) {
                          return (
                            validateNumber(value, countryCodeRef) ||
                            "Invalid phone number"
                          );
                        }
                      },
                    },
                  }}
                  render={({ field }) => (
                    <PhoneInput
                      fullWidth
                      {...field}
                      id="2"
                      international
                      countryCallingCodeEditable={false}
                      defaultCountry={countryCodeRef}
                      placeholder="Select Country Code*"
                      onCountryChange={(value: any) => {
                        setCountryCode(value);
                      }}
                      onBlur={() => {
                        field.onBlur();
                        updateMobNumber();
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
          </div>
        </div>
      </AccordionDetails>
    </StyledAccordion>
  );
};

export default Kin;
