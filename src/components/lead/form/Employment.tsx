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

const Employment = (props: any) => {
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
          Are you Employed? <span className="text-danger me-2">*</span>
        </GreenFormHeading>

        <input
          className="form-check-input me-2"
          type="radio"
          {...register(`employment.isActive`)}
          value={"true"}
        />
        <label className="form-check-label me-2">Yes</label>
        <input
          className="form-check-input me-2"
          type="radio"
          {...register(`employment.isActive`)}
          value={"false"}
        />
        <label className="form-check-label">No</label>
      </AccordionSummary>
      <AccordionDetails hidden={activeSponsor !== "true"}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-4 mb-4">
              {!!masterData?.employmentStatusData?.length && (
                <CommonAutocomplete
                  options={masterData?.employmentStatusData}
                  label="Employment Status"
                  registerName={`employment.employmentStatusCode`}
                  required={true}
                />
              )}
            </div>
            <div className="col-lg-4 mb-4">
              <StyledLabel required>Employer</StyledLabel>
              <input
                className="form-control"
                type={"text"}
                placeholder="text"
                {...register("employment.employer")}
              />
            </div>
            <div className="col-lg-4 mb-4">
              <StyledLabel required>Job Title</StyledLabel>
              <input
                className="form-control"
                type={"text"}
                placeholder="text"
                {...register("employment.jobTitle")}
              />
            </div>
            <div className="col-lg-4 mb-4">
              {!!masterData?.employmentIndustryData?.length && (
                <CommonAutocomplete
                  options={masterData?.employmentIndustryData}
                  label="Industry"
                  registerName={`employment.employmentIndustryCode`}
                  required={true}
                />
              )}
            </div>
            <div className="col-lg-4 mb-4">
              <StyledLabel required>Manager Name</StyledLabel>
              <input
                className="form-control"
                type={"text"}
                placeholder="text"
                {...register("employment.managerName")}
              />
            </div>
            <div className="col-lg-4 mb-4">
              <StyledLabel required>Office Address</StyledLabel>
              <input
                className="form-control"
                type={"text"}
                placeholder="text"
                {...register("employment.officeAddress")}
              />
            </div>
            <div className="col-lg-4 mb-4">
              <StyledLabel required>Office Number</StyledLabel>
              <input
                className="form-control"
                type={"text"}
                placeholder="text"
                {...register("employment.officeMobileNumber")}
              />
            </div>
          </div>
        </div>
      </AccordionDetails>
    </StyledAccordion>
  );
};

export default Employment;
