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
import { IOption } from "../common/types";
import AdvanceDropDown from "../dropdown/Dropdown";
import {
  formDirtyState,
  isObjectEmpty,
  onlyAlphabets,
  onlyAlphaNumericSpace,
  capitalizeFirstLetter,
  validateNumber,
  sortAscending,
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
export const isEmployed = `${EmployementDetails}.isEmployment`;
const employmentCountry = `${EmployementDetails}.country`;
const employmentCity = `${EmployementDetails}.city`;
const employmentPinCode = `${EmployementDetails}.zipCode`;
const employmentState = `${EmployementDetails}.state`;
interface IEmployeProps {
  employmentStatusArr: IOption[];
  employmentIndustries: IOption[];
  leadId: string;
  countryData: any;
  getStateData: any;
  employedStateData: any;
}
export const EmployedForm = (props: IEmployeProps) => {
  const {
    employmentIndustries,
    employmentStatusArr,
    countryData = [],
    getStateData,
    employedStateData,
  } = {
    ...props,
  };
  const CountryData = countryData;
  const [countryCodeRef, setCountryCode] = useState<any>();

  const {
    setValue,
    register,
    watch,
    unregister,
    control,
    formState: { errors, touchedFields },
  } = useFormContext();

  const employmentStatusVal = watch(employmentStatus);
  const isEmployedVal = watch(isEmployed);
  const employmentCountryVal = watch(employmentCountry);
  const employmentPinCodeVal = watch(employmentPinCode);
  const employmentStateVal = watch(employmentState);
  const employmentCityVal = watch(employmentCity);
  const employerVal = watch(employer);
  const jobTitleVal = watch(jobTitle);
  const industryVal = watch(industry);
  const managerNameVal = watch(managerName);
  const officeAddressVal = watch(officeAddress);
  const officeNumberVal = watch(officeNumber);
  const isEmployerDetailExist = watch(EmployementDetails);

  useEffect(() => {
    const userNumberDetail = JSON.parse(
      sessionStorage.getItem("studentMobile") as string
    );

    setCountryCode(userNumberDetail?.countryCode);
    if (employmentCountryVal) {
      getStateData(employmentCountryVal, "EMPLOYED");
    }
  }, []);

  const uppdateMobNumber = () => {
    if (countryCodeRef) {
      const countryCode = getCountryCallingCode(countryCodeRef);
      setValue(`${officePhoneCode}`, `+${countryCode}`);
    } else {
      setValue(`${officePhoneCode}`, "", formDirtyState);
    }
  };
  const touchField = touchedFields[EmployementDetails] as any;
  const error = errors[EmployementDetails] as any;
  const isEmployedNeed = isEmployedVal === "yes";
  const isSelfEmployed = employmentStatusVal === "SELFEMPLOYED";

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
      <StyledAccordion defaultExpanded={isEmployedNeed}>
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
              onFocus={(e) => {
                if (e.target.checked) {
                  unregister(`${employmentCountry}`, {
                    keepDefaultValue: true,
                    keepIsValid: true,
                    keepValue: true,
                  });
                }
              }}
            />
            <label className="form-check-label">No</label>
          </div>
        </AccordionSummary>
        {isEmployedVal === "yes" && (
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
                    {error && error?.employmentStatusCode && (
                      <div className="invalid-feedback">
                        Please select employment status
                      </div>
                    )}
                  </div>
                </div>

                {employmentStatusVal !== "" && (
                  <>
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
                            onChange={(e) => {
                              const value = e.target.value;
                              const name = e.target.name;
                              if (onlyAlphabets(value)) {
                                setValue(
                                  name,
                                  capitalizeFirstLetter(value),
                                  formDirtyState
                                );
                              }
                            }}
                          />
                          {error && error?.employer && (
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
                            required: isEmployedNeed,
                          })}
                          onChange={(e) => {
                            const value = e.target.value;
                            const name = e.target.name;
                            if (onlyAlphaNumericSpace(value) || !value) {
                              setValue(
                                name,
                                capitalizeFirstLetter(value),
                                formDirtyState
                              );
                            }
                          }}
                        />
                        {error && error?.jobTitle && (
                          <div className="invalid-feedback">
                            Please enter Job Title
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="col-md-4">
                      <div className="mb-4">
                        <StyledLabel required>Industry</StyledLabel>
                        <select
                          className="form-select"
                          aria-label="Default select example"
                          {...register(`${industry}`, {
                            required: isEmployedNeed,
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
                        {error && error?.employmentIndustryCode && (
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
                            {...register(`${managerName}`, { required: true })}
                            onChange={(e) => {
                              const value = e.target.value;
                              const name = e.target.name;
                              if (onlyAlphabets(value)) {
                                setValue(
                                  name,
                                  capitalizeFirstLetter(value),
                                  formDirtyState
                                );
                              }
                            }}
                          />
                          {error && error?.managerName && (
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
                            {...register(`${officeAddress}`, {
                              required: true,
                            })}
                            onChange={(e) => {
                              const name = e.target.name;
                              const value = e.target.value;
                              setValue(
                                name,
                                capitalizeFirstLetter(value),
                                formDirtyState
                              );
                            }}
                          />
                          {error && error?.officeAddress && (
                            <div className="invalid-feedback">
                              Please enter Office Address
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                    {!isSelfEmployed && (
                      <div className="col-md-4">
                        <div className="mb-4">
                          <StyledLabel required>Office Number</StyledLabel>
                          <Controller
                            control={control}
                            name={officeNumber}
                            rules={{
                              required: isEmployedNeed,
                              validate: (value) => {
                                if (isEmployedNeed) {
                                  return (
                                    validateNumber(value, countryCodeRef) ||
                                    "Invalid phone number"
                                  );
                                }
                              },
                            }}
                            render={({ field }) => (
                              <PhoneInput
                                {...field}
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

                          {error && error?.officeMobileNumber && (
                            <div className="invalid-feedback">
                              {error?.officeMobileNumber.type === "validate"
                                ? "you have entered an invalid number"
                                : "Please enter office number"}
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {!isSelfEmployed && isEmployedVal === "yes" && (
                      <div className="col-md-4">
                        <div className="mb-4">
                          <AdvanceDropDown
                            value={employmentCountryVal}
                            options={CountryData.sort((a, b) =>
                              sortAscending(a, b, "name")
                            )}
                            required={true}
                            register={register}
                            mapKey="code"
                            name={employmentCountry}
                            onChange={(e: any) => {
                              const value = e.target.value;
                              getStateData(value, "EMPLOYED");
                              setValue(
                                employmentCountry,
                                value,
                                formDirtyState
                              );
                            }}
                            label="Country"
                          />

                          {error && error?.country && (
                            <div className="invalid-feedback">
                              Please select Country
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {!isSelfEmployed && (
                      <div className="col-md-4">
                        <div className="mb-4">
                          <AdvanceDropDown
                            value={employmentStateVal}
                            options={employedStateData.sort((a, b) =>
                              sortAscending(a, b, "name")
                            )}
                            register={register}
                            mapKey="ioscode"
                            name={employmentState}
                            onChange={(e) => {
                              const value = e.target.value;
                              const name = e.target.name;
                              if (onlyAlphabets(value)) {
                                setValue(
                                  name,
                                  capitalizeFirstLetter(value),
                                  formDirtyState
                                );
                              }
                            }}
                            label="State/Provinces"
                          />

                          {error && error?.state && (
                            <div className="invalid-feedback">
                              Please enter State Name
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {!isSelfEmployed && (
                      <div className="col-md-4">
                        <div className="mb-4">
                          <StyledLabel required> City</StyledLabel>
                          <input
                            className="form-control"
                            value={employmentCityVal}
                            defaultValue={employmentCityVal}
                            {...register(`${employmentCity}`, {
                              required: true,
                            })}
                            onChange={(e) => {
                              const value = e.target.value;
                              const name = e.target.name;
                              if (onlyAlphabets(value)) {
                                setValue(
                                  name,
                                  capitalizeFirstLetter(value),
                                  formDirtyState
                                );
                              }
                            }}
                          />
                          {error && error?.city && (
                            <div className="invalid-feedback">
                              Please enter City Name
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {!isSelfEmployed && (
                      <div className="col-md-4">
                        <div className="mb-4">
                          <StyledLabel required>
                            {" "}
                            Pin Code / Zip Code
                          </StyledLabel>
                          <input
                            className="form-control"
                            value={employmentPinCodeVal}
                            defaultValue={employmentPinCodeVal}
                            {...register(`${employmentPinCode}`, {
                              required: true,
                              maxLength: 10,
                              minLength: 4,
                            })}
                            type="number"
                          />
                          {error?.zipCode && (
                            <div className="invalid-feedback">
                              {error?.zipCode?.type === "maxLength"
                                ? "Max length exceeded"
                                : error?.zipcode?.type === "minLength"
                                ? "Minimum length should be 4"
                                : "Please enter Zip/Postal Code"}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
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
