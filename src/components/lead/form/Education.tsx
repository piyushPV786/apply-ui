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
            <StyledLabel required>Interested Program</StyledLabel>
            <select
              {...register("education.programCode")}
              className="form-control"
            >
              <option value="" key={`${0}_gender`}>
                Select Program
              </option>
              {programsData?.length &&
                programsData?.map((item: IMasterData) => {
                  return (
                    <option value={item?.code} key={`${item?.code}_program`}>
                      {" "}
                      {item?.name}{" "}
                    </option>
                  );
                })}
            </select>
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
            <StyledLabel required>Highest Qualification</StyledLabel>
            <select
              {...register("education.qualificationCode")}
              className="form-control"
            >
              <option value="" key={`${0}_qualificationCode`}>
                Select Highest Qualification
              </option>
              {masterData?.highestQualificationData?.length &&
                masterData?.highestQualificationData?.map(
                  (item: IMasterData) => {
                    return (
                      <option
                        value={item?.code}
                        key={`${item?.code}_qualificationCode`}
                      >
                        {" "}
                        {item?.name}{" "}
                      </option>
                    );
                  }
                )}
            </select>
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
            <StyledLabel required>Referred by Agent/Social Media</StyledLabel>
            <select
              {...register("education.refferedById")}
              className="form-control"
            >
              <option value="" key={`${0}_refferedById`}>
                Select
              </option>
              <option value={refferedById.agent} key={`${0}_refferedById`}>
                Agent
              </option>
              <option value={refferedById.social} key={`${0}_refferedById`}>
                Social Media
              </option>
            </select>
          </div>
          {refferedBy === refferedById.agent && (
            <div className="col-lg-4 mb-4">
              <StyledLabel required>Agent Name</StyledLabel>
              <select
                {...register("education.agentCode")}
                className="form-control"
              >
                <option value="" key={`${0}_agentCode`}>
                  Select
                </option>
                {masterData?.agentData?.length &&
                  masterData?.agentData?.map((item: IMasterData) => {
                    return (
                      <option
                        value={item?.code}
                        key={`${item?.code}_agentCode`}
                      >
                        {" "}
                        {item?.name}{" "}
                      </option>
                    );
                  })}
              </select>
            </div>
          )}
          {refferedBy === refferedById.social && (
            <div className="col-lg-4 mb-4">
              <StyledLabel required>Agent Name</StyledLabel>
              <select
                {...register("education.socialMediaCode")}
                className="form-control"
              >
                <option value="" key={`${0}_socialMediaCode`}>
                  Select
                </option>
                {masterData?.socialMediaData?.length &&
                  masterData?.socialMediaData?.map((item: IMasterData) => {
                    return (
                      <option
                        value={item?.code}
                        key={`${item?.code}_socialMediaCode`}
                      >
                        {" "}
                        {item?.name}{" "}
                      </option>
                    );
                  })}
              </select>
            </div>
          )}
          <div className="col-lg-4 mb-4">
            <StyledLabel required>Student Type</StyledLabel>
            <select
              {...register("education.studentTypeCode")}
              className="form-control"
            >
              <option value="" key={`${0}_studentTypeCode`}>
                Select Student Type
              </option>
              {masterData?.studentTypeData?.length &&
                masterData?.studentTypeData?.map((item: IMasterData) => {
                  return (
                    <option
                      value={item?.code}
                      key={`${item?.code}_studentTypeCode`}
                    >
                      {" "}
                      {item?.name}{" "}
                    </option>
                  );
                })}
            </select>
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
