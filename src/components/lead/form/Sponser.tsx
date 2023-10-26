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

const Sponsor = (props: any) => {
  const { register, watch } = useFormContext();
  const { masterData, applicationData } = props?.masterData;
  const activeSponsor = watch("sponsor.isActive");
  const countryDetail = watch(`sponsor.country`);
  const stateDetails: any = useAddressHook(countryDetail);
  const stateList = stateDetails[countryDetail];
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
          defaultValue={applicationData?.sponsor?.isActive}
          defaultChecked={applicationData?.sponsor?.isActive}
        />
      </AccordionSummary>
      <AccordionDetails>
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-4 mb-4">
              {!!masterData?.sponsorModeData?.length && (
                <CommonAutocomplete
                  defaultValue={applicationData?.sponsor?.sponsorModeCode}
                  options={masterData?.sponsorModeData}
                  label="Sponsor Type"
                  registerName={`sponsor.sponsorModeCode`}
                  required={true}
                />
              )}
            </div>

            <div className="col-lg-4 mb-4">
              {!!masterData?.relationData?.length && (
                <CommonAutocomplete
                  defaultValue={applicationData?.sponsor?.relationshipCode}
                  options={masterData?.relationData}
                  label="Relationship Type"
                  registerName={`sponsor.relationshipCode`}
                  required={true}
                />
              )}
            </div>

            <div className="col-lg-4 mb-4">
              <StyledLabel required>Sponsor Name</StyledLabel>
              <input
                className="form-control"
                type={"text"}
                placeholder="text"
                {...register("sponsor.name")}
              />
            </div>
            <div className="col-lg-4 mb-4">
              <StyledLabel required>Email Address</StyledLabel>
              <input
                className="form-control"
                type={"text"}
                placeholder="text"
                {...register("sponsor.email")}
              />
            </div>
            <div className="col-lg-4 mb-4">
              <StyledLabel required>Phone Number</StyledLabel>
              <input
                className="form-control"
                type={"text"}
                placeholder="text"
                {...register("sponsor.mobileNumber")}
              />
            </div>
            <div className="col-lg-4 mb-4">
              <StyledLabel required>Address</StyledLabel>
              <input
                className="form-control"
                type={"text"}
                placeholder="text"
                {...register("sponsor.address")}
              />
            </div>
            <div className="col-lg-4 mb-4">
              {!!masterData?.countryData?.length && (
                <CommonAutocomplete
                  defaultValue={applicationData?.sponsor?.country}
                  options={masterData?.countryData}
                  label="Country"
                  registerName={`sponsor.country`}
                  required={true}
                />
              )}
            </div>
            <div className="col-lg-4 mb-4">
              {!!stateList?.length && (
                <CommonAutocomplete
                  defaultValue={applicationData?.sponsor?.state}
                  options={stateList}
                  label="State/Provinces"
                  registerName={`sponsor.state`}
                  required={true}
                />
              )}
            </div>
            <div className="col-lg-4 mb-4">
              <StyledLabel required> City </StyledLabel>
              <input
                className="form-control"
                type={"text"}
                placeholder={"e.g 10 church street"}
                {...register(`sponsor.city`)}
              />
            </div>
            <div className="col-lg-4 mb-4">
              <StyledLabel required>Pin Code / Zip Code</StyledLabel>
              <input
                className="form-control"
                type={"text"}
                placeholder={"Enter Zip/Postal Code"}
                {...register(`sponsor.zipCode`)}
              />
            </div>
          </div>
        </div>
      </AccordionDetails>
    </StyledAccordion>
  );
};

export default Sponsor;
