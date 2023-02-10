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
import { formOptions, onlyAlphaNumericSpace } from "../../Util/Util";
import EducationImg from "../../../public/assets/images/education-svgrepo-com.svg";
import Image from "next/image";
import { FinanceApi } from "../../service/Axios";
import {
  AgentandSocialMedia,
  CommonApi,
  CommonEnums,
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
const programMode = `${parentKey}.programMode`;
const programFees = `${parentKey}.programFees`;
const studentTypeName = `${parentKey}.studentTypeCode`;
const applicationFeesKey = `${parentKey}.applicationFees`;
interface IEducationProps {
  highestQualifications: IOption[];
  programs: IOption[];
  socialMedias: IOption[];
  agentArr: IOption[];
  studyTypeData: IOption[];
}

// const FeeCard = (props: any) => {
//   const { setSelectedMode = () => {}, ...rest } = { ...props };
//   const selectedData = { ...rest };
//   return (
//     <>
//       <StyleFeeCards
//         style={{
//           border:
//             props?.selected === props?.fee
//               ? "2px solid green"
//               : "2px solid #dde1e3",
//         }}
//         onClick={() => props.setSelectedMode(selectedData)}
//       >
//         <span>{props?.fee}</span>
//         <br />
//         <span style={{ color: `${Green}` }}>{props?.feeMode}</span>
//       </StyleFeeCards>
//     </>
//   );
// };

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
    programs,
    socialMedias,
    studyTypeData,
  } = props;
  const programVal = watch(program);
  const studyModeVal = watch(studyMode);
  const highestQualificationVal = watch(highestQualification);
  const highSchoolNameVal = watch(highSchoolName);
  const referredByeVal = watch(referredBy);
  const agentNameVal = watch(agentName);
  const socialMediaVal = watch(socialMediaId);
  const studentTypeVal = watch(studentTypeName);
  // const programFeeVal = watch(programFees);
  const educationFormError = errors[parentKey] as any;
  const touchFields = touchedFields[parentKey];
  // const { studyIdx, parentIdx } = selectedStudyMode;
  useEffect(() => {
    // register(`${programMode}`, {
    //   required: true,
    // });
    // register(`${programFees}`, {
    //   required: true,
    // });
    if (
      programVal &&
      programVal.length > 0 &&
      studyModeQualification.length === 0
    ) {
      getQualificationStudyModeData(programVal);
    }
  }, [programVal]);

  const getQualificationStudyModeData = async (programCode: string) => {
    FinanceApi.get(`${CommonApi.GETSTUDYMODEPROGRAMS}/${programCode}`)
      .then((res) => {
        const courseFeesDetail = res?.data?.data;
        let applicationFees;
        courseFeesDetail.forEach((item) =>
          item.studyModes.forEach((application, index) => {
            if (application.studyModeCode === "APPLICATION") {
              applicationFees = application;
            }
          })
        );
        // if (programVal && courseFeesDetail.length > 0 && studyMode) {
        //   const index = courseFeesDetail[0]?.studyModes.findIndex(
        //     (item) => item?.studyModeCode === studyModeVal
        //   );
        //   setSelectedStudyMode((prevState) => ({
        //     ...prevState,
        //     studyIdx: index,
        //   }));
        // }

        setValue(
          applicationFeesKey,
          applicationFees?.fees[0]?.fee,
          formOptions
        );
        setStudyModeQualification(courseFeesDetail);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // const setSelectedMode = (props: IFee) => {
  //   const selectedStudyModeData = studyModeQualification![0].studyModes[
  //     studyIdx
  //   ].fees.find(({ feeMode }) => feeMode === props.feeMode);
  //   setValue(programMode, selectedStudyModeData?.feeMode, formOptions);
  //   setValue(programFees, selectedStudyModeData?.fee, formOptions);
  // };
  return (
    <>
      <StyledAccordion key="education" id="education">
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
          <div className="container-fluid form-padding">
            <div className="row">
              <div className="col-md-4">
                <div className="mb-4">
                  <StyledLabel required>Interested Program</StyledLabel>
                  <select
                    className="form-select"
                    {...register(`${program}`, { required: true })}
                    onChange={(e) => {
                      setValue(e.target.name, e.target.value, formOptions);
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
                  {educationFormError?.programCode && (
                    <div className="invalid-feedback">
                      Please enter Interested Program
                    </div>
                  )}
                </div>
              </div>
              {studyModeQualification.length > 0 && (
                <div className="col-md-4">
                  <StyledLabel required>Courses & Fee</StyledLabel>

                  <div className="mb-4">
                    {studyModeQualification &&
                      studyModeQualification.map(
                        ({ studyModes }, parentIndex) => {
                          {
                            return (
                              studyModes &&
                              studyModes.map(({ studyModeCode }, studyIdx) => {
                                return (
                                  <>
                                    {studyModeCode === "APPLICATION" ? null : (
                                      <div className="form-check form-check-inline">
                                        <input
                                          key={studyMode}
                                          className="form-check-input me-2"
                                          type="radio"
                                          {...register(`${studyMode}`, {
                                            required: true,
                                          })}
                                          onClick={(e: any) => {
                                            setValue(
                                              studyMode,
                                              e.target.value,
                                              formOptions
                                            );
                                            setSelectedStudyMode({
                                              studyIdx: studyIdx,
                                              studyId: studyModeCode,
                                              parentIdx: parentIndex,
                                            });
                                          }}
                                          value={studyModeCode}
                                          checked={
                                            studyModeVal == studyModeCode
                                          }
                                        />
                                        <label className="form-check-label">
                                          {studyModeCode}
                                        </label>
                                      </div>
                                    )}
                                  </>
                                );
                              })
                            );
                          }
                        }
                      )}
                    {/* <StyleContainer>
                      {studyModeQualification &&
                        studyModeQualification[0]?.studyModes[
                          studyIdx
                        ]?.fees?.map(({ fee, feeMode }: IFee) => (
                          <FeeCard
                            setSelectedMode={setSelectedMode}
                            key={fee}
                            fee={fee}
                            feeMode={feeMode}
                            uniqueId={fee}
                            selected={programFeeVal}
                          />
                        ))}
                    </StyleContainer>
                    {touchFields?.studyModeCode &&
                      educationFormError?.studyModeCode && (
                        <div className="invalid-feedback">
                          Please select Study Mode
                        </div>
                      )}
                    {educationFormError?.programFees && (
                      <div className="invalid-feedback">
                        Please select Fees and Semester
                      </div>
                    )} */}
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
                  {touchFields?.qualificationCode &&
                    educationFormError?.qualificationCode && (
                      <div className="invalid-feedback">
                        Please select Highest Qualification
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
                      if (onlyAlphaNumericSpace(value) || !value) {
                        setValue(name, value, formOptions);
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
                      setValue(name, value, formOptions);
                    }}
                    onBlur={() => {
                      setTimeout(() => {
                        if (
                          AgentandSocialMedia?.find(
                            (item) => item?.code == referredByeVal
                          )?.name === "Agent"
                        ) {
                          setValue(`${socialMediaId}`, "", formOptions);
                        }
                        if (
                          AgentandSocialMedia?.find(
                            (item) => item?.code == referredByeVal
                          )?.name === "Social Media"
                        ) {
                          setValue(`${agentName}`, "", formOptions);
                        }
                      }, 2000);
                    }}
                  >
                    <option value={""}>Select</option>

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
                  {touchFields?.referredById &&
                    educationFormError?.referredById && (
                      <div className="invalid-feedback">
                        Please select Referred by
                      </div>
                    )}
                </div>

                {AgentandSocialMedia?.find(
                  (item) => item?.code == referredByeVal
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
                      {touchFields?.agentCode &&
                        educationFormError?.agentCode && (
                          <div className="invalid-feedback">
                            Please select agent
                          </div>
                        )}
                    </div>
                  </div>
                )}
                {AgentandSocialMedia?.find(
                  (item) => item?.code == referredByeVal
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
                      {touchFields?.socialMediaCode &&
                        educationFormError?.socialMediaCode && (
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
                    defaultValue={studentTypeVal}
                    value={studentTypeVal}
                    className="form-select"
                    {...register(`${studentTypeName}`, { required: true })}
                    onChange={({ target: { value } }) => {
                      setValue(studentTypeName, value, formOptions);
                      if (
                        value?.toLowerCase().includes(CommonEnums.MANAGEMENT)
                      ) {
                        setValue("sponsor.isSponsored", "no", formOptions);
                        return;
                      }
                      if (value?.toLowerCase().includes(CommonEnums.REGULAR)) {
                        setValue("sponsor.isSponsored", "no", formOptions);
                        return;
                      }
                      if (value?.toLowerCase().includes(CommonEnums.BURSARY)) {
                        setValue("sponsor.isSponsored", "yes", formOptions);
                        return;
                      } else setValue("sponsor.isSponsored", "", formOptions);
                      return;
                    }}
                  >
                    {" "}
                    <option value={""}>Select Type</option>
                    {studyTypeData &&
                      studyTypeData
                        .filter((item) => item.code !== "MGMTBURSARY")
                        .map(({ code, name }) => (
                          <option
                            selected={code === studentTypeVal}
                            key={code}
                            value={code}
                          >
                            {name}
                          </option>
                        ))}
                  </select>
                  {touchFields?.studentTypeCode &&
                    educationFormError?.studentTypeCode && (
                      <div className="invalid-feedback">
                        Please select study type
                      </div>
                    )}
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
  font-size: 14px;
  font-family: roboto;
  font-weight: 600;
  border-radius: 2px;
  box-shadow: 0px 0px 30px 0px rgb(82 63 105 / 15%);
  border: 2px solid #fff;
  transition: all 0.5s;
  -moz-transition: all 0.5s;
  -webkit-transition: all 0.5s;
  -ms-transition: all 0.5s;
  -o-transition: all 0.5s;
`;

// const StyleContainer = styled.div`
//   display: flex;
//   column-gap: 10px;
//   padding: 1rem 0.2rem;
// `;
