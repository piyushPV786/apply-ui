import { useFormContext } from "react-hook-form";
import {
  GreenFormHeading,
  StyledAccordion,
  StyledLabel,
  nonMandatorySponsorFeilds,
  mandatorySponsorModeFeilds,
} from "../../common/common";
import {
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@material-ui/core";
import Image from "next/image";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DollarIcon from "../../../../public/assets/images/dollar-symbol-svgrepo-com.svg";
import { IMasterData } from "../../common/types";
import CommonAutocomplete from "./components/CommonAutocomplete ";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import TextField from "./components/TextField";
import { useAddressHook } from "../customHooks/addressHooks";
import RadioField from "./components/RadioField";
import { sponsorInfoData } from "./data/sponsorData";
import TextFieldWithSpace from "./components/TextFieldWithSpace";
import { isValidEmail, validateAddress } from "../../../Util/Util";
import { MobileField } from "./components/MobileField";
import { useEffect, useState } from "react";
import NumberField from "./components/NumberField";
import ZipCodeField from "./components/ZipCodeField";
import DateField from "./components/DateField";
import EmailField from "./components/EmailField";

const Sponsor = (props: any) => {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();
  const { masterData, applicationData, identificationType } = props?.masterData;
  const countryDetail = watch(`sponsor.country`);
  const sponsorType = watch(`sponsor.sponsorModeCode`);
  const stateDetails: any = useAddressHook(countryDetail);
  const stateList = stateDetails[countryDetail];
  const Errors = errors["sponsor"] as any;
  const [SpData, setSpData] = useState<any>([]);
  const [activeSponsor, setActiveSponsor ] = useState<string>(watch("sponsor.isSponsor"))

  useEffect(() => {
    const sponsorData: any = [];
    sponsorInfoData?.forEach((item) => {
      if (activeSponsor === "yes") {
        if (nonMandatorySponsorFeilds.includes(item?.key)) {
          sponsorData.push({ ...item, required: false });
        } else {
          sponsorData.push({ ...item, required: true });
        }
      } else {
        sponsorData.push({ ...item, required: false });
      }
    });
    setSpData(sponsorData);
  }, [activeSponsor]);

  useEffect(()=>{
    setActiveSponsor(watch("sponsor.isSponsor"))
  },[watch("sponsor.isSponsor")])
 

  useEffect(() => {
    if (applicationData?.sponsor?.[0]?.isActive) {
      setValue("sponsor.isSponsor", "yes");
      setActiveSponsor("yes")
    } else {
      setValue("sponsor.isSponsor", "no");
    }
  }, [applicationData]);

  return (
    <StyledAccordion defaultExpanded={false} expanded={activeSponsor === "yes"}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <GreenFormHeading>
          <Image alt="Dollar" src={DollarIcon} className="me-2" />
          Are you Sponsored Candidate?{" "}
          <span className="text-danger me-2">*</span>
        </GreenFormHeading>

        <RadioField
          registerName={"sponsor.isSponsor"}
          defaultValue={applicationData?.sponsor?.[0]?.isActive ? "yes" : "no"}
          defaultChecked={applicationData?.sponsor?.[0]?.isActive ? "yes" : "no"}
        />
      </AccordionSummary>
      <AccordionDetails>
        <div className="container-fluid">
          {activeSponsor === "yes" && (
            <div className="row">
              {SpData?.map((element) => (
                <>
                  {element?.type === "sponsorSelect" && (
                    <div className="col-lg-4 mb-4">
                      <CommonAutocomplete
                        options={
                          masterData[element?.key]
                            ? masterData[element?.key]?.filter((item) =>
                                mandatorySponsorModeFeilds.includes(item?.code)
                              )
                            : element.option
                        }
                        label={element?.label}
                        registerName={`sponsor.${element?.name}`}
                        required={element?.required}
                        defaultValue={
                          applicationData && applicationData?.sponsor?.length >0
                            ? applicationData?.sponsor?.[0][element?.name]
                            : null
                        }
                      />
                      {Errors && Errors[element?.name] && (
                        <div className="invalid-feedback">
                          {element?.errorMessage}
                        </div>
                      )}
                    </div>
                  )}
                  {sponsorType && (
                    <>
                      {watch("sponsor.relationshipCode") === "EMPLOYER" ? (
                        <>
                          {element?.type === "text" && (
                            <TextField
                              element={element}
                              Errors={Errors}
                              registerName={`sponsor.${element?.name}`}
                            />
                          )}

                          {element?.type === "textWithSpace" && (
                            <TextFieldWithSpace
                              element={element}
                              Errors={Errors}
                              registerName={`sponsor.${element?.name}`}
                            />
                          )}

                          {element?.type === "number" && (
                            <NumberField
                              element={element}
                              Errors={Errors}
                              registerName={`sponsor.${element?.name}`}
                            />
                          )}              
                          {element?.type === "zipCode" && (
                            <>
                              <div className="col-lg-4 mb-4">
                                <StyledLabel required>
                                  Pin Code / Zip Code
                                </StyledLabel>
                                <input
                                  className="form-control"
                                  type="text" 
                                  placeholder="Enter Zip/Postal Code"
                                  {...register(`sponsor.${element?.name}`, {
                                    required: true,
                                    maxLength: {
                                      value: 6,
                                      message: "Maximum 6 characters allowed.",
                                    },
                                    minLength: {
                                      value: 4,
                                      message: "Minimum length should be 4.",
                                    },
                                    pattern: {
                                      value: /^[0-9]*$/,
                                      message:
                                        "Only numeric values are allowed.",
                                    },
                                  })}
                                  onChange={(e) => {
                                    const numericValue = e.target.value.replace(
                                      /[^0-9]/g,
                                      ""
                                    );
                                    e.target.value = numericValue;
                                  }}
                                />
                                {Errors && Errors[element?.name] && (
                                  <div className="invalid-feedback">
                                    {Errors[element?.name]?.message}
                                  </div>
                                )}
                              </div>
                            </>
                          )}
                          {element?.type === "select" &&
                            element?.key !== "state" &&
                            element?.key !== "genderData" &&
                            element?.key !== "identificationDocumentType" && (
                              <div className="col-lg-4 mb-4">
                                <CommonAutocomplete
                                  options={
                                    masterData[element?.key]
                                      ? masterData[element?.key]
                                      : element.option
                                  }
                                  label={element?.label}
                                  registerName={`sponsor.${element?.name}`}
                                  required={element?.required}
                                  defaultValue={
                                    applicationData && applicationData?.sponsor?.length > 0
                                      ? applicationData?.sponsor?.[0][element?.name]
                                      : null
                                  }
                                />
                                {Errors && Errors[element?.name] && (
                                  <div className="invalid-feedback">
                                    {element?.errorMessage}
                                  </div>
                                )}
                              </div>
                            )}
                          {element?.type === "select" &&
                            element?.key === "state" && (
                              <div className="col-lg-4 mb-4">
                                <CommonAutocomplete
                                  options={
                                    stateList ? stateList : element.option
                                  }
                                  label={element?.label}
                                  registerName={`sponsor.${element?.name}`}
                                  required={element?.required}
                                  defaultValue={
                                    applicationData && applicationData?.sponsor?.length > 0
                                      ? applicationData?.sponsor?.[0][element?.name]
                                      : null
                                  }
                                />
                                {Errors && Errors[element?.name] && (
                                  <div className="invalid-feedback">
                                    {element?.errorMessage}
                                  </div>
                                )}
                              </div>
                            )}
                          {element?.type === "email" && (
                            <EmailField
                              element={element}
                              Errors={Errors}
                              registerName={`sponsor.${element?.name}`}
                            />
                          )}
                          {element?.type === "mobileNumber" && (
                            <MobileField
                              element={element}
                              registerName={`sponsor.${element?.name}`}
                              countryCodeRegisterName={`sponsor.${element?.countryCodeRegisterName}`}
                              error={Errors}
                            />
                          )}
                          {element?.type === "address" && (
                            <div className="col-lg-4 mb-4">
                              <StyledLabel>
                                <label className="me-2">{element?.label}</label>
                                <span className="text-danger me-2">*</span>
                              </StyledLabel>
                              <input
                                className="form-control"
                                type={element.type}
                                placeholder=""
                                {...register(`sponsor.${element?.name}`, {
                                  required: element.required,
                                  validate: (value) => validateAddress(value),
                                })}
                              />
                              {Errors && Errors?.address && (
                                <div className="invalid-feedback">
                                  {Errors?.address?.type == "validate"
                                    ? element?.validateErrorMessage
                                    : element?.errorMessage}
                                </div>
                              )}
                            </div>
                          )}
                        </>
                      ) : (
                        <>
                          {element?.type === "name" && (
                            <TextField
                              element={element}
                              Errors={Errors}
                              registerName={`sponsor.${element?.name}`}
                            />
                          )}
                          {element?.type === "text" && (
                            <TextField
                              element={element}
                              Errors={Errors}
                              registerName={`sponsor.${element?.name}`}
                            />
                          )}

                          {element?.type === "number" && (
                            <NumberField
                              element={element}
                              Errors={Errors}
                              registerName={`sponsor.${element?.name}`}
                            />
                          )}

                          {element?.type === "zipCode" && (
                             <>
                             <div className="col-lg-4 mb-4">
                               <StyledLabel required>
                                 Pin Code / Zip Code
                               </StyledLabel>
                               <input
                                 className="form-control"
                                 type="text"
                                 placeholder="Enter Zip/Postal Code"
                                 {...register(`sponsor.${element?.name}`, {
                                   required: true,
                                   maxLength: {
                                     value: 6,
                                     message: "Maximum 6 characters allowed.",
                                   },
                                   minLength: {
                                     value: 4,
                                     message: "Minimum length should be 4.",
                                   },
                                   pattern: {
                                     value: /^[0-9]*$/,
                                     message:
                                       "Only numeric values are allowed.",
                                   },
                                 })}
                                 onChange={(e) => {
                                   const numericValue = e.target.value.replace(
                                     /[^0-9]/g,
                                     ""
                                   );
                                   e.target.value = numericValue;
                                 }}
                               />
                               {Errors && Errors[element?.name] && (
                                 <div className="invalid-feedback">
                                   {Errors[element?.name]?.message}
                                 </div>
                               )}
                             </div>
                           </>
                          )}

                          {element?.type === "select" &&
                            element?.key === "identificationDocumentType" && (
                              <div className="col-lg-4 mb-4">
                                <CommonAutocomplete
                                  options={
                                    identificationType?.length
                                      ? identificationType
                                      : []
                                  }
                                  label={element?.label}
                                  registerName={`sponsor.${element?.name}`}
                                  required={element?.required}
                                  defaultValue={
                                    applicationData && applicationData?.sponsor?.length
                                      ? applicationData?.sponsor?.[0][element?.name]
                                      : null
                                  }
                                />
                                {Errors && Errors[element?.name] && (
                                  <div className="invalid-feedback">
                                    {element?.errorMessage}
                                  </div>
                                )}
                              </div>
                            )}
                          {element?.type === "select" &&
                            element?.key !== "state" &&
                            element?.key !== "identificationDocumentType" && (
                              <div className="col-lg-4 mb-4">
                                <CommonAutocomplete
                                  options={
                                    masterData[element?.key]
                                      ? masterData[element?.key]
                                      : element.option
                                  }
                                  label={element?.label}
                                  registerName={`sponsor.${element?.name}`}
                                  required={element?.required}
                                  defaultValue={
                                    applicationData && applicationData?.sponsor?.length > 0
                                      ? applicationData?.sponsor?.[0][element?.name]
                                      : null
                                  }
                                />
                                {Errors && Errors[element?.name] && (
                                  <div className="invalid-feedback">
                                    {element?.errorMessage}
                                  </div>
                                )}
                              </div>
                            )}
                          {element?.type === "select" &&
                            element?.key === "state" && (
                              <div className="col-lg-4 mb-4">
                                <CommonAutocomplete
                                  options={
                                    stateList ? stateList : element.option
                                  }
                                  label={element?.label}
                                  registerName={`sponsor.${element?.name}`}
                                  required={element?.required}
                                  defaultValue={
                                    applicationData && applicationData?.sponsor?.length>0
                                      ? applicationData?.sponsor?.[0][element?.name]
                                      : null
                                  }
                                />
                                {Errors && Errors[element?.name] && (
                                  <div className="invalid-feedback">
                                    {element?.errorMessage}
                                  </div>
                                )}
                              </div>
                            )}
                              {element?.type === "email" && (
                            <EmailField
                              element={element}
                              Errors={Errors}
                              registerName={`sponsor.${element?.name}`}
                            />
                          )}
                          {element?.type === "mobileNumber" && (
                            <MobileField
                              element={element}
                              registerName={`sponsor.${element?.name}`}
                              countryCodeRegisterName={`sponsor.${element?.countryCodeRegisterName}`}
                              error={Errors}
                            />
                          )}
                          {element?.type === "address" && (
                            <div className="col-lg-4 mb-4">
                              <StyledLabel>
                                <label className="me-2">{element?.label}</label>
                                <span className="text-danger me-2">*</span>
                              </StyledLabel>
                              <input
                                className="form-control"
                                type={element.type}
                                placeholder=""
                                {...register(`sponsor.${element?.name}`, {
                                  required: element.required,
                                  validate: (value) => validateAddress(value),
                                })}
                              />
                              {Errors && Errors?.address && (
                                <div className="invalid-feedback">
                                  {Errors?.address?.type == "validate"
                                    ? element?.validateErrorMessage
                                    : element?.errorMessage}
                                </div>
                              )}
                            </div>
                          )}
                          {element?.type === "date" && (
                            <DateField
                              defaultValue={
                                applicationData?.lead?.dateOfBirth
                                  ? new Date(applicationData?.lead?.dateOfBirth)
                                  : null
                              }
                              element={element}
                              Errors={Errors}
                              registerName={`sponsor.${element?.name}`}
                            />
                          )}
                        </>
                      )}
                    </>
                  )}
                </>
              ))}
            </div>
          )}
        </div>
      </AccordionDetails>
    </StyledAccordion>
  );
};

export default Sponsor;
