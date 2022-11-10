import React, { useEffect } from "react";
import {
  GreenFormHeading,
  StyledAccordion,
  StyledLabel,
} from "../common/common";
import { AccordionDetails, AccordionSummary } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { useFormContext } from "react-hook-form";
import {
  Agent,
  HighestQualificationElement,
  Mode,
  ReferredBy,
  SocialMedia,
} from "../common/types";
const Education = "Education";
const qualification = `${Education}.interestedQualificationId`;
const studyMode = `${Education}.studyMode`;
const highestQualification = `${Education}.highestQualificationId`;
const highSchoolName = `${Education}.highSchoolName`;
const referredBy = `${Education}.referredById`;
const agentName = `${Education}.agentId`;
const socialMediaId = `${Education}.socialMediaId`;
interface IEducationProps {
  highestQualifications: HighestQualificationElement[];
  qualificationArr: HighestQualificationElement[];
  studyModes: Mode[];
  referredByArr: ReferredBy[];
  socialMedias: SocialMedia[];
  agentArr: Agent[];
}

export const EducationForm = (props: IEducationProps) => {
  const { setValue, register, watch } = useFormContext();
  const {
    agentArr,
    highestQualifications,
    qualificationArr,
    studyModes,
    referredByArr,
    socialMedias,
  } = props;
  const qualificationVal = watch(qualification);
  const studyModeVal = watch(studyMode);
  const highestQualificationVal = watch(highestQualification);
  const highSchoolNameVal = watch(highSchoolName);
  const referredByeVal = watch(referredBy);
  const agentNameVal = watch(referredBy);
  const socialMediaVal = watch(socialMediaId);

  return (
    <>
      <StyledAccordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <GreenFormHeading>
            <span className="me-2">
              <img src={"/assets/images/education-svgrepo-com.svg"} />
            </span>
            Education and Course details
          </GreenFormHeading>
        </AccordionSummary>
        <AccordionDetails>
          <div className="container">
            <div className="row">
              <div className="col-md-4">
                <div className="mb-4">
                  <StyledLabel required>Interested Qualification</StyledLabel>
                  <select
                    className="form-select"
                    value={qualificationVal}
                    defaultValue={qualificationVal}
                    {...register(`${qualification}`, { required: true })}
                  >
                    {qualificationArr &&
                      qualificationArr.map(({ id, qualification }) => (
                        <option key={id} value={Number(id)}>
                          {qualification}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
              <div className="col-md-4">
                <StyledLabel required>Study Mode</StyledLabel>

                <div className="mb-4">
                  <select
                    className="form-select"
                    value={studyModeVal}
                    defaultValue={studyModeVal}
                    {...register(`${studyMode}`, { required: true })}
                  >
                    {studyModes &&
                      studyModes.map(({ id, mode }) => (
                        <option key={id} value={Number(id)}>
                          {mode}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
              <div className="col-md-4">
                <div className="mb-4">
                  <StyledLabel required>Highest Qualification</StyledLabel>
                  <select
                    className="form-select"
                    value={highestQualificationVal}
                    defaultValue={highestQualificationVal}
                    {...register(`${highestQualification}`, { required: true })}
                  >
                    {highestQualifications &&
                      highestQualifications.map(({ id, qualification }) => (
                        <option key={id} value={Number(id)}>
                          {qualification}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <div className="mb-4">
                  <StyledLabel required>High School Name</StyledLabel>

                  <input
                    value={highSchoolNameVal}
                    defaultValue={highSchoolNameVal}
                    type="text"
                    {...register(`${highSchoolName}`, { required: true })}
                    className="form-control"
                    id="highSchoolName"
                    placeholder=""
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="mb-4">
                  <StyledLabel required>
                    Referred by <strong>Agent/Social Media</strong>
                  </StyledLabel>

                  <select
                    className="form-select"
                    value={referredByeVal}
                    defaultValue={referredByeVal}
                    {...register(`${referredBy}`, { required: true })}
                  >
                    {referredByArr &&
                      referredByArr.map(({ id, referredBy }) => (
                        <option key={id} value={Number(id)}>
                          {referredBy}
                        </option>
                      ))}
                  </select>
                </div>

                {referredByeVal === "Agent" && (
                  <div className="">
                    <div className="mb-4">
                      <StyledLabel required>Agent Name</StyledLabel>
                      <select
                        className="form-select"
                        value={agentNameVal}
                        defaultValue={agentNameVal}
                        {...register(`${agentName}`, {
                          required: referredByeVal === "Agent",
                        })}
                      >
                        {agentArr &&
                          agentArr.map(({ id, name }) => (
                            <option key={id} value={Number(id)}>
                              {name}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                )}
                {referredByeVal === "SocialMedia" && (
                  <div className="">
                    <div className="mb-4">
                      <StyledLabel required>Social Media</StyledLabel>
                      <select
                        className="form-select"
                        value={socialMediaVal}
                        defaultValue={socialMediaVal}
                        {...register(`${socialMediaId}`, {
                          required: referredByeVal === "SocialMedia",
                        })}
                      >
                        {socialMedias &&
                          socialMedias.map(({ id, socialMedia }) => (
                            <option
                              selected={socialMediaVal}
                              key={id}
                              value={Number(id)}
                            >
                              {socialMedia}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </AccordionDetails>
      </StyledAccordion>
    </>
  );
};
