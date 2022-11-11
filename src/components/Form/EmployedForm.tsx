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
import { EmploymentIndustry, EmploymentStatus } from "../common/types";

const EmployementDetails = "employment";
const employmentStatus = `${EmployementDetails}.employmentStatusId`;
const employer = `${EmployementDetails}.employer`;
const jobTitle = `${EmployementDetails}.jobTitle`;
const industry = `${EmployementDetails}.industryId`;
const managerName = `${EmployementDetails}.manager`;
const officeAddress = `${EmployementDetails}.officeAddress`;
const officeNumber = `${EmployementDetails}.officePhoneNumber`;
const officePhoneCode = `${EmployementDetails}.officePhoneCode`;
const isEmployed = `${EmployementDetails}.isEmployed`;
interface IEmployeProps {
  employmentStatusArr: EmploymentStatus[];
  employerArr: any[];
  employmentIndustries: EmploymentIndustry[];
}
export const EmployedForm = (props: IEmployeProps) => {
  const { employerArr, employmentIndustries, employmentStatusArr } = {
    ...props,
  };

  const [countryCodeRef, setCountryCode] = useState<any>("SA");

  const { setValue, register, watch } = useFormContext();

  const employmentStatusVal = watch(employmentStatus);
  const isEmployedVal = watch(isEmployed, "no");
  const employerVal = watch(employer);
  const jobTitleVal = watch(jobTitle);
  const industryVal = watch(industry);
  const managerNameVal = watch(managerName);
  const officeAddressVal = watch(officeAddress);
  const officeNumberVal = watch(officeNumber);

  const uppdateMobNumber = () => {
    const countryCode = getCountryCallingCode(countryCodeRef);
    setValue(`${officePhoneCode}`, `+${countryCode}`);
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
              <img src={"/assets/images/employeee.svg"} />
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
              {...register(`${isEmployed}`, { required: true })}
              value="yes"
              checked={isEmployedVal === "yes"}
            />
            <label className="form-check-label">Yes</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input me-2"
              type="radio"
              {...register(`${isEmployed}`, { required: true })}
              value="no"
              checked={isEmployedVal === "no"}
            />
            <label className="form-check-label">No</label>
          </div>
        </AccordionSummary>
        {isEmployedVal === "yes" && (
          <AccordionDetails>
            <div className="container">
              <div className="row">
                <div className="col-md-4">
                  <div className="mb-4">
                    <StyledLabel required>Employment Status</StyledLabel>
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      {...register(`${employmentStatus}`, { required: true })}
                    >
                      {employmentStatusArr &&
                        employmentStatusArr.map(({ id, status }) => (
                          <option
                            selected={id === employmentStatusVal}
                            key={id}
                            value={Number(id)}
                          >
                            {status}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
                <div className="col-md-4">
                  <StyledLabel required>Employer</StyledLabel>
                  <div className="mb-4">
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      value={employerVal}
                      defaultValue={employerVal}
                      {...register(`${employer}`, { required: true })}
                    >
                      {employerArr &&
                        employerArr.map(({ id, employer }) => (
                          <option
                            selected={id === employerVal}
                            key={id}
                            value={Number(id)}
                          >
                            {employer}
                          </option>
                        ))}
                      <option value={123}>Test</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="mb-4">
                    <StyledLabel>Job Title</StyledLabel>
                    <input
                      className="form-control"
                      value={jobTitleVal}
                      defaultValue={jobTitleVal}
                      {...register(`${jobTitle}`)}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4">
                  <div className="mb-4">
                    <StyledLabel required>Industry</StyledLabel>
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      {...register(`${industry}`, { required: true })}
                    >
                      {employmentIndustries &&
                        employmentIndustries.map(({ id, industry }) => (
                          <option
                            selected={id === industryVal}
                            key={id}
                            value={Number(id)}
                          >
                            {industry}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="mb-4">
                    <StyledLabel required>Manager Name</StyledLabel>
                    <input
                      className="form-control"
                      value={managerNameVal}
                      defaultValue={managerNameVal}
                      {...register(`${managerName}`)}
                    />
                  </div>
                </div>
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
              </div>
              <div className="row">
                <div className="col-md-4">
                  <div className="mb-4">
                    <StyledLabel required>Office Number</StyledLabel>
                    <PhoneInput
                      international
                      countryCallingCodeEditable={false}
                      defaultCountry={countryCodeRef}
                      placeholder="Select Country Code*"
                      {...register(`${officeNumber}`, { required: true })}
                      onCountryChange={(value: any) => {
                        setCountryCode(value);
                      }}
                      onBlur={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        uppdateMobNumber();
                      }}
                      onChange={(value) => {
                        setValue(`${officeNumber}`, value);
                      }}
                      value={officeNumberVal}
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
