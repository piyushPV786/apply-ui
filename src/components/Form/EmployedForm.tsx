import { useState, useEffect } from "react";
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
import {
  formOptions,
  isObjectEmpty,
  onlyAlphabets,
  onlyAlphaNumericSpace,
  validateNumber,
} from "../../Util/Util";
import Image from "next/image";
import EmployeeImg from "../../../public/assets/images/employeee.svg";

const EmployementDetails = "employment";
const employmentStatus = `${EmployementDetails}.employmentStatusCode`;
const employer = `${EmployementDetails}.employer`;
const jobTitle = `${EmployementDetails}.jobTitle`;
const industry = `${EmployementDetails}.employmentIndustryCode`;
const managerName = `${EmployementDetails}.managerName`;
const officeAddress = `${EmployementDetails}.officeAddress`;
const officeNumber = `${EmployementDetails}.officeMobileNumber`;
const officePhoneCode = `${EmployementDetails}.officeMobileCountryCode`;
const isEmployed = `${EmployementDetails}.isEmployed`;
interface IEmployeProps {
  employmentStatusArr: IOption[];
  employmentIndustries: IOption[];
  leadId: string;
}
export const EmployedForm = (props: IEmployeProps) => {
  const { employmentIndustries, employmentStatusArr } = {
    ...props,
  };

  const [countryCodeRef, setCountryCode] = useState<any>("SA");

  const {
    setValue,
    register,
    watch,
    unregister,
    formState: { errors, touchedFields },
  } = useFormContext();

  const employmentStatusVal = watch(employmentStatus);
  const isEmployedVal = watch(isEmployed);
  const employerVal = watch(employer);
  const jobTitleVal = watch(jobTitle);
  const industryVal = watch(industry);
  const managerNameVal = watch(managerName);
  const officeAddressVal = watch(officeAddress);
  const officeNumberVal = watch(officeNumber);
  const isEmployerDetailExist = watch(EmployementDetails);

  const uppdateMobNumber = () => {
    const countryCode = getCountryCallingCode(countryCodeRef);
    setValue(`${officePhoneCode}`, `+${countryCode}`);
  };
  const touchField = touchedFields[EmployementDetails] as any;
  const error = errors[EmployementDetails] as any;
  const isEmployedNeed = isEmployedVal === "yes";
  const isSelfEmployed = employmentStatusVal === "SELFEMPLOYED";

  useEffect(() => {
    if (!isObjectEmpty(isEmployerDetailExist) && props?.leadId) {
      setValue(isEmployed, "yes");
    }
  }, [isEmployerDetailExist]);

  useEffect(() => {
    if (!isEmployedNeed) {
      unregister(officeNumber, {
        keepError: false,
        keepIsValid: true,
      });
    }
  }, [isEmployedNeed]);
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
              <Image src={EmployeeImg} alt="employee" />
            </span>
            Are you Employed?
            <span className="me-2 ms-1" style={{ color: "red" }}>
              *
            </span>
          </GreenFormHeading>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input me-2"
              type="radio"
              {...register(`${isEmployed}`)}
              value="yes"
              checked={isEmployedVal === "yes"}
            />
            <label className="form-check-label">Yes</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input me-2"
              type="radio"
              {...register(`${isEmployed}`)}
              value="no"
              checked={isEmployedVal === "no"}
            />
            <label className="form-check-label">No</label>
          </div>
        </AccordionSummary>
        <AccordionDetails hidden={!isEmployedVal || isEmployedVal === "no"}>
          <div className="container-fluid form-padding">
            <div className="row">
              <div className="col-md-4">
                <div className="mb-4">
                  <StyledLabel required>Employment Status</StyledLabel>
                  <select
                    value={employmentStatusVal}
                    className="form-select"
                    aria-label="Default select example"
                    {...register(`${employmentStatus}`, {
                      required: isEmployedNeed,
                    })}
                  >
                    <option value={""}>Select employment status</option>
                    {employmentStatusArr &&
                      employmentStatusArr.map(({ code, name }) => (
                        <option
                          selected={code === employmentStatusVal}
                          key={code}
                          value={code}
                        >
                          {name}
                        </option>
                      ))}
                  </select>
                  {touchField?.employmentStatusCode &&
                    error?.employmentStatusCode && (
                      <div className="invalid-feedback">
                        Please select employment status
                      </div>
                    )}
                </div>
              </div>
              {!isSelfEmployed && (
                <div className="col-md-4">
                  <StyledLabel required>Employer</StyledLabel>
                  <div className="mb-4">
                    <input
                      className="form-control"
                      {...register(`${employer}`, {
                        required: isEmployedNeed,
                      })}
                      value={employerVal}
                      defaultValue={employerVal}
                    />
                    {touchField?.employer && error?.employer && (
                      <div className="invalid-feedback">
                        Please enter employer
                      </div>
                    )}
                  </div>
                </div>
              )}
              <div className="col-md-4">
                <div className="mb-4">
                  <StyledLabel required>Job Title</StyledLabel>
                  <input
                    className="form-control"
                    value={jobTitleVal}
                    defaultValue={jobTitleVal}
                    {...register(`${jobTitle}`, {
                      required: isEmployedNeed && isSelfEmployed,
                    })}
                    onChange={(e) => {
                      const value = e.target.value;
                      const name = e.target.name;
                      if (onlyAlphaNumericSpace(value) || !value) {
                        setValue(name, value, formOptions);
                      }
                    }}
                  />
                </div>
              </div>

              <div className="col-md-4">
                <div className="mb-4">
                  <StyledLabel required>Industry</StyledLabel>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    {...register(`${industry}`, {
                      required: isEmployedNeed && isSelfEmployed,
                    })}
                  >
                    <option value={""}>Select Industry</option>
                    {employmentIndustries &&
                      employmentIndustries.map(({ code, name }) => (
                        <option
                          selected={code === industryVal}
                          key={code}
                          value={code}
                        >
                          {name}
                        </option>
                      ))}
                  </select>
                  {touchField?.employmentIndustryCode &&
                    error?.employmentIndustryCode && (
                      <div className="invalid-feedback">
                        Please select industry
                      </div>
                    )}
                </div>
              </div>
              {!isSelfEmployed && (
                <div className="col-md-4">
                  <div className="mb-4">
                    <StyledLabel required>Manager Name</StyledLabel>
                    <input
                      className="form-control"
                      value={managerNameVal}
                      defaultValue={managerNameVal}
                      {...register(`${managerName}`)}
                      onChange={(e) => {
                        const value = e.target.value;
                        const name = e.target.name;
                        if (onlyAlphabets(value)) {
                          setValue(name, value, formOptions);
                        }
                      }}
                    />
                    {touchField?.manager && error?.manager && (
                      <div className="invalid-feedback">
                        Please enter manager name
                      </div>
                    )}
                  </div>
                </div>
              )}
              {!isSelfEmployed && (
                <div className="col-md-4">
                  <div className="mb-4">
                    <StyledLabel required>Office Address</StyledLabel>
                    <input
                      className="form-control"
                      value={officeAddressVal}
                      defaultValue={officeAddressVal}
                      {...register(`${officeAddress}`)}
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="row">
              {!isSelfEmployed && (
                <div className="col-md-4">
                  <div className="mb-4">
                    <StyledLabel required>Office Number</StyledLabel>
                    <PhoneInput
                      international
                      countryCallingCodeEditable={false}
                      defaultCountry={countryCodeRef}
                      placeholder="Select Country Code*"
                      {...register(`${officeNumber}`, {
                        required: isEmployedNeed,
                        validate: () =>
                          validateNumber(officeNumberVal, countryCodeRef),
                      })}
                      onCountryChange={(value: any) => {
                        setCountryCode(value);
                      }}
                      onBlur={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        uppdateMobNumber();
                      }}
                      onChange={(value) => {
                        setValue(officeNumber, value, formOptions);
                      }}
                      value={officeNumberVal}
                    />
                    {touchField?.officeMobileNumber &&
                      error?.officeMobileNumber && (
                        <div className="invalid-feedback">
                          {error?.officeMobileNumber.type === "validate"
                            ? "you have entered an invalid number"
                            : "Please enter office number"}
                        </div>
                      )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </AccordionDetails>
      </StyledAccordion>
    </>
  );
};
