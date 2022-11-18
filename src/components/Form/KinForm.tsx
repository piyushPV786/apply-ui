import React, { useEffect, useState } from "react";
import {
  GreenFormHeading,
  StyledAccordion,
  StyledLabel,
} from "../common/common";
import { AccordionDetails, AccordionSummary } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { useFormContext } from "react-hook-form";
import PhoneInput, {
  getCountryCallingCode,
  parsePhoneNumber,
} from "react-phone-number-input";
import { isValidEmail, onlyAlphabets } from "../../Util/Util";

const KinDetails = "kinDetails";
const isKin = `${KinDetails}.isKin`;
const fullName = `${KinDetails}.name`;
const relationShip = `${KinDetails}.relation`;
const Email = `${KinDetails}.email`;
const phoneNumber = `${KinDetails}.mobileNumber`;
const mobileCountryCode = `${KinDetails}.mobileCountryCode`;

export const KinDetailsForm = (props: any) => {
  const {
    setValue,
    register,
    watch,
    formState: { errors, touchedFields },
  } = useFormContext();
  const [countryCodeRef, setCountryCode] = useState<any>("SA");
  const error = errors[KinDetails] as any;
  const touchedField = touchedFields[KinDetails] as any;
  const isNextKinVal = watch(isKin, "no");
  const fullNameVal = watch(fullName);
  const relationShipVal = watch(relationShip);
  const EmailVal = watch(Email);
  const phoneNumberVal = watch(phoneNumber);

  const uppdateMobNumber = () => {
    const countryCode = getCountryCallingCode(countryCodeRef);
    setValue(`${mobileCountryCode}`, `+${countryCode}`);
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
              <img src={"/assets/images/kin.svg"} />
            </span>
            Next of Kin{" "}
            <span className="me-2 ms-1" style={{ color: "red" }}>
              *
            </span>
          </GreenFormHeading>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input me-2"
              type="radio"
              {...register(`${isKin}`, { required: true })}
              value="yes"
              checked={isNextKinVal === "yes"}
            />
            <label className="form-check-label">Yes</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input me-2"
              type="radio"
              {...register(`${isKin}`, { required: true })}
              value="no"
              checked={isNextKinVal === "no"}
            />
            <label className="form-check-label">No</label>
          </div>
        </AccordionSummary>
        {isNextKinVal === "yes" && (
          <AccordionDetails>
            <div className="container">
              <div className="row">
                <div className="col-md-4">
                  <div className="mb-4">
                    <StyledLabel required>Full Name</StyledLabel>
                    <input
                      className="form-control"
                      value={fullNameVal}
                      defaultValue={fullNameVal}
                      {...register(`${fullName}`, { required: true })}
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
                        Please enter full name
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-md-4">
                  <StyledLabel required>RelationShip</StyledLabel>
                  <div className="mb-4">
                    <input
                      className="form-control"
                      value={relationShipVal}
                      defaultValue={relationShipVal}
                      {...register(`${relationShip}`, { required: true })}
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
                    {touchedField?.relation && error?.relation && (
                      <div className="invalid-feedback">
                        Please enter relationship
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="mb-4">
                    <StyledLabel>Email</StyledLabel>
                    <input
                      className="form-control"
                      value={EmailVal}
                      defaultValue={EmailVal}
                      {...register(`${Email}`, {
                        required: true,
                        validate: isValidEmail,
                      })}
                    />
                    {touchedField?.email && error?.email && (
                      <div className="invalid-feedback">
                        {error?.email?.type == "validate"
                          ? "you have entered an invalid email address. Please try again"
                          : "Please enter email"}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4">
                  <div className="mb-4">
                    <StyledLabel required>Mobile Number</StyledLabel>
                    <PhoneInput
                      id="2"
                      international
                      countryCallingCodeEditable={false}
                      defaultCountry={countryCodeRef}
                      placeholder="Select Country Code*"
                      {...register(`${phoneNumber}`, { required: true })}
                      onCountryChange={(value: any) => {
                        setCountryCode(value);
                      }}
                      onBlur={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        uppdateMobNumber();
                      }}
                      onChange={(value) => {
                        setValue(`${phoneNumber}`, value);
                      }}
                      value={phoneNumberVal}
                    />
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
