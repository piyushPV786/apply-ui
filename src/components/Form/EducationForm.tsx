import { useEffect, useState } from "react";
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
import { Agent, IFee, IOption, IStudyModeQualification } from "../common/types";
import styled from "styled-components";
import { onlyAlphaNumeric } from "../../Util/Util";
import EducationImg from "../../../public/assets/images/education-svgrepo-com.svg";
import Image from "next/image";
import { AuthApi } from "../../service/Axios";
import {
  AgentandSocialMedia,
  CommonApi,
  studentType,
} from "../common/constant";
const mockStudyModeData = [
  {
    id: 1,
    qualification: "Engineering",
    StudyModes: [
      {
        id: 1,
        mode: "Online",
        fees: [
          { id: 1, fees: 250000, feesPeriod: "Semester" },
          { id: 2, fees: 25000, feesPeriod: "Monthly" },
          { id: 3, fees: 1000000, feesPeriod: "Anually" },
        ],
      },
      {
        id: 2,
        mode: "Full Time",
        fees: [
          { id: 4, fees: 25000, feesPeriod: "Monthly" },
          { id: 5, fees: 250000, feesPeriod: "Semester" },
          { id: 6, fees: 1000000, feesPeriod: "Anually" },
        ],
      },
      {
        id: 3,
        mode: "Week End",
        fees: [
          { id: 7, fees: 25000, feesPeriod: "Monthly" },
          { id: 8, fees: 250000, feesPeriod: "Semester" },
          {
            id: 9,
            fees: 1000000,
            feesPeriod: "Anually",
          },
        ],
      },
    ],
  },
  {
    id: 2,
    qualification: "LLB",
    StudyModes: [],
  },
];
const parentKey = "education";
const qualification = `${parentKey}.interestedQualificationId`;
const studyMode = `${parentKey}.studyMode`;
const highestQualification = `${parentKey}.highestQualificationId`;
const highSchoolName = `${parentKey}.highSchoolName`;
const referredBy = `${parentKey}.referredById`;
const agentName = `${parentKey}.agentId`;
const socialMediaId = `${parentKey}.socialMediaId`;
const studyModeDetail = `${parentKey}.studyModeDetail`;
const studentTypeName = `${parentKey}.studentTypeId`;
interface IEducationProps {
  highestQualifications: IOption[];
  qualificationArr: IOption[];
  referredByArr: IOption[];
  socialMedias: IOption[];
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
        // setStudyModeQualification(res?.data?.data);
        setStudyModeQualification(mockStudyModeData);
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
                      qualificationArr.map(({ id, name }) => (
                        <option
                          selected={id === qualificationVal}
                          key={id}
                          value={Number(id)}
                        >
                          {name}
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
                  {touchFields?.studyMode && educationFormError?.studyMode && (
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
                      highestQualifications.map(({ id, name }) => (
                        <option
                          selected={id === highestQualificationVal}
                          key={id}
                          value={Number(id)}
                        >
                          {name}
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
                          AgentandSocialMedia?.find(
                            (item) => item?.id == +referredByeVal
                          )?.name === "Agent"
                        ) {
                          setValue(`${socialMediaId}`, null, {
                            shouldDirty: true,
                            shouldTouch: true,
                            shouldValidate: true,
                          });
                        }
                        if (
                          AgentandSocialMedia?.find(
                            (item) => item?.id == +referredByeVal
                          )?.name === "Social Media"
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

                    {AgentandSocialMedia &&
                      AgentandSocialMedia.map(({ id, name }) => (
                        <option
                          selected={id === referredByeVal}
                          key={id}
                          value={Number(id)}
                        >
                          {name}
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

                {AgentandSocialMedia?.find(
                  (item) => item?.id == +referredByeVal
                )?.name === "Agent" && (
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
                {AgentandSocialMedia?.find(
                  (item) => item?.id == +referredByeVal
                )?.name === "Social Media" && (
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
                          socialMedias.map(({ id, name }) => (
                            <option
                              selected={id === socialMediaVal}
                              key={id}
                              value={Number(id)}
                            >
                              {name}
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
              <div className="col-md-4">
                <div className="mb-4">
                  <StyledLabel>Student Type</StyledLabel>

                  <select
                    defaultValue={0}
                    className="form-select"
                    {...register(`${studentTypeName}`, { required: true })}
                  >
                    {studentType &&
                      studentType.map(({ id, name }) => (
                        <option key={id} value={Number(id)}>
                          {name}
                        </option>
                      ))}
                  </select>
                </div>
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
