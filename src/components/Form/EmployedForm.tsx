import { useState } from "react";
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
import { onlyAlphabets, onlyAlphaNumeric } from "../../Util/Util";
import Image from "next/image";
import EmployeeImg from "../../../public/assets/images/employeee.svg";

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
  employmentStatusArr: IOption[];
  employerArr: any[];
  employmentIndustries: IOption[];
}
export const EmployedForm = (props: IEmployeProps) => {
  const { employerArr, employmentIndustries, employmentStatusArr } = {
    ...props,
  };

  const [countryCodeRef, setCountryCode] = useState<any>("SA");

  const {
    setValue,
    register,
    watch,
    formState: { errors, touchedFields },
  } = useFormContext();

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
  const touchField = touchedFields[EmployementDetails] as any;
  const error = errors[EmployementDetails] as any;
  const isOtherFieldRequired =
    employmentStatusArr &&
    employmentStatusArr.find((item) => item?.id == employmentStatusVal)
      ?.name === "Employed";

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
              {...register(`${isEmployed}`, { required: isOtherFieldRequired })}
              value="yes"
              checked={isEmployedVal === "yes"}
            />
            <label className="form-check-label">Yes</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input me-2"
              type="radio"
              {...register(`${isEmployed}`, { required: isOtherFieldRequired })}
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
                      value={employmentStatusVal}
                      className="form-select"
                      aria-label="Default select example"
                      {...register(`${employmentStatus}`, { required: true })}
                    >
                      <option value={""}>Select employment status</option>
                      {employmentStatusArr &&
                        employmentStatusArr.map(({ id, name }) => (
                          <option
                            selected={id === employmentStatusVal}
                            key={id}
                            value={Number(id)}
                          >
                            {name}
                          </option>
                        ))}
                    </select>
                    {touchField?.employmentStatusId &&
                      error?.employmentStatusId && (
                        <div className="invalid-feedback">
                          Please select employment status
                        </div>
                      )}
                  </div>
                </div>
                <div className="col-md-4">
                  <StyledLabel required={isOtherFieldRequired}>
                    Employer
                  </StyledLabel>
                  <div className="mb-4">
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      value={employerVal}
                      {...register(`${employer}`, {
                        required: isOtherFieldRequired,
                      })}
                    >
                      <option value={""}>Select Employer</option>

                      {employerArr &&
                        employerArr.map(({ id, name }) => (
                          <option
                            selected={id === employerVal}
                            key={id}
                            value={Number(id)}
                          >
                            {name}
                          </option>
                        ))}
                      <option value={123}>Test</option>
                    </select>
                    {touchField?.employer && error?.employer && (
                      <div className="invalid-feedback">
                        Please select employer
                      </div>
                    )}
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
                      onChange={(e) => {
                        const value = e.target.value;
                        const name = e.target.name;
                        if (onlyAlphaNumeric(value) || !value) {
                          setValue(name, value, {
                            shouldDirty: true,
                            shouldTouch: true,
                            shouldValidate: true,
                          });
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4">
                  <div className="mb-4">
                    <StyledLabel required={isOtherFieldRequired}>
                      Industry
                    </StyledLabel>
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      {...register(`${industry}`, {
                        required: isOtherFieldRequired,
                      })}
                    >
                      <option value={""}>Select Industry</option>
                      {employmentIndustries &&
                        employmentIndustries.map(({ id, name }) => (
                          <option
                            selected={id === industryVal}
                            key={id}
                            value={Number(id)}
                          >
                            {name}
                          </option>
                        ))}
                    </select>
                    {touchField?.industryId && error?.industryId && (
                      <div className="invalid-feedback">
                        Please select industry
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="mb-4">
                    <StyledLabel required={isOtherFieldRequired}>
                      Manager Name
                    </StyledLabel>
                    <input
                      className="form-control"
                      value={managerNameVal}
                      defaultValue={managerNameVal}
                      {...register(`${managerName}`)}
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
                    {touchField?.manager && error?.manager && (
                      <div className="invalid-feedback">
                        Please enter manager name
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="mb-4">
                    <StyledLabel>Office Address</StyledLabel>
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
                    <StyledLabel required={isOtherFieldRequired}>
                      Office Number
                    </StyledLabel>
                    <PhoneInput
                      international
                      countryCallingCodeEditable={false}
                      defaultCountry={countryCodeRef}
                      placeholder="Select Country Code*"
                      {...register(`${officeNumber}`, {
                        required: isOtherFieldRequired,
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
                        setValue(`${officeNumber}`, value);
                      }}
                      value={officeNumberVal}
                    />
                    {touchField?.officePhoneNumber &&
                      error?.officePhoneNumber && (
                        <div className="invalid-feedback">
                          Please enter office number
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
