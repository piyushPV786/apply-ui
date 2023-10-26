import { useFormContext } from "react-hook-form";
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
import useEducationHook from "../customHooks/educationHooks";
import CommonAutocomplete from "./components/CommonAutocomplete ";
import { StyleContainer } from "../../login/style";
import { FeeCard } from "./components/CommonComponents";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";

const Education = (props: any) => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();

  const { masterData, programsData, applicationData, salesAgentData } =
    props?.masterData;
  console.log("app", applicationData);
  const programCode = watch("education.programCode");
  const studentProgram: any = useEducationHook(programCode);
  const refferedBy = watch("education.refferedById");
  const Errors = errors["education"] as any;
  // const fees = feeHelper(studyMode, programCode, studyModeCode);
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
          {!!studentProgram?.studyModes?.length && (
            <div className="col-lg-4 mb-4">
              <StyledLabel required>Study Mode & Fee Plan</StyledLabel>
              <br />
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
                <div className="fee-card-list">
                  <FeeCard />
                </div>
              </StyleContainer>
            </div>
          )}
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
              <RadioGroup
                row
                defaultValue={applicationData?.education?.isInternationDegree}
                {...register("education.isInternationDegree", {
                  required: true,
                })}
              >
                <FormControlLabel
                  value={true}
                  control={
                    <Radio
                      sx={{
                        color: "#008554",
                        "&.Mui-checked": {
                          color: "#008554",
                        },
                      }}
                    />
                  }
                  label="Yes"
                />
                <FormControlLabel
                  value={false}
                  control={
                    <Radio
                      sx={{
                        color: "#008554",
                        "&.Mui-checked": {
                          color: "#008554",
                        },
                      }}
                    />
                  }
                  label="No"
                />
              </RadioGroup>
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

const feeHelper = (
  studyMode: any,
  programCode: string,
  studyModeCode: string
) => {
  let result = [];

  if (studyMode.length && programCode && studyModeCode) {
    const program = studyMode.find((item) => item.programCode === programCode);
    const { fees } = program?.studyModes?.find(
      (item) => item.studyModeCode === studyModeCode
    );
    result = fees;
  }
  return result;
};

export default Education;
