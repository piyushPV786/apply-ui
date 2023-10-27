import { Controller, useFormContext } from "react-hook-form";
import {
  GreenFormHeading,
  StyledAccordion,
  StyledLabel,
} from "../../common/common";
import { AccordionDetails, AccordionSummary } from "@material-ui/core";
import Image from "next/image";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import EducationImg from "../../../../public/assets/images/education-svgrepo-com.svg";
import { refferedById } from "../../../constants";
import CommonAutocomplete from "./components/CommonAutocomplete ";
import { StyleContainer } from "../../login/style";
import { FeeCard } from "./components/CommonComponents";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import RadioField from "./components/RadioField";
import { useEducationHook } from "../customHooks/educationHooks";

const Education = (props: any) => {
  const {
    register,
    watch,
    formState: { errors },
    control,
  } = useFormContext();

  const { masterData, programsData, applicationData, salesAgentData } =
    props?.masterData;
  const programCode = watch("education.programCode");
  const studyModeCodeWatch = watch("education.studyModeCode");
  const studentProgram: any = useEducationHook(programCode);
  const refferedBy = watch("education.refferedById");
  const Errors = errors["education"] as any;
  const feesDetails = studentProgram?.studyModes?.find(
    (item) => item?.studyModeCode === studyModeCodeWatch
  );
  console.log("feesDetails ===========>", feesDetails);
  return (
    <StyledAccordion defaultExpanded={true} className="card-shadow mt-0">
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <GreenFormHeading>
          <span className="me-2">
            <Image src={EducationImg} alt="user" />
          </span>
          Education and Course details
        </GreenFormHeading>
      </AccordionSummary>
      <AccordionDetails>
        <div className="row">
          <div className="col-lg-4 mb-4">
            {programsData?.length && (
              <CommonAutocomplete
                defaultValue={applicationData?.education?.programCode}
                options={programsData}
                label="Interested Program"
                registerName={`education.programCode`}
                required={true}
              />
            )}
            {Errors?.programCode && (
              <div className="invalid-feedback">
                select your interested program
              </div>
            )}
          </div>

          <div className="col-lg-4 mb-4">
            <StyledLabel required>Study Mode & Fee Plan</StyledLabel>
            <br />
            {!!studentProgram?.studyModes?.length && (
              <>
                {studentProgram?.studyModes?.map((item: any) => {
                  {
                    return (
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input me-2"
                          type={"radio"}
                          {...register("education.studyModeCode")}
                          value={item?.studyModeCode}
                        />
                        {item?.studyModeCode}
                      </div>
                    );
                  }
                })}
                <StyleContainer className="fee-cards">
                  {feesDetails && feesDetails?.fees && (
                    <div className="row">
                      {feesDetails?.fees?.map((item) => (
                        <FeeCard item={item} />
                      ))}
                    </div>
                  )}
                </StyleContainer>
              </>
            )}
          </div>

          <div className="col-lg-4 mb-4">
            {!!masterData?.highestQualificationData?.length && (
              <CommonAutocomplete
                defaultValue={applicationData?.education?.qualificationCode}
                options={masterData?.highestQualificationData}
                label="Highest Qualification"
                registerName={`education.qualificationCode`}
                required={true}
              />
            )}
            {Errors?.qualificationCode && (
              <div className="invalid-feedback">
                Please select Highest Qualification
              </div>
            )}
          </div>
          <div className="col-lg-4 mb-4">
            <StyledLabel required>High School Name</StyledLabel>
            <input
              className="form-control"
              type={"text"}
              placeholder="High School Name"
              {...register("education.highSchoolName", { required: true })}
            />
            {Errors?.highSchoolName && (
              <div className="invalid-feedback">
                Please enter high school name
              </div>
            )}
          </div>

          <div className="col-md-4 mb-4">
            <StyledLabel required>
              Are you an international degree holder?
            </StyledLabel>
            <br />
            <div className="form-check form-check-inline">
              <RadioField
                registerName={"education.isInternationDegree"}
                defaultValue={applicationData?.education?.isInternationDegree}
                defaultChecked={applicationData?.education?.isInternationDegree}
              />
            </div>
            {Errors?.isInternationDegree && (
              <div className="invalid-feedback">
                international degree is required
              </div>
            )}
          </div>

          <div className="col-lg-4 mb-4">
            <div className="mb-4">
              <CommonAutocomplete
                defaultValue={
                  applicationData?.education?.agentCode
                    ? refferedById.agent
                    : refferedById.social
                }
                options={[
                  { name: "Agent", code: refferedById.agent },
                  { name: "Social Media", code: refferedById.social },
                ]}
                label="Referred by Agent/Social Media"
                registerName={`education.refferedById`}
                required={true}
              />
              {Errors?.refferedById && (
                <div className="invalid-feedback">
                  Please select Referred by
                </div>
              )}
            </div>

            {refferedBy === refferedById.agent && (
              <div className="mb-4 others">
                {!!salesAgentData?.length && (
                  <CommonAutocomplete
                    defaultValue={applicationData?.education?.agentCode}
                    options={salesAgentData}
                    label="Agent Name"
                    registerName={`education.agentCode`}
                    required={true}
                  />
                )}
                {Errors?.agentCode && (
                  <div className="invalid-feedback">
                    Please select Agent Name
                  </div>
                )}
              </div>
            )}
            {refferedBy === refferedById.social && (
              <div className="mb-4 others">
                {!!masterData?.socialMediaData?.length && (
                  <CommonAutocomplete
                    defaultValue={applicationData?.education?.socialMediaCode}
                    options={masterData?.socialMediaData}
                    label="Agent Name"
                    registerName={`education.socialMediaCode`}
                    required={true}
                  />
                )}
                {Errors?.socialMediaCode && (
                  <div className="invalid-feedback">
                    Please select social media
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </AccordionDetails>
    </StyledAccordion>
  );
};

export default Education;
