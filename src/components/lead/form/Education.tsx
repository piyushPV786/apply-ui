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
import { useEffect, useState } from "react";
import { getProgramsData, getStudyModeData } from "../../../service/service";
import { IMasterData } from "../../common/types";
import { refferedById } from "../../../constants";
import useEducationHook from "../customHooks/educationHooks";
import CommonAutocomplete from "./components/CommonAutocomplete ";

const Education = (props: any) => {
  const { register, watch, setValue } = useFormContext();
  const { masterData, programsData } = props?.masterData;
  const programCode = watch("education.programCode");
  const studentProgram = useEducationHook(programCode);
  const refferedBy = watch("education.refferedById");
  console.log("refferedBy", refferedBy);
  // const fees = feeHelper(studyMode, programCode, studyModeCode);
  return (
    <StyledAccordion>
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
                options={programsData}
                label="Interested Program"
                registerName={`education.programCode`}
                required={true}
              />
            )}
          </div>
          {!!studentProgram?.studyModes?.length && (
            <div className="col-lg-4 mb-4">
              <StyledLabel required>Course Fees</StyledLabel>
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
            </div>
          )}
          {/* {!!fees?.length && (
            <div className="col-lg-4 mb-4">
              <StyledLabel required>Course Mode</StyledLabel>
              <div className="form-check form-check-inline">
                {fees?.map((feeItem: any) => {
                  return (
                    <>
                      <input
                        type={"radio"}
                        className="form-check-input me-2"
                        {...register("education.programFees")}
                        value={feeItem?.fee}
                        onChange={(e) =>
                          setValue("education.programMode", feeItem?.feeMode)
                        }
                      />
                      {feeItem?.feeMode}
                      {feeItem?.fee}
                      <input
                        type={"hidden"}
                        {...register("education.programMode")}
                      />
                    </>
                  );
                })}
              </div>
            </div>
          )} */}
          <div className="col-lg-4 mb-4">
            {!!masterData?.highestQualificationData?.length && (
              <CommonAutocomplete
                options={masterData?.highestQualificationData}
                label="Highest Qualification"
                registerName={`education.qualificationCode`}
                required={true}
              />
            )}
          </div>
          <div className="col-lg-4 mb-4">
            <StyledLabel required>High School Name</StyledLabel>
            <input
              className="form-control"
              type={"text"}
              placeholder="High School Name"
              {...register("education.highSchoolName")}
            />
          </div>

          <div className="col-lg-4 mb-4">
            <CommonAutocomplete
              options={[
                { name: "Agent", code: refferedById.agent },
                { name: "Social Media", code: refferedById.social },
              ]}
              label="Referred by Agent/Social Media"
              registerName={`education.refferedById`}
              required={true}
            />
          </div>
          {refferedBy === refferedById.agent && (
            <div className="col-lg-4 mb-4">
              {!!masterData?.agentData?.length && (
                <CommonAutocomplete
                  options={masterData?.agentData}
                  label="Agent Name"
                  registerName={`education.agentCode`}
                  required={true}
                />
              )}
            </div>
          )}
          {refferedBy === refferedById.social && (
            <div className="col-lg-4 mb-4">
              {!!masterData?.socialMediaData?.length && (
                <CommonAutocomplete
                  options={masterData?.socialMediaData}
                  label="Agent Name"
                  registerName={`education.socialMediaCode`}
                  required={true}
                />
              )}
            </div>
          )}
          <div className="col-lg-4 mb-4">
            {!!masterData?.studentTypeData?.length && (
              <CommonAutocomplete
                options={masterData?.studentTypeData}
                label="Student Type"
                registerName={`education.studentTypeCode`}
                required={true}
              />
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
