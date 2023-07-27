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
import { capitalizeFirstLetter } from "../../Util/Util";
import {
  formDirtyState,
  onlyAlphaNumericSpace,
  sortAscending,
} from "../../Util/Util";
import EducationImg from "../../../public/assets/images/education-svgrepo-com.svg";
import Image from "next/image";
import { FinanceApi } from "../../service/Axios";
import {
  AgentandSocialMedia,
  CommonApi,
  CommonEnums,
} from "../common/constant";
import { GreenText } from "../student/style";
import Spinner from "../../../public/assets/images/spinner.svg";

const parentKey = "education";
const program = `${parentKey}.programCode`;
const studyMode = `${parentKey}.studyModeCode`;
const highestQualification = `${parentKey}.qualificationCode`;
const highSchoolName = `${parentKey}.highSchoolName`;
const referredBy = `${parentKey}.referredById`;
const agentName = `${parentKey}.agentCode`;
const socialMediaId = `${parentKey}.socialMediaCode`;
const studentTypeName = `${parentKey}.studentTypeCode`;
const applicationFeesKey = `${parentKey}.applicationFees`;
const internationDegree = `${parentKey}.isInternationDegree`;
interface IEducationProps {
  highestQualifications: IOption[];
  programs: IOption[];
  socialMedias: IOption[];
  agentArr: IOption[];
  studyTypeData: IOption[];
  isApplicationEnrolled: boolean;
  leadId: string;
}

