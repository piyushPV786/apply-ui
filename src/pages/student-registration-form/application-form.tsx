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

const mockData = {
  statusCode: 200,
  message: "Master data loaded successfully",
  data: {
    languages: [
      {
        id: 1,
        language: "English",
      },
    ],
    nationalities: [
      {
        id: 1,
        nationality: "Indian",
      },
    ],
    qualifications: [
      {
        id: 1,
        qualification: "M.T.B",
      },
    ],
    races: [
      {
        id: 1,
        race: "Asian",
      },
    ],
    genders: [
      {
        id: 1,
        gender: "Male",
      },
      {
        id: 2,
        gender: "Female",
      },
    ],
    highestQualifications: [
      {
        id: 1,
        qualification: "B.E",
      },
    ],
    referredBy: [
      {
        id: 1,
        referredBy: "agent",
        agentName: null,
      },
    ],
    studyModes: [
      {
        id: 1,
        mode: "Full-time",
      },
    ],
  },
};

const ApplicationForm = (props: any) => {
  const [studentData, setStudentData] = useState<any>(null);
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
    formState: { isValid },
    watch,
    setValue,
    getValues,
  } = methods;

  useEffect(() => {
    if (studentData) {
      mapFormDefaultValue();
    }
  }, [studentData]);

  const mapFormDefaultValue = () => {
    // for (let [key, value] of Object.entries(studentData)) {
    //   setValue(key, value, { shouldDirty: true,shouldTouch:true });
    // }
  };
  const submitFormData = (data: object) => {
    const formData = { ...data };

    const {
      postalAddress = null,
      postalCountry = null,
      postalZipCode = null,
      postalCity = null,
      postalState = null,
      isSameAsPostalAddress = null,
      Education = {},
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
    let request = mapFormData({
      ...rest,
      ...Education,
      address: { ...addressObj, ...residentialAddresses },
    });

    console.log({ request });
    AuthApi.put("/user/53", request)
      .then(({ data }) => {
        console.log({ data });
      })
      .catch((err) => console.log(err));
  };
  const onSubmit = (data: any) => {
    console.log(data);
    submitFormData(data);
  };
  const allFields = watch();

  const getMasterData = () => {
    AuthApi.get("global/master/data")
      .then(({ data }) => {
        // console.log({ data });
        setMasterData(data?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getAgentDetail = () => {
    AuthApi.get("global/agent")
      .then((res) => {
        // console.log(res);
        setAgentDetail(res?.data?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getUserDetail = () => {
    AuthApi.get("/user/53")
      .then(({ data: response }) => {
        setStudentData(response?.data);
        // console.log(res.data, "ata");
      })
      .catch((err) => {
        console.log(err);
      });
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
        <StepperComponent active={0} />
      </StepperContainer>
      <FormContainer>
        <FormProvider {...methods}>
          {" "}
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
        </FormProvider>
      </FormContainer>
      <FooterConatiner className="container-fluid d-flex justify-content-center mt-1">
        <div className="row">
          <div className="col-md-12">
            <div className="form-check">
              <input
                className="form-check-input me-2"
                type="checkbox"
                checked={allFields?.isAgreedTermsAndConditions}
                id="flexCheckDefault"
                {...register("isAgreedTermsAndConditions", { required: true })}
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
                onClick={() => onSubmit(getValues())}
                type="submit"
                isGreenWhiteCombination={true}
                title={"Save as Draft"}
              />
              &nbsp;&nbsp;&nbsp;
              <StyledButton
                onClick={methods.handleSubmit(onSubmit)}
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
          </div>
        </div>
      </FooterConatiner>
    </MainContainer>
  );
};

export default ApplicationForm;
const MainContainer = styled.div`
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
const FormContainer = styled.div`
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

const StepperContainer = styled(Container)`
  width: 50%;
  @media (max-width: 510px) {
    width: 100%;
  }
`;
