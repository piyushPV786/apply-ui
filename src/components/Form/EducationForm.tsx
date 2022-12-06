import React, {  useState } from "react";
import {
  DefaultGrey,
  Green,
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
import styled from "styled-components";
import { onlyAlphaNumeric } from "../../Util/Util";
import EducationImg from "../../../public/assets/images/education-svgrepo-com.svg";
import Image from "next/image";

const qualification = `interestedQualificationId`;
const studyMode = `studyMode`;
const highestQualification = `highestQualificationId`;
const highSchoolName = `highSchoolName`;
const referredBy = `referredById`;
const agentName = `agentId`;
const socialMediaId = `socialMediaId`;
interface IEducationProps {
  highestQualifications: HighestQualificationElement[];
  qualificationArr: HighestQualificationElement[];
  studyModes: Mode[];
  referredByArr: ReferredBy[];
  socialMedias: SocialMedia[];
  agentArr: Agent[];
}

const FeeCard = (props: any) => {
  return (
    <>
      <StyleFeeCards>
        <span>{props?.fee}</span>
        <br />
        <span style={{ color: `${Green}` }}>{props?.feePeriod}</span>
      </StyleFeeCards>
    </>
  );
};
const mockQualification = {
  qualifications: [
    {
      id: 1,
      qualification: "M.T.B",
      StudyModes: [
        {
          id: 1,
          mode: "Full-time",
          fees: [
            {
              id: 1,
              fees: 25000,
              feesPeriod: "Semeter",
            },
            {
              id: 2,
              fees: 500000,
              feesPeriod: "Monthly",
            },
            {
              id: 3,
              fees: 100000,
              feesPeriod: "Anually",
            },
          ],
        },
        {
          id: 2,
          mode: "Part-time",
          fees: [],
        },
      ],
    },
  ],
};
export const EducationForm = (props: IEducationProps) => {
  const {
    setValue,
    register,
    watch,
    formState: { errors, touchedFields },
  } = useFormContext();
  const [agentType, setAgent] = useState<string>();
  const [selectedStudyMode, setSelectedStudyMode] = useState<any>({
    studyIdx: null,
    studyId: null,
    parentIdx: null,
  });
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
  const agentNameVal = watch(agentName);
  const socialMediaVal = watch(socialMediaId);
  const educationFormError = errors as any;
  const touchFields = touchedFields;
  const { studyIdx, parentIdx } = selectedStudyMode;

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
              <Image src={EducationImg} alt="EducationImg" />
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
                    {...register(`${qualification}`, { required: true })}
                  >
                    <option value={""}>Select Interested Qualification</option>
                    <option value={"12"}>Test Qualification</option>

                    {qualificationArr &&
                      qualificationArr.map(({ id, qualification }) => (
                        <option
                          selected={id === qualificationVal}
                          key={id}
                          value={Number(id)}
                        >
                          {qualification}
                        </option>
                      ))}
                  </select>
                  {touchFields?.qualification &&
                    educationFormError?.qualification && (
                      <div className="invalid-feedback">
                        Please enter Interested Qualification
                      </div>
                    )}
                </div>
              </div>
              <div className="col-md-4">
                <StyledLabel required>Study Mode</StyledLabel>

                <div className="mb-4">
                  {mockQualification.qualifications.map(
                    (
                      { StudyModes, id: parentId, qualification },
                      parentIndex
                    ) => {
                      {
                        return (
                          StudyModes &&
                          StudyModes.map(({ fees, id, mode }, studyIdx) => {
                            return (
                              <>
                                <div className="form-check form-check-inline">
                                  <input
                                    key={id}
                                    className="form-check-input me-2"
                                    type="radio"
                                    {...register(`${studyMode}`, {
                                      required: true,
                                    })}
                                    onClick={() => {
                                      setSelectedStudyMode({
                                        studyIdx: studyIdx,
                                        studyId: id,
                                        parentIdx: parentIndex,
                                      });
                                    }}
                                    value={id}
                                    checked={studyModeVal == id}
                                  />
                                  <label className="form-check-label">
                                    {mode}
                                  </label>
                                </div>
                              </>
                            );
                          })
                        );
                      }
                    }
                  )}
                  <StyleContainer>
                    {mockQualification &&
                      mockQualification.qualifications[parentIdx]?.StudyModes[
                        studyIdx
                      ]?.fees?.map(({ fees, id, feesPeriod }) => (
                        <FeeCard key={id} fee={fees} feePeriod={feesPeriod} />
                      ))}
                  </StyleContainer>
                  {touchFields?.studyMode && educationFormError?.studyMode && (
                    <div className="invalid-feedback">
                      Please enter Study Mode
                    </div>
                  )}
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
                    <option value={""}>Select Highest Qualification</option>
                    {highestQualifications &&
                      highestQualifications.map(({ id, qualification }) => (
                        <option
                          selected={id === highestQualificationVal}
                          key={id}
                          value={Number(id)}
                        >
                          {qualification}
                        </option>
                      ))}
                  </select>
                  {touchFields?.highestQualification &&
                    educationFormError?.highestQualification && (
                      <div className="invalid-feedback">
                        Please enter Highest Qualification
                      </div>
                    )}
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
                    onChange={(e) => {
                      const value = e.target.value;
                      const name = e.target.name;
                      if (onlyAlphaNumeric(value) || !value) {
                        setValue(name, value, {
                          shouldDirty: true,
                          shouldTouch: true,
                          shouldValidate: true,
                        });
                      }
                    }}
                  />
                  {touchFields?.highSchoolName &&
                    educationFormError?.highSchoolName && (
                      <div className="invalid-feedback">
                        Please enter High School Name
                      </div>
                    )}
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
                    onChange={(e) => {
                      const value = e.target.value;
                      const name = e.target.name;
                      setValue(name, value, {
                        shouldDirty: true,
                        shouldTouch: true,
                        shouldValidate: true,
                      });
                    }}
                    onBlur={() => {
                      setTimeout(() => {
                        if (
                          referredByArr?.find(
                            (item) => item?.id == +referredByeVal
                          )?.referredBy === "Agent"
                        ) {
                          setValue(`${socialMediaId}`, null, {
                            shouldDirty: true,
                            shouldTouch: true,
                            shouldValidate: true,
                          });
                        }
                        if (
                          referredByArr?.find(
                            (item) => item?.id == +referredByeVal
                          )?.referredBy === "Socail Media"
                        ) {
                          setValue(`${agentName}`, null, {
                            shouldDirty: true,
                            shouldTouch: true,
                            shouldValidate: true,
                          });
                        }
                      }, 2000);
                    }}
                  >
                    <option value={""}></option>

                    {referredByArr &&
                      referredByArr.map(({ id, referredBy }) => (
                        <option
                          selected={id === referredByeVal}
                          key={id}
                          value={Number(id)}
                        >
                          {referredBy}
                        </option>
                      ))}
                  </select>
                  {touchFields[referredBy] &&
                    educationFormError[referredBy] && (
                      <div className="invalid-feedback">
                        Please enter Referred by
                      </div>
                    )}
                </div>

                {referredByArr?.find((item) => item?.id == +referredByeVal)
                  ?.referredBy === "Agent" && (
                  <div className="">
                    <div className="mb-4">
                      <StyledLabel required>Agent Name</StyledLabel>
                      <select
                        className="form-select"
                        {...register(`${agentName}`, {
                          required: true,
                        })}
                        value={agentNameVal}
                      >
                        <option value={""}>Select Agent</option>
                        {agentArr &&
                          agentArr.map(({ id, name }) => (
                            <option
                              selected={id === agentNameVal}
                              key={id}
                              value={Number(id)}
                            >
                              {name}
                            </option>
                          ))}
                      </select>
                      {touchFields[agentName] &&
                        educationFormError[agentName] && (
                          <div className="invalid-feedback">
                            Please select agent
                          </div>
                        )}
                    </div>
                  </div>
                )}
                {referredByArr?.find((item) => item?.id == +referredByeVal)
                  ?.referredBy === "Socail Media" && (
                  <div className="">
                    <div className="mb-4">
                      <StyledLabel required>Social Media</StyledLabel>
                      <select
                        className="form-select"
                        value={socialMediaVal}
                        {...register(`${socialMediaId}`, {
                          required: true,
                        })}
                      >
                        <option value={""}>Select Social Media</option>

                        {socialMedias &&
                          socialMedias.map(({ id, socialMedia }) => (
                            <option
                              selected={id === socialMediaVal}
                              key={id}
                              value={Number(id)}
                            >
                              {socialMedia}
                            </option>
                          ))}
                      </select>
                      {touchFields[socialMediaId] &&
                        educationFormError[socialMediaId] && (
                          <div className="invalid-feedback">
                            Please select social media
                          </div>
                        )}
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

const StyleFeeCards = styled.div`
  background: ${DefaultGrey};
  padding: 6px 10px;
  cursor: pointer;
`;

const StyleContainer = styled.div`
  display: flex;
  column-gap: 10px;
  padding: 1rem 0.2rem;
`;
