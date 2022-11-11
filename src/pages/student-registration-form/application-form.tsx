import React, { useEffect, useState, useMemo } from "react";
import PersonalInfoForm from "../../components/Form/personalInfoForm";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import styled from "styled-components";
import { Grid, Container, Box } from "@material-ui/core";
import { StyledLink } from "../../components/student/login";
import StepperComponent from "../../components/stepper/stepper";
import { Green, StyledLabel } from "../../components/common/common";
import DoneOutlinedIcon from "@material-ui/icons/DoneOutline";
import StyledButton from "../../components/button/button";
import { AddressForm } from "../../components/Form/AddressForm";
import { EducationForm } from "../../components/Form/EducationForm";
import { KinDetailsForm } from "../../components/Form/KinForm";
import { EmployedForm } from "../../components/Form/EmployedForm";
import { SponsoredForm } from "../../components/Form/SponsoredCandidateForm";
import { AuthApi } from "../../service/Api";
import {
  Agent,
  EmploymentIndustry,
  EmploymentStatus,
  Gender,
  HighestQualificationElement,
  IMasterData,
  Language,
  Mode,
  Nationality,
  Race,
  ReferredBy,
  SocialMedia,
} from "../../components/common/types";
import { mapFormData } from "../../Util/Util";
import { useRouter } from "next/router";
import Payment from "../../components/payment/payment";

