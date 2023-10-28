import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
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
import { isValidEmail } from "../../../Util/Util";

import RadioField from "./components/RadioField";
import { kinInfoData } from "./data/kinData";
import TextField from "./components/TextField";
import { MobileField } from "./components/MobileField";

const Kin = (props: any) => {
  const { masterData, applicationData } = props?.masterData;
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();
  const error = errors["kin"] as any;
  const isNextKinVal = watch("kin.isKin");
  const Errors = errors["kin"] as any;
  const [SpData, setSpData] = useState<any>([]);

  useEffect(() => {
    const sponsorData: any = [];
    kinInfoData?.forEach((item) => {
      if (isNextKinVal === "yes") {
        sponsorData.push({ ...item, required: true });
      } else {
        sponsorData.push({ ...item, required: false });
      }
    });
    setSpData(sponsorData);
  }, [isNextKinVal]);

  useEffect(() => {
    if (!applicationData?.kin?.isActive) {
      setValue("kin.isKin", "no");
    }
  }, [applicationData?.kin?.isActive]);

  return (
    <StyledAccordion
      defaultExpanded={false}
      expanded={isNextKinVal === "yes"}
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

        <RadioField
          registerName={"kin.isKin"}
          defaultValue={
            applicationData?.kin?.isActive
              ? applicationData?.kin?.isActive
              : false
          }
          defaultChecked={
            applicationData?.kin?.isActive?.isActive
              ? applicationData?.kin?.isActive
              : false
          }
        />
      </AccordionSummary>
      <AccordionDetails>
        <div className="container-fluid">
          {isNextKinVal === "yes" && (
            <div className="row">
              {SpData?.map((element) => (
                <>
                  {element?.type === "text" && (
                    <TextField
                      element={element}
                      Errors={Errors}
                      registerName={`kin.${element?.name}`}
                    />
                  )}
                  {element?.type === "select" && (
                    <div className="col-lg-4 mb-4">
                      <CommonAutocomplete
                        options={
                          masterData[element?.key]
                            ? masterData[element?.key]
                            : element.option
                        }
                        label={element?.label}
                        registerName={`kin.${element?.name}`}
                        required={element.required}
                        defaultValue={
                          applicationData?.kin
                            ? applicationData?.kin[element?.name]
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
                      <StyledLabel required>{element?.label}</StyledLabel>
                      <input
                        className="form-control"
                        type={element.type}
                        placeholder=""
                        {...register(`kin.${element?.name}`, {
                          required: element.required,
                          validate: (value) => {
                            if (element.required) {
                              return isValidEmail(value, element.required);
                            }
                          },
                        })}
                      />
                      {error && error?.email && (
                        <div className="invalid-feedback">
                          {error?.email?.type == "validate"
                            ? element?.validateErrorMessage
                            : element?.errorMessage}
                        </div>
                      )}
                    </div>
                  )}
                  {element?.type === "mobileNumber" && (
                    <MobileField
                      element={element}
                      registerName={`kin.${element?.name}`}
                      countryCodeRegisterName={`kin.${element?.countryCodeRegisterName}`}
                      error={Errors}
                    />
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

export default Kin;
