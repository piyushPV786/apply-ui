import { useState, useEffect } from "react";
import {
  GreenFormHeading,
  StyledAccordion,
  StyledLabel,
} from "../common/common";
import { AccordionDetails, AccordionSummary } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Controller, useFormContext } from "react-hook-form";
import PhoneInput, { getCountryCallingCode } from "react-phone-number-input";
import {
  formOptions,
  isObjectEmpty,
  isValidEmail,
  onlyAlphabets,
  validateNumber,
  capitalizeFirstLetter,
} from "../../Util/Util";
import Image from "next/image";
import KinImg from "../../../public/assets/images/kin.svg";
import AdvanceDropDown from "../dropdown/Dropdown";
import { IOption } from "../common/types";
const KinDetails = "kin";
export const isKin = `${KinDetails}.isKin`;
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
    unregister,
    control,
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
    if (countryCodeRef) {
      const countryCode = getCountryCallingCode(countryCodeRef);
      setValue(`${mobileCountryCode}`, `+${countryCode}`);
    } else {
      setValue(`${mobileCountryCode}`, "", formOptions);
    }
  };
  useEffect(() => {
    if (!leadId) {
      const userNumberDetail = JSON.parse(
        sessionStorage.getItem("studentMobile") as any
      );
      setCountryCode(userNumberDetail?.countryCode);
    }
    // if (!isObjectEmpty(isKinDetailExist) && leadId) {
    //   setValue(isKin, "yes", formOptions);
    // }
  }, [isKinDetailExist]);

  useEffect(() => {
    if (phoneNumberVal) {
      if (!isKinNeed) {
        unregister(phoneNumber, {
          keepError: false,
          keepIsValid: true,
          keepValue: true,
        });
      }
    } else {
      if (!isKinNeed) {
        unregister(phoneNumber, {
          keepError: false,
          keepIsValid: true,
          keepDefaultValue: true,
        });
      }
    }
  }, [isKinDetailExist, error]);

  const reset = () => {
    setValue(fullName, "");
    setValue(relationShip, "");
    setValue(Email, "");
    setValue(phoneNumber, "");
    setValue(mobileCountryCode, "");
  };

  return (
    <>
      <StyledAccordion defaultExpanded={isKinNeed}>
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
              onClick={() => {
                reset();
              }}
              checked={!isNextKinVal || isNextKinVal === "no"}
            />
            <label className="form-check-label">No</label>
          </div>
        </AccordionSummary>

        <AccordionDetails hidden={!isNextKinVal || isNextKinVal === "no"}>
          {(isNextKinVal || isNextKinVal !== "no") && (
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
                          setValue(
                            name,
                            capitalizeFirstLetter(value),
                            formOptions
                          );
                        }
                      }}
                    />
                    {error && error?.fullName && (
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
                      label={"Relationship"}
                      value={relationShipVal}
                      name={relationShip}
                      register={register}
                      required={isKinNeed}
                    />
                    {error && error?.relationship && (
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
                      onChange={(e) => {
                        const value = e.target.value;
                        const name = e.target.name;

                        setValue(name, value, formOptions);
                      }}
                    />
                    {error && error?.email && (
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
                    <Controller
                      control={control}
                      name={phoneNumber}
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
                            uppdateMobNumber();
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
          )}
        </AccordionDetails>
      </StyledAccordion>
    </>
  );
};
