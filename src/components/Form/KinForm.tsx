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
import {
  formOptions,
  isEmpty,
  isObjectEmpty,
  isValidEmail,
  onlyAlphabets,
} from "../../Util/Util";
import Image from "next/image";
import KinImg from "../../../public/assets/images/kin.svg";
import _ from "lodash";
import AdvanceDropDown from "../dropdown/Dropdown";
import { IOption } from "../common/types";
const KinDetails = "kin";
const isKin = `${KinDetails}.isKin`;
const fullName = `${KinDetails}.fullName`;
const relationShip = `${KinDetails}.relationship`;
const Email = `${KinDetails}.email`;
const phoneNumber = `${KinDetails}.mobileNumber`;
const mobileCountryCode = `${KinDetails}.mobileCountryCode`;
interface IKinForm {
  leadId: string;
  relationData: IOption[];
}
export const KinDetailsForm = ({ leadId, relationData }: IKinForm) => {
  const {
    setValue,
    register,
    watch,
    formState: { errors, touchedFields },
  } = useFormContext();
  const [countryCodeRef, setCountryCode] = useState<any>("SA");
  const error = errors[KinDetails] as any;
  const touchedField = touchedFields[KinDetails] as any;
  const isNextKinVal = watch(isKin);
  const fullNameVal = watch(fullName);
  const relationShipVal = watch(relationShip);
  const EmailVal = watch(Email);
  const phoneNumberVal = watch(phoneNumber);
  const isKinDetailExist = watch(KinDetails);
  const isKinNeed = isNextKinVal === "yes";

  const uppdateMobNumber = () => {
    const countryCode = getCountryCallingCode(countryCodeRef);
    setValue(`${mobileCountryCode}`, `+${countryCode}`);
  };
  useEffect(() => {
    if (!isObjectEmpty(isKinDetailExist) && leadId) {
      setValue(isKin, "yes", formOptions);
    }
  }, [isKinDetailExist]);
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
              <Image src={KinImg} alt="kin" />
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
              {...register(`${isKin}`, { required: isKinNeed })}
              value="yes"
              checked={isNextKinVal === "yes"}
            />
            <label className="form-check-label">Yes</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input me-2"
              type="radio"
              {...register(`${isKin}`, { required: isKinNeed })}
              value="no"
              checked={isNextKinVal === "no"}
            />
            <label className="form-check-label">No</label>
          </div>
        </AccordionSummary>

        <AccordionDetails hidden={!isNextKinVal || isNextKinVal === "no"}>
          <div className="container-fluid form-padding">
            <div className="row">
              <div className="col-md-4">
                <div className="mb-4">
                  <StyledLabel required>Full Name</StyledLabel>
                  <input
                    className="form-control"
                    value={fullNameVal}
                    defaultValue={fullNameVal}
                    {...register(`${fullName}`, { required: isKinNeed })}
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
                      Please enter full name
                    </div>
                  )}
                </div>
              </div>
              <div className="col-md-4">
                <div className="mb-4">
                  <AdvanceDropDown
                    options={relationData}
                    label={"RelationShip"}
                    value={relationShipVal}
                    name={relationShip}
                    register={register}
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
                  <StyledLabel required>Email</StyledLabel>
                  <input
                    className="form-control"
                    value={EmailVal}
                    defaultValue={EmailVal}
                    {...register(`${Email}`, {
                      required: isKinNeed,
                      validate: (value) => isValidEmail(value, !isKinNeed),
                    })}
                  />
                  {touchedField?.email && error?.email && (
                    <div className="invalid-feedback">
                      {error?.email?.type == "validate" &&
                        "you have entered an invalid email address. Please try again"}
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
                    {...register(`${phoneNumber}`, { required: isKinNeed })}
                    onCountryChange={(value: any) => {
                      setCountryCode(value);
                    }}
                    onBlur={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      uppdateMobNumber();
                    }}
                    onChange={(value) => {
                      setValue(`${phoneNumber}`, value, {
                        shouldDirty: true,
                        shouldValidate: true,
                      });
                    }}
                    value={phoneNumberVal}
                  />
                  {touchedField?.mobileNumber && error?.mobileNumber && (
                    <div className="invalid-feedback">
                      {error?.mobileNumber &&
                        "you have entered an invalid number"}
                    </div>
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