const ApplicationForm = (props: any) => {
  const router = useRouter();

  const [studentData, setStudentData] = useState<any>(null);
  const [isFormSubmitted, setSubmitted] = useState<boolean>(false);
  const [isPaymentDone, setPaymentDone] = useState<boolean>(false);
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isDocumentUploadDone, setDocumentUploadDone] =
    useState<boolean>(false);
  const [masterData, setMasterData] = useState<IMasterData | null>(null);
  const [agentDetail, setAgentDetail] = useState<Agent[]>([]);
  const methods = useForm({
    mode: "onChange",
    reValidateMode: "onBlur",
    defaultValues: useMemo(() => {
      return studentData;
    }, [studentData]),
  });
  const {
    register,
    formState: { isValid, isDirty },
    watch,
    setValue,
    getValues,
  } = methods;
  const allFields = watch();

  // console.log({allFields})
  useEffect(() => {
    if (studentData) {
      mapFormDefaultValue();
    }
  }, [studentData]);
  const navigateBack = () => {
    setSubmitted(false);
    setActiveStep((prevState: number) => prevState - 1);
  };
  const navigateNext = () => {
    setSubmitted(true);
    setPaymentDone(true);
    setActiveStep((prevState: number) => prevState + 1);
  };
  const mapFormDefaultValue = () => {
    for (let [key, value] of Object.entries(studentData)) {
      setValue(key, value, { shouldDirty: true, shouldTouch: true });
    }
  };

  const submitFormData = (data: object, isDrafSave?: boolean) => {
    setSubmitted(true);
    setActiveStep(activeStep + 1);
    const formData = { ...data };

    const {
      postalAddress = null,
      postalCountry = null,
      postalZipCode = null,
      postalCity = null,
      postalState = null,
      isSameAsPostalAddress = null,
      address: residentialAddresses = {},
      ...rest
    } = { ...(formData as any) };
    const addressObj = {
      postalAddress,
      postalCountry,
      postalZipCode,
      postalCity,
      postalState,
      isSameAsPostalAddress,
    };
    let request = mapFormData(
      {
        ...rest,
        address: { ...addressObj, ...residentialAddresses },
      },
      isDrafSave
    );
    console.log({ request });

    const studentId = JSON.parse(
      sessionStorage?.getItem("studentId") as any
    )?.id;
    AuthApi.put(`/user/${studentId}`, request)
      .then(({ data }) => {
        console.log({ data });
      })
      .catch((err) => console.log(err));
  };
  const onSubmit = (data: any, isDrafSave?: boolean) => {
    // console.log(data);
    submitFormData(data, isDrafSave);
  };
  const getMasterData = () => {
    AuthApi.get("global/master/data")
      .then(({ data }) => {
        setMasterData(data?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getAgentDetail = () => {
    AuthApi.get("global/agent")
      .then((res) => {
        setAgentDetail(res?.data?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getUserDetail = () => {
    const isAuthenticate = JSON.parse(
      sessionStorage?.getItem("authenticate") as any
    );
    const studentId = JSON.parse(
      sessionStorage?.getItem("studentId") as any
    )?.id;
    if (!isAuthenticate) {
      router.push("/");
    } else {
      AuthApi.get(`/user/${studentId}`)
        .then(({ data: response }) => {
          setStudentData(response?.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    getUserDetail();
    getMasterData();
    getAgentDetail();
  }, []);

  const language = masterData?.languages as Language[];
  const nationalities = masterData?.nationalities as Nationality[];
  const highestQualifications =
    masterData?.highestQualifications as HighestQualificationElement[];
  const qualifications =
    masterData?.qualifications as HighestQualificationElement[];
  const race = masterData?.races as Race[];
  const referredBy = masterData?.referredBy as ReferredBy[];
  const socialMedias = masterData?.socialMedias as SocialMedia[];
  const sponsorModes = masterData?.sponsorModes as Mode[];
  const studyModes = masterData?.studyModes as Mode[];
  const genders = masterData?.genders as Gender[];
  const employmentStatus = masterData?.employmentStatus as EmploymentStatus[];
  const employmentIndustries =
    masterData?.employmentIndustries as EmploymentIndustry[];
  return (
    <MainContainer>
      <Grid>
        <CommonHeader>
          <Container>
            <div className="row">
              <div className="col-md-6">
                <LogoContainer>
                  <div
                    style={{
                      borderRight: "3px solid white",
                      color: "white",
                      paddingRight: "0.5rem",
                    }}
                  >
                    <img
                      src={"/assets/images/RBS_logo_2_white.png"}
                      width="180px"
                    />
                  </div>
                  <div>
                    <CustomStyledLink>
                      Regenesys Application Form
                    </CustomStyledLink>
                  </div>
                </LogoContainer>
              </div>
              <div className="col-md-6">
                <UserInfoConatiner>
                  <div className="mobNum" style={{ color: "white" }}>
                    Hi {allFields && allFields?.mobileNumber}
                  </div>
                  <div>
                    <CustomStyledLink className="mobNum">
                      Regenesys Application Form
                    </CustomStyledLink>
                  </div>
                </UserInfoConatiner>
              </div>
            </div>
          </Container>
        </CommonHeader>
      </Grid>
      <StepperContainer>
        <StepperComponent isFormSubmitted={isFormSubmitted} isPaymentDone={isPaymentDone}  active={activeStep} />
      </StepperContainer>
      <>
        <FormContainer>
          <FormProvider {...methods}>
            {" "}
            {!isFormSubmitted && (
              <Container>
                <div className="row">
                  <form onSubmit={(data) => onSubmit(data)}>
                    <PersonalInfoForm
                      genders={genders}
                      nationalities={nationalities}
                      homeLanguage={language}
                      race={race}
                    />

                    <AddressForm />
                    <EducationForm
                      highestQualifications={highestQualifications}
                      qualificationArr={qualifications}
                      studyModes={studyModes}
                      referredByArr={referredBy}
                      socialMedias={socialMedias}
                      agentArr={agentDetail}
                    />
                    <KinDetailsForm />
                    <EmployedForm
                      employmentStatusArr={employmentStatus}
                      employerArr={[]}
                      employmentIndustries={employmentIndustries}
                    />
                    <SponsoredForm sponsorModeArr={sponsorModes} />
                  </form>
                </div>
              </Container>
            )}
            {isFormSubmitted && (
              <>
                <Payment
                  qualifications={qualifications}
                  studyMode={studyModes}
                  // navigateBack={navigateBack}
                  navigateNext={navigateNext}
                />
              </>
            )}
          </FormProvider>
        </FormContainer>
        <FooterConatiner className="container-fluid d-flex justify-content-center mt-1">
          <div className="row">
            <div className="col-md-12">
              {!isFormSubmitted && (
                <>
                  <div className="form-check">
                    <input
                      className="form-check-input me-2"
                      type="checkbox"
                      checked={allFields?.isAgreedTermsAndConditions}
                      id="flexCheckDefault"
                      {...register("isAgreedTermsAndConditions", {
                        required: true,
                      })}
                    />
                    <label className="form-check-label">
                      <strong className="me-1">I have read and agreed</strong>
                      <a style={{ color: Green }} href="#">
                        terms and condition?
                      </a>
                    </label>
                  </div>
                  <div className="mt-4 text-center">
                    <StyledButton
                      onClick={() => onSubmit(getValues(), true)}
                      type="button"
                      disabled={!isDirty}
                      isGreenWhiteCombination={true}
                      title={"Save as Draft"}
                    />
                    &nbsp;&nbsp;&nbsp;
                    <StyledButton
                      onClick={methods.handleSubmit(
                        (data) => onSubmit(data) as any
                      )}
                      disabled={!isValid}
                      title={"Save & Next"}
                    />
                    <StyleFooter>
                      <span style={{ color: "#131718" }}>
                        Copyright @ 2015 - 2022{" "}
                        <a href="https://www.regenesys.net/">
                          Regenesys Business School
                        </a>
                      </span>
                    </StyleFooter>
                  </div>
                </>
              )}
              {isFormSubmitted && activeStep === 1 && (
                <div className="mt-4 text-center">
                  <StyledButton
                    onClick={navigateBack}
                    type="button"
                    disabled={!isDirty}
                    isGreenWhiteCombination={true}
                    title={"Back"}
                  />
                </div>
              )}
            </div>
          </div>
        </FooterConatiner>
      </>
    </MainContainer>
  );
};

export default ApplicationForm;
export const MainContainer = styled.div`
  background: #dde1e3;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  padding-bottom: 1rem;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch !important;
`;
const FooterConatiner = styled.div`
  width: 100%;
  height: 310px;
  margin-bottom: 4rem;
  .form-check-input:checked {
    background-color: ${Green};
    border-color: #0d6efd;
  }
  .form-check-input:checked[type="checkbox"] {
  }
  @media screen and (min-width: 600px) and (max-width: 950px) {
    width: 100%;
    height: 100%;
  }
`;
const CustomStyledLink = styled(StyledLink)`
  font-size: 24px;
  font-weight: 700px;
  color: #ffd600 !important;
  @media (max-width: 510px) {
    font-size: 15px;
  }
`;
export const FormContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

const CommonHeader = styled.div`
  width: 100%;
  padding: 0.5rem;
  background: #008554;
`;

const LogoContainer = styled.div`
  display: flex;
  column-gap: 10px;
  width: 100%;
  @media (max-width: 510px) {
    width: 100%;
    img {
      width: 142px;
    }
  }
`;

const UserInfoConatiner = styled.div`
  text-align: right;
  .mobNum {
    font-size: 16px;
  }
  @media (max-width: 510px) {
    .mobNum {
      font-size: 14px;
    }
  }
`;
const StyleFooter = styled.div`
  osition: relative;
  color: white;
  width: 100%;
  margin-top: 4rem;
  a,
  a:hover {
    color: ${Green};
  }
`;

export const StepperContainer = styled(Container)`
  width: 50%;
  @media (max-width: 510px) {
    width: 100%;
  }
`;
