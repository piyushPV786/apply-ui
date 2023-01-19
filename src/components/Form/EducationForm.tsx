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
import { IFee, IOption, IStudyModeQualification } from "../common/types";
import styled from "styled-components";
import { onlyAlphaNumeric } from "../../Util/Util";
import EducationImg from "../../../public/assets/images/education-svgrepo-com.svg";
import Image from "next/image";
import { FinanceApi } from "../../service/Axios";
import {
  AgentandSocialMedia,
  CommonApi,
  studentType,
} from "../common/constant";
const mockStudyModeData = [
  {
    programCode: "BBA-PROG-501",
    programName: "Bachelor of Business Administration",
    studyModes: [
      {
        studyModeCode: "DISTANCE-ONLINE",
        fees: [
          {
            fee: "21000.00",
            feeMode: "SEMESTER",
          },
          {
            fee: "3670.00",
            feeMode: "MONTHLY",
          },
          {
            fee: "40000.00",
            feeMode: "ANNUALLY",
          },
        ],
      },
      {
        studyModeCode: "FULL-TIME",
        fees: [
          {
            fee: "52500.00",
            feeMode: "SEMESTER",
          },
          {
            fee: "9170.00",
            feeMode: "MONTHLY",
          },
          {
            fee: "100000.00",
            feeMode: "ANNUALLY",
          },
        ],
      },
      {
        studyModeCode: "undefined",
        fees: [
          {
            fee: "13000.00",
            feeMode: "APPLICATION",
          },
        ],
      },
    ],
  },
];
const parentKey = "education";
const program = `${parentKey}.programCode`;
const studyMode = `${parentKey}.studyModeCode`;
const highestQualification = `${parentKey}.qualificationCode`;
const highSchoolName = `${parentKey}.highSchoolName`;
const referredBy = `${parentKey}.referredById`;
const agentName = `${parentKey}.agentCode`;
const socialMediaId = `${parentKey}.socialMediaCode`;
const studyModeDetail = `${parentKey}.studyModeDetail`;
const studentTypeName = `${parentKey}.studentTypeId`;
interface IEducationProps {
  highestQualifications: IOption[];
  programs: IOption[];
  socialMedias: IOption[];
  agentArr: IOption[];
}

const FeeCard = (props: any) => {
  const { setSelectedMode = () => {}, ...rest } = { ...props };
  const selectedData = { ...rest };
  return (
    <>
      <StyleFeeCards
        style={{
          border:
            props?.selected === props?.feeMode ? "1.5px solid green" : "0",
        }}
        onClick={() => props.setSelectedMode(selectedData)}
      >
        <span>{props?.fee}</span>
        <br />
        <span style={{ color: `${Green}` }}>{props?.feeMode}</span>
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
  // IStudyModeQualification[] | any[]
  const [studyModeQualification, setStudyModeQualification] = useState<
    IStudyModeQualification[]
  >([]);
  const { agentArr, highestQualifications, programs, socialMedias } = props;
  const programVal = watch(program);
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
  }, []);

  const getQualificationStudyModeData = (programCode: string) => {
    FinanceApi.get(`${CommonApi.GETSTUDYMODEPROGRAMS}/${programCode}`)
      .then((res) => {
        setStudyModeQualification(res?.data?.data);
        // setStudyModeQualification(studyModeQualification);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const setSelectedMode = (props: IFee) => {
    const selectedStudyModeData = studyModeQualification![parentIdx].studyModes[
      studyIdx
    ].fees.find(({ feeMode }) => feeMode === props.feeMode);
    setValue(studyModeDetail, selectedStudyModeData, {
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
                  <StyledLabel required>Interested Program</StyledLabel>
                  <select
                    className="form-select"
                    {...register(`${program}`, { required: true })}
                    onChange={(e) => {
                      setValue(e.target.name, e.target.value);
                      getQualificationStudyModeData(e.target.value);
                    }}
                  >
                    <option value={""}>Select Interested Qualification</option>
                    {programs &&
                      programs.map(({ code, name }) => (
                        <option
                          selected={code === programVal}
                          key={code}
                          value={code}
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
              {studyModeQualification && (
                <div className="col-md-4">
                  <StyledLabel required>Study Mode</StyledLabel>

                  <div className="mb-4">
                    {studyModeQualification &&
                      studyModeQualification.map(
                        ({ studyModes, programCode }, parentIndex) => {
                          {
                            return (
                              studyModes &&
                              studyModes.map(({ studyModeCode }, studyIdx) => {
                                return (
                                  <>
                                    <div className="form-check form-check-inline">
                                      <input
                                        key={studyModeCode}
                                        className="form-check-input me-2"
                                        type="radio"
                                        {...register(`${studyMode}`, {
                                          required: true,
                                        })}
                                        onClick={(e: any) => {
                                          setValue(studyMode, e.target.value);
                                          setSelectedStudyMode({
                                            studyIdx: studyIdx,
                                            studyId: studyModeCode,
                                            parentIdx: parentIndex,
                                          });
                                        }}
                                        value={studyModeCode}
                                        checked={studyModeVal == studyModeCode}
                                      />
                                      <label className="form-check-label">
                                        {programCode}
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
                      {studyModeQualification &&
                        studyModeQualification[parentIdx]?.studyModes[
                          studyIdx
                        ]?.fees?.map(({ fee, feeMode }: IFee) => (
                          <FeeCard
                            setSelectedMode={setSelectedMode}
                            key={fee}
                            fee={fee}
                            feeMode={feeMode}
                            uniqueId={fee}
                            selected={selectedStudyModeDetail?.feeMode}
                          />
                        ))}
                    </StyleContainer>
                    {touchFields?.studyMode &&
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
              )}
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
                      highestQualifications.map(({ code, name }) => (
                        <option
                          selected={code === highestQualificationVal}
                          key={code}
                          value={code}
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
                    {...register(`${highSchoolName}`,{ required: true })}
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
                            (item) => item?.code == +referredByeVal
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
                            (item) => item?.code == +referredByeVal
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
                    <option value={""}>Select Social Media</option>

                    {AgentandSocialMedia &&
                      AgentandSocialMedia.map(({ code, name }) => (
                        <option
                          selected={code === referredByeVal}
                          key={code}
                          value={code}
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
                  (item) => item?.code == +referredByeVal
                )?.name === "Agent" && (
                  <div className="">
                    <div className="mb-4">
                      <StyledLabel required>Agent Name</StyledLabel>
                      <select
                        className="form-select"
                        {...register(`${agentName}`, { required: true })}
                        value={agentNameVal}
                      >
                        <option value={""}>Select Agent</option>
                        {agentArr &&
                          agentArr.map(({ code, name }) => (
                            <option
                              selected={code === agentNameVal}
                              key={code}
                              value={code}
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
                  (item) => item?.code == +referredByeVal
                )?.name === "Social Media" && (
                  <div className="">
                    <div className="mb-4">
                      <StyledLabel required>Social Media</StyledLabel>
                      <select
                        className="form-select"
                        value={socialMediaVal}
                        {...register(`${socialMediaId}`, { required: true })}
                      >
                        <option value={""}>Select Social Media</option>

                        {socialMedias &&
                          socialMedias.map(({ code, name }) => (
                            <option
                              selected={code === socialMediaVal}
                              key={code}
                              value={code}
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
                  <StyledLabel required>Student Type</StyledLabel>

                  <select
                    defaultValue={0}
                    className="form-select"
                    {...register(`${studentTypeName}`, { required: true })}
                  >
                    {studentType &&
                      studentType.map(({ code, name }) => (
                        <option key={code} value={code}>
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