const FeeCard = (props: any) => {
  const { setSelectedMode = () => {}, ...rest } = { ...props };
  return (
    <> 
      <StyleFeeCards 
        style={{
          border:
            props?.selected === props?.fee
              ? "2px solid green"
              : "2px solid #dde1e3",
        }}
      >
        <div className="fee-details">R {props?.fee}</div>
        <div className="fee-mode" style={{ color: `${Green}` }}>{props?.feeMode}</div>
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
    unregister,
  } = useFormContext();
  const [studyModeQualification, setStudyModeQualification] = useState<
    IStudyModeQualification[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);
  const {
    agentArr,
    highestQualifications,
    programs,
    socialMedias,
    studyTypeData,
    isApplicationEnrolled,
    leadId,
  } = props;
  const programVal = watch(program);
  const studyModeVal = watch(studyMode);
  const highestQualificationVal = watch(highestQualification);
  const highSchoolNameVal = watch(highSchoolName);
  const referredByeVal = watch(referredBy);
  const agentNameVal = watch(agentName);
  const socialMediaVal = watch(socialMediaId);
  const studentTypeVal = watch(studentTypeName);
  const internationDegreeVal = watch(internationDegree);
  const educationFormError = errors[parentKey] as any;
  const touchFields = touchedFields[parentKey];

  useEffect(() => {
    if (
      leadId &&
      programVal &&
      programVal.length > 0 &&
      studyModeQualification.length === 0
    ) {
      getQualificationStudyModeData(programVal);
    }
  }, [programVal]);
  useEffect(() => {
    if (internationDegreeVal === true) {
      setValue(internationDegree, "yes", formDirtyState);
    } else if (internationDegreeVal === false) {
      setValue(internationDegree, "no", formDirtyState);
    }
  }, [internationDegreeVal]);

  const getQualificationStudyModeData = async (programCode: string) => {
    setLoading(true);
    FinanceApi.get(`${CommonApi.GETSTUDYMODEPROGRAMS}/${programCode}`)
      .then((res) => {
        const courseFeesDetail = res?.data?.data;
        let applicationFees;
        courseFeesDetail.forEach((item) =>
          item.studyModes.forEach((application) => {
            if (application.studyModeCode === "APPLICATION") {
              applicationFees = application;
            }
          })
        );

        setValue(
          applicationFeesKey,
          applicationFees?.fees[0]?.fee,
          formDirtyState
        );
        setStudyModeQualification(courseFeesDetail);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const selectedStudyModeIndex =
    studyModeQualification[0]?.studyModes.findIndex(
      (item) => item?.studyModeCode === studyModeVal
    );
  return (
    <>
      <StyledAccordion className="card-shadow" defaultExpanded={true} key="education" id="education">
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
                      setValue(e.target.name, e.target.value, formDirtyState);
                      getQualificationStudyModeData(e.target.value);
                    }}
                    disabled={isApplicationEnrolled}
                    value={programVal}
                    defaultValue={programVal}
                  >
                    <option value={""}>Select Interested Qualification</option>
                    {programs &&
                      programs?.map(({ code, name }) => (
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
                      select your interested program
                    </div>
                  )}
                </div>
              </div>
              {loading && (
                <div className="col-md-4">
                  <div
                    className="d-flex justify-content-center align-items-center"
                    style={{ height: "100px" }}
                  >
                    <Image src={Spinner} alt="spinner" />
                  </div>
                </div>
              )}
              {studyModeQualification.length > 0 && (
                <div className="col-md-4">
                  <StyledLabel required>Study Mode & Fee</StyledLabel>

                  <div className="mb-4">
                    {studyModeQualification &&
                      studyModeQualification.map(({ studyModes }) => {
                        {
                          return (
                            studyModes &&
                            studyModes.map(({ studyModeCode }) => {
                              return (
                                <>
                                  {studyModeCode === "APPLICATION" ? null : (
                                    <div className="form-check form-check-inline">
                                      <input
                                        disabled={isApplicationEnrolled}
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
                                            formDirtyState
                                          );
                                        }}
                                        value={studyModeCode}
                                        checked={studyModeVal == studyModeCode}
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
                      })}
                    <StyleContainer className="fee-cards">
                      {studyModeQualification &&
                        studyModeQualification[0]?.studyModes[
                          selectedStudyModeIndex
                        ]?.fees
                          ?.sort((a, b) => sortAscending(a, b, "feeMode"))
                          .map(({ fee, feeMode }: IFee, index) => (
                            <div key={index} className="fee-card-list">
                              <FeeCard
                                key={fee}
                                fee={fee}
                                feeMode={feeMode}
                                uniqueId={fee}                             
                              />
                            </div>
                          ))}
                    </StyleContainer>
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
                  {educationFormError &&
                    educationFormError?.qualificationCode && (
                      <div className="invalid-feedback">
                        Please select Highest Qualification
                      </div>
                    )}
                </div>
              </div>
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
                        setValue(
                          name,
                          capitalizeFirstLetter(value),
                          formDirtyState
                        );
                      }
                    }}
                  />
                  {educationFormError && educationFormError?.highSchoolName && (
                    <div className="invalid-feedback">
                      Please enter high school name
                    </div>
                  )}
                </div>
              </div>
              <div className="col-md-4">
                <div className="mb-4">
                  <StyledLabel required>
                    Are you an international degree holder?
                  </StyledLabel>
                  <br />
                  <div className="form-check form-check-inline">
                    <input
                      key={`${internationDegreeVal}yes`}
                      onClick={() => {
                        setValue(internationDegree, "yes", formDirtyState);
                      }}
                      className="form-check-input me-2"
                      type="radio"
                      {...(register(internationDegree, {
                        required: true,
                      }) as any)}
                      value="yes"
                      checked={internationDegreeVal === "yes"}
                    />
                    <label className="form-check-label">
                      {internationDegreeVal === "yes" ? (
                        <GreenText>Yes</GreenText>
                      ) : (
                        "Yes"
                      )}
                      <br />
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      key={`${internationDegreeVal}no`}
                      onClick={() => {
                        setValue(internationDegree, "no", formDirtyState);
                      }}
                      className="form-check-input me-2"
                      type="radio"
                      {...(register(internationDegree, {
                        required: true,
                      }) as any)}
                      value="no"
                      checked={internationDegreeVal === "no"}
                    />
                    <label className="form-check-label">
                      {internationDegreeVal === "No" ? (
                        <GreenText>No</GreenText>
                      ) : (
                        "No"
                      )}
                      <br />
                    </label>
                  </div>

                  {educationFormError &&
                    educationFormError?.isInternationDegree && (
                      <div className="invalid-feedback">
                        international degree is required
                      </div>
                    )}
                </div>
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
                      setValue(studentTypeName, value, formDirtyState);
                      setValue("sponsor", null, formDirtyState);
                      if (
                        value?.toLowerCase().includes(CommonEnums.MANAGEMENT)
                      ) {
                        setValue("sponsor.isSponsor", "no", formDirtyState);
                        return;
                      }
                      if (value?.toLowerCase().includes(CommonEnums.REGULAR)) {
                        setValue("sponsor.isSponsor", "no", formDirtyState);
                        return;
                      }
                      if (value?.toLowerCase().includes(CommonEnums.BURSARY)) {
                        setValue("sponsor.isSponsor", "yes", formDirtyState);
                        return;
                      } else setValue("sponsor.isSponsor", "", formDirtyState);
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
                  {educationFormError &&
                    educationFormError?.studentTypeCode && (
                      <div className="invalid-feedback">
                        Please select Student type
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
                      setValue(name, value, formDirtyState);
                      setTimeout(() => {
                        if (value === "AGENT") {
                          setValue(socialMediaId, "", formDirtyState);
                          unregister(socialMediaId, {
                            keepError: false,
                            keepIsValid: true,
                          });
                        }
                        if (value === "SOCIALMEDIA") {
                          setValue(agentName, "", formDirtyState);
                          unregister(agentName, {
                            keepError: false,
                            keepIsValid: true,
                          });
                        }
                      }, 0);
                    }}
                  >
                    <option value={""}>Select Referred Media</option>

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
                  {educationFormError && educationFormError?.referredById && (
                    <div className="invalid-feedback">
                      Please select Referred by
                    </div>
                  )}
                </div>

                {referredByeVal === "AGENT" && (                
                    <div className="mb-4 others">
                      <StyledLabel required>Agent Name</StyledLabel>
                      <select
                        className="form-select"
                        {...register(`${agentName}`, {
                          required: referredByeVal === "AGENT",
                        })}
                        value={agentNameVal}
                      >
                        <option value={""}>Select Agent</option>
                        {agentArr &&
                          agentArr.map(({ name }) => (
                            <option
                              selected={name === agentNameVal}
                              key={name}
                              value={name}
                            >
                              {name}
                            </option>
                          ))}
                      </select>
                      {educationFormError && educationFormError?.agentCode && (
                        <div className="invalid-feedback">
                          Please select agent
                        </div>
                      )}
                    </div>
                  
                )}
                {referredByeVal === "SOCIALMEDIA" && (
                  <div className="">
                    <div className="mb-4 others">
                      <StyledLabel required>Social Media</StyledLabel>
                      <select
                        className="form-select"
                        value={socialMediaVal}
                        {...register(`${socialMediaId}`, {
                          required: referredByeVal === "SOCIALMEDIA",
                        })}
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
                      {educationFormError &&
                        educationFormError?.socialMediaCode && (
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
  padding: 6px;
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

const StyleContainer = styled.div`
  display: flex;
  column-gap: 10px;
  padding: 1rem 0.2rem;
`;
