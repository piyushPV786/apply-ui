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

const Sponsor = (props: any) => {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();
  const { masterData, applicationData } = props?.masterData;
  const activeSponsor = watch("sponsor.isSponsor");
  const countryDetail = watch(`sponsor.country`);
  const sponsorType = watch(`sponsor.sponsorModeCode`);
  const stateDetails: any = useAddressHook(countryDetail);
  const stateList = stateDetails[countryDetail];
  const Errors = errors["sponsor"] as any;
  const [SpData, setSpData] = useState<any>([]);

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

  useEffect(() => {
    if (applicationData?.sponsor?.isActive) {
      setValue("sponsor.isSponsor", "yes");
    } else {
      setValue("sponsor.isSponsor", "no");
    }
  }, [applicationData]);

  return (
    <StyledAccordion
      defaultExpanded={false}
      expanded={activeSponsor === "yes" || applicationData?.sponsor?.isActive}
    >
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
          defaultValue={applicationData?.sponsor?.isActive ? "yes" : "no"}
          defaultChecked={applicationData?.sponsor?.isActive ? "yes" : "no"}
        />
      </AccordionSummary>
      <AccordionDetails>
        <div className="container-fluid">
          {(activeSponsor === "yes" || applicationData?.sponsor?.isActive) && (
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
                          applicationData && applicationData?.sponsor
                            ? applicationData?.sponsor[element?.name]
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
                        <ZipCodeField
                          element={element}
                          Errors={Errors}
                          registerName={`sponsor.${element?.name}`}
                        />
                      )}

                      {element?.type === "select" &&
                        element?.key !== "state" && (
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
                                applicationData && applicationData?.sponsor
                                  ? applicationData?.sponsor[element?.name]
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
                              options={stateList ? stateList : element.option}
                              label={element?.label}
                              registerName={`sponsor.${element?.name}`}
                              required={element?.required}
                              defaultValue={
                                applicationData && applicationData?.sponsor
                                  ? applicationData?.sponsor[element?.name]
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
                        <div className="col-lg-4 mb-4">
                          <StyledLabel>{element?.label}</StyledLabel>
                          <input
                            className="form-control"
                            type={element.type}
                            placeholder=""
                            {...register(`sponsor.${element?.name}`, {
                              required: element.required,
                              validate: (value) => isValidEmail(value),
                            })}
                          />
                          {Errors && Errors?.email && (
                            <div className="invalid-feedback">
                              {Errors?.email?.type == "validate"
                                ? element?.validateErrorMessage
                                : element?.errorMessage}
                            </div>
                          )}
                        </div>
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
