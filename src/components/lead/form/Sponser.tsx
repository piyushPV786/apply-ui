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

const Sponsor = (props: any) => {
  const { register, watch } = useFormContext();
  const { masterData } = props?.masterData;
  const activeSponsor = watch("sponsor.isActive");
  return (
    <StyledAccordion>
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

        <input
          className="form-check-input me-2"
          type="radio"
          {...register(`sponsor.isActive`)}
          value={"true"}
        />
        <label className="form-check-label me-2">Yes</label>
        <input
          className="form-check-input me-2"
          type="radio"
          {...register(`sponsor.isActive`)}
          value={"false"}
        />
        <label className="form-check-label">No</label>
      </AccordionSummary>
      <AccordionDetails hidden={activeSponsor !== "true"}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-4 mb-4">
              {!!masterData?.sponsorModeData?.length && (
                <CommonAutocomplete
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
                  options={masterData?.countryData}
                  label="Country"
                  registerName={`sponsor.country`}
                  required={true}
                />
              )}
            </div>
            <div className="col-lg-4 mb-4">
              {!!masterData?.countryData?.length && (
                <CommonAutocomplete
                  options={[]}
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
                {...register(`sponsor.zipcode`)}
              />
            </div>
          </div>
        </div>
      </AccordionDetails>
    </StyledAccordion>
  );
};

export default Sponsor;
