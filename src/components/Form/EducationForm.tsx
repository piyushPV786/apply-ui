import React, { useEffect, useState } from "react";
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
  IFee,
  IStudyModeQualification,
  ReferredBy,
  SocialMedia,
} from "../common/types";
import styled from "styled-components";
import { onlyAlphaNumeric } from "../../Util/Util";
import EducationImg from "../../../public/assets/images/education-svgrepo-com.svg";
import Image from "next/image";
import { AuthApi } from "../../service/Axios";
import { CommonApi } from "../common/constant";

const qualification = `interestedQualificationId`;
const studyMode = `studyMode`;
const highestQualification = `highestQualificationId`;
const highSchoolName = `highSchoolName`;
const referredBy = `referredById`;
const agentName = `agentId`;
const socialMediaId = `socialMediaId`;
const studyModeDetail = `studyModeDetail`;
interface IEducationProps {
  highestQualifications: HighestQualificationElement[];
  qualificationArr: HighestQualificationElement[];
  referredByArr: ReferredBy[];
  socialMedias: SocialMedia[];
  agentArr: Agent[];
}

const FeeCard = (props: any) => {
  const { setSelectedMode = () => {}, ...rest } = { ...props };
  const selectedData = { ...rest };
  return (
    <>
      <StyleFeeCards
        style={{
          border:
            props?.selected === props?.uniqueId ? "1.5px solid green" : "0",
        }}
        onClick={() => props.setSelectedMode(selectedData)}
      >
        <span>{props?.fee}</span>
        <br />
        <span style={{ color: `${Green}` }}>{props?.feePeriod}</span>
      </StyleFeeCards>
    </>
  );
};

export const EducationForm = (props: IEducationProps) => {
  const {
    setValue,
    register,
    watch,
    formState: { errors, touchedFields },
  } = useFormContext();
  const [selectedStudyMode, setSelectedStudyMode] = useState<
    number | null | any
  >({
    studyIdx: null,
    studyId: null,
    parentIdx: null,
  });
  const [studyModeQualification, setStudyModeQualification] = useState<
    IStudyModeQualification[]
  >([]);
  const {
    agentArr,
    highestQualifications,
    qualificationArr,
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
  const selectedStudyModeDetail = watch(studyModeDetail);
  const educationFormError = errors as any;
  const touchFields = touchedFields;
  const { studyIdx, parentIdx } = selectedStudyMode;

  useEffect(() => {
    register(`${studyModeDetail}`, {
      required: true,
    });
    getQualificationStudyModeData();
  }, []);

  const getQualificationStudyModeData = () => {
    AuthApi.get(CommonApi.GETSTUDYMODEQUALIFICATION)
      .then((res) => {
        setStudyModeQualification(res?.data?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const setSelectedMode = (props: IFee | any) => {
    const selectedStudyModeData = studyModeQualification[parentIdx].StudyModes[
      studyIdx
    ].fees.find((item) => item.id === props.uniqueId);

    setValue("studyModeDetail", selectedStudyModeData, {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

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
                  {educationFormError?.qualification && (
                    <div className="invalid-feedback">
                      Please enter Interested Qualification
                    </div>
                  )}
                </div>
              </div>
              <div className="col-md-4">
                <StyledLabel required>Study Mode</StyledLabel>

                <div className="mb-4">
                  {studyModeQualification.map(({ StudyModes }, parentIndex) => {
                    {
                      return (
                        StudyModes &&
                        StudyModes.map(({ id, mode }, studyIdx) => {
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
                                  onClick={(e: any) => {
                                    setValue("studyMode", e.target.value);
                                    setValue("studyModeDetail", null);
                                    setSelectedStudyMode({
                                      studyIdx: studyIdx,
                                      studyId: id,
                                      parentIdx: parentIndex,
                                    });
                                  }}
                                  value={id}
                                  checked={+studyModeVal == id}
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
                  })}
                  <StyleContainer>
                    {studyModeQualification &&
                      studyModeQualification[parentIdx]?.StudyModes[
                        studyIdx
                      ]?.fees?.map(({ fees, id, feesPeriod }: IFee) => (
                        <FeeCard
                          setSelectedMode={setSelectedMode}
                          key={id}
                          fee={fees}
                          feePeriod={feesPeriod}
                          uniqueId={id}
                          selected={selectedStudyModeDetail?.id}
                        />
                      ))}
                  </StyleContainer>
                  {touchFields?.studyModeId &&
                    educationFormError?.studyMode && (
                      <div className="invalid-feedback">
                        Please enter Study Mode
                      </div>
                    )}
                  {educationFormError?.studyModeDetail && (
                    <div className="invalid-feedback">
                      Please select Fees and Semester
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
