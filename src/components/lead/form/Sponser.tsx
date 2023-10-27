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
import { IMasterData } from "../../common/types";
import CommonAutocomplete from "./components/CommonAutocomplete ";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { useAddressHook } from "../customHooks/addressHooks";
import RadioField from "./components/RadioField";
import { sponsorInfoData } from "./data/sponsorData";
import TextField from "./components/TextField";
import { isValidEmail } from "../../../Util/Util";
import { MobileField } from "./components/MobileField";
import { useEffect, useState } from "react";

const Sponsor = (props: any) => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();
  const { masterData, applicationData } = props?.masterData;
  const activeSponsor = watch("sponsor.isActive");
  const countryDetail = watch(`sponsor.country`);
  const stateDetails: any = useAddressHook(countryDetail);
  const stateList = stateDetails[countryDetail];
  const Errors = errors["sponsor"] as any;
  const [SpData, setSpData] = useState<any>([]);

  useEffect(() => {
    const sponsorData: any = [];
    sponsorInfoData?.forEach((item) => {
      if (activeSponsor === "true" || activeSponsor === true) {
        sponsorData.push({ ...item, required: true });
      } else {
        sponsorData.push({ ...item, required: false });
      }
    });
    setSpData(sponsorData);
  }, [activeSponsor]);
  return (
    <StyledAccordion
      defaultExpanded={false}
      expanded={activeSponsor === "true" || activeSponsor === true}
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
          registerName={"sponsor.isActive"}
          defaultValue={
            applicationData?.sponsor?.isActive
              ? applicationData?.sponsor?.isActive
              : false
          }
          defaultChecked={
            applicationData?.sponsor?.isActive
              ? applicationData?.sponsor?.isActive
              : false
          }
        />
      </AccordionSummary>
      <AccordionDetails>
        <div className="container-fluid">
          <div className="row">
            {SpData?.map((element) => (
              <>
                {element?.type === "text" && (
                  <TextField
                    element={element}
                    Errors={Errors}
                    registerName={`sponsor.${element?.name}`}
                  />
                )}
                {element?.type === "select" && element?.key !== "state" && (
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
                {element?.type === "select" && element?.key === "state" && (
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
                    <StyledLabel required>{element?.label}</StyledLabel>
                    <input
                      className="form-control"
                      type={element.type}
                      placeholder=""
                      {...register(`sponsor.${element?.name}`, {
                        required: element.required,
                        validate: (value) =>
                          isValidEmail(value, !element.required),
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
              </>
            ))}
          </div>
        </div>
      </AccordionDetails>
    </StyledAccordion>
  );
};

export default Sponsor;
