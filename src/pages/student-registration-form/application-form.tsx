import { useEffect, useState, useMemo } from "react";
import PersonalInfoForm from "../../components/Form/personalInfoForm";
import { useForm, FormProvider } from "react-hook-form";
import styled from "styled-components";
import { Container, Snackbar } from "@material-ui/core";
import StepperComponent from "../../components/stepper/stepper";
import { Green } from "../../components/common/common";
import StyledButton from "../../components/button/button";
import { AddressForm } from "../../components/Form/AddressForm";
import { EducationForm } from "../../components/Form/EducationForm";
import { KinDetailsForm } from "../../components/Form/KinForm";
import { EmployedForm } from "../../components/Form/EmployedForm";
import { SponsoredForm } from "../../components/Form/SponsoredCandidateForm";
import { AcadmicApi, AuthApi } from "../../service/Axios";
import { Agent, IMasterData, IOption } from "../../components/common/types";
import {
  getUploadDocumentUrl,
  mapFormData,
  uploadDocuments,
} from "../../Util/Util";
import { useRouter } from "next/router";
import Payment from "../../components/payment/payment";
import Header from "../../components/common/header";
import DocumentUploadForm from "../../components/Form/DocumentUploadForm";
import CheckCircleRoundedIcon from "@material-ui/icons/CheckCircleRounded";
import {
  StyledLink,
  SuccessMsgContainer,
  ToasterContainer,
} from "../../components/student/style";
import {
  CommonApi,
  MagicNumbers,
  RoutePaths,
} from "../../components/common/constant";
const isValidFileType = (files: any[]) => {
  return (files || []).filter((file) => file?.error === true);
};
const ApplicationForm = (props: any) => {
  const router = useRouter();

  const [studentData, setStudentData] = useState<any>(null);
  const [isFormSubmitted, setSubmitted] = useState<boolean>(false);
  const [isPaymentDone, setPaymentDone] = useState<boolean>(false);
  const [showDraftSavedToast, setShowDraftSaveToast] = useState<any>({
    message: "",
    success: false,
    show: false,
  });
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
    formState: { isValid, isDirty, errors },
    watch,
    setValue,
    getValues,
    trigger,
    control,
  } = methods;
  useEffect(() => {
    getUserDetail();
    getMasterData();
    getAgentDetail();
    getIntrestedQualification();
  }, []);
  useEffect(() => {
    if (studentData) {
      mapFormDefaultValue();
    }
  }, [studentData]);
  const allFields = watch();
  console.log({ allFields });

  const isValidDocument =
    isValidFileType(allFields?.document?.uploadedDocs).length === 0;
  useEffect(() => {
    if (window && router.query?.isFormSubmittedAlready) {
      const isFormSubmittedAlready = JSON.parse(
        router?.query?.isFormSubmittedAlready as any
      );
      const isPaymentFail = JSON.parse(router?.query?.isPaymentFail as any);
      if (isFormSubmittedAlready && isPaymentFail) {
        setActiveStep(1);
        setSubmitted(true);
      }
    }
  }, [router.query]);

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
    const formData = { ...data };

    const {
      postalAddress = "",
      postalCountry = "",
      postalZipCode = "",
      postalCity = "",
      postalState = "",
      isSameAsPostalAddress = "",
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

    const studentId = JSON.parse(
      sessionStorage?.getItem("studentId") as any
    )?.id;
    // if (true) {
    //   setSubmitted(true);
    //   setActiveStep(activeStep + 1);
    // }
    if (studentId) {
      updateUser(studentId, request, isDrafSave);
    } else {
      checkValidationForDraftSave() &&
        createUser({ ...request, isDraft: true });
    }
  };
  const checkValidationForDraftSave = () => {
    let isValid = true;
    const {
      lead: {
        firstName,
        lastName,
        email,
        mobileNumber,
        genderId,
        dateOfBirth,
        identificationPassportNumber,
        nationalityId,
      },
    } = { ...allFields } as any;
    const feildObject: any = {
      firstName,
      lastName,
      email,
      mobileNumber,
      genderId,
      dateOfBirth,
      identificationPassportNumber,
      nationalityId,
    };

    for (let [key, value] of Object.entries(feildObject)) {
      if (
        !feildObject[key] ||
        feildObject[key]?.length === 0 ||
        feildObject[key] === 0
      ) {
        isValid = false;

        setValue(key, null, {
          shouldTouch: true,
          shouldDirty: true,
          shouldValidate: true,
        });
        trigger(key);
      } else {
        isValid = true;
      }
    }
    return isValid;
  };
  const updateUser = (
    studentId: string,
    request: any,
    isDrafSave: boolean | undefined
  ) => {
    AuthApi.put(`${CommonApi.GETUSERDETAIL}/${studentId}`, request)
      .then(({ data }) => {
        setShowDraftSaveToast({
          success: true,
          message: "Data has been successfully saved.",
          show: true,
        });
        if (!isDrafSave) {
          setSubmitted(true);
          setActiveStep(activeStep + 1);
        }
        if (activeStep === MagicNumbers.TWO) {
          setActiveStep(2);
          setDocumentUploadDone(true);
          setPaymentDone(true);
          uploadStudentDocs();
        }
      })
      .catch((err) => {
        setShowDraftSaveToast({
          success: false,
          message: err?.message,
          show: true,
        });
        console.log(err);
      });
  };
  const uploadFiles = (fileUrl: string, file: File) => {
    return uploadDocuments(fileUrl, file)
      .then((res) => {
        showToast(true, "Document Upload Successfully");
        return res;
      })
      .catch((err) => {
        showToast(false, err.message);

        console.log(err.message);
      });
  };
  const uploadStudentDocs = () => {
    const { uploadedDocs = [] as File[] } = allFields;
    let count = 0;
    uploadedDocs.forEach((file: File) => {
      getUploadDocumentUrl(file).then((res) => {
        if (res.status === 200) {
          count = count + 1;
          uploadFiles(res, file);
        } else {
          showToast(false, res.response.data.message);
          console.log(res.response.data.messag);
        }
      });
    });
    if (count === uploadedDocs.length) {
      router.push(RoutePaths.Payment_Success);
    }
  };
  const showToast = (success: boolean, message: string) => {
    setShowDraftSaveToast({
      success: success,
      message: message,
      show: true,
    });
  };

  const createUser = (request: any) => {
    const studentMobile =
      sessionStorage &&
      JSON.parse(sessionStorage?.getItem("studentMobile") as any);
    AuthApi.post(CommonApi.SAVEUSER, {
      mobileNumber: studentMobile?.mobileNumber,
      mobileCountryCode: studentMobile?.countryCodeNumber,
      ...request,
    })
      .then(({ data }) => {
        console.log(data);
        sessionStorage.setItem(
          "studentId",
          JSON.stringify({ id: data?.data?.id })
        );
      })
      .catch((err) => {
        console.log({ err });
        setShowDraftSaveToast({
          success: false,
          message: err?.message,
          show: true,
        });
      });
  };
  const onSubmit = (data: any, isDrafSave?: boolean) => {
    submitFormData(data, isDrafSave);
  };
  const getMasterData = () => {
    AuthApi.get(CommonApi.GETMASTERDATA)
      .then(({ data }: any) => {
        setMasterData({ ...masterData, ...data?.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getAgentDetail = () => {
    AuthApi.get(CommonApi.GETAGENT)
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
    const studentMobile =
      sessionStorage && JSON.parse(sessionStorage?.getItem("studentId") as any);
    if (studentMobile && window) {
      setValue("mobileNumber", studentMobile?.mobileNumber);
    }
    if (studentId) {
      AuthApi.get(`/user/${studentId}`)
        .then(({ data: response }) => {
          setStudentData(response?.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const getIntrestedQualification = () => {
    AcadmicApi.get(CommonApi.GETINTRESTEDQUALIFICATION)
      .then(({ data }: any) => {
        console.log({ data });
        setMasterData({
          ...(masterData as any),
          programs: data.data as IOption[],
        });
      })
      .catch((err) => console.log(err));
  };

  const language = masterData?.languageData as IOption[];
  const nationalities = masterData?.nationalityData as IOption[];
  const highestQualifications =
    masterData?.highestQualificationData as IOption[];
  const programs = masterData?.programs as IOption[];
  const race = masterData?.raceData as IOption[];
  const referredBy = agentDetail as Agent[];
  const socialMedias = masterData?.socialMediaData as IOption[];
  const sponsorModes = masterData?.sponsorModes as IOption[];
  const studyModes = masterData?.studyModeData as IOption[];
  const genders = masterData?.genderData as IOption[];
  const employmentStatus = masterData?.employmentStatusData as IOption[];
  const employmentIndustries = masterData?.employmentIndustries as IOption[];
  const countryData = masterData?.countryData as IOption[];

  const onSkipForNowOnPayment = () => {};
  const onSkipForNowOnDocument = () => {
    setActiveStep(0);
  };
  const { message, success, show } = showDraftSavedToast;

  return (
    <MainContainer>
      <Header />
      <StepperContainer>
        <StepperComponent
          isFormSubmitted={isFormSubmitted}
          isPaymentDone={isPaymentDone}
          active={activeStep}
        />
      </StepperContainer>
      <>
        <FormProvider {...methods}>
          <FormContainer>
            {" "}
            {activeStep === MagicNumbers.ZERO && (
              <>
                <div className="row w-100">
                  <form onSubmit={(data) => onSubmit(data)}>
                    <PersonalInfoForm
                      genders={genders}
                      nationalities={nationalities}
                      homeLanguage={language}
                      race={race}
                    />
                    <AddressForm countryData={countryData} />
                    <EducationForm
                      highestQualifications={highestQualifications}
                      programs={programs}
                      referredByArr={referredBy as any}
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
              </>
            )}
          </FormContainer>
          <FormContainer>
            {activeStep === MagicNumbers.ONE && (
              <>
                <Payment
                  qualifications={highestQualifications}
                  studyMode={studyModes}
                  navigateNext={navigateNext}
                  onSkipForNowOnPayment={onSkipForNowOnPayment}
                  showToast={showToast}
                />
              </>
            )}
            {activeStep === MagicNumbers.TWO && (
              <>
                <DocumentUploadForm
                  allFields={allFields}
                  isValidDocument={isValidDocument}
                />
              </>
            )}
          </FormContainer>
        </FormProvider>
        <FooterConatiner className="container-fluid d-flex justify-content-center mt-1">
          <div className="row">
            <div className="col-md-12">
              <>
                {activeStep === MagicNumbers.ZERO && (
                  <div className="form-check text-center">
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
                )}

                {(activeStep === MagicNumbers.ZERO ||
                  activeStep === MagicNumbers.TWO) && (
                  <div className="mt-4 text-center">
                    <>
                      {activeStep == 2 && (
                        <StyledButton
                          onClick={onSkipForNowOnDocument}
                          type="button"
                          className="me-2 mb-1"
                          isGreenWhiteCombination={true}
                          title={"Skip for Now"}
                        />
                      )}
                    </>
                    <StyledButton
                      onClick={() => onSubmit(getValues(), true)}
                      type="button"
                      disabled={
                        (!isDirty && !isValidDocument) || !isValidDocument
                      }
                      isGreenWhiteCombination={true}
                      title={"Save as Draft"}
                    />
                    &nbsp;&nbsp;&nbsp;
                    <StyledButton
                      onClick={methods.handleSubmit(onSubmit as any)}
                      disabled={!isValid && !isValidDocument}
                      title={activeStep < 2 ? "Save & Next" : "Submit"}
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
                )}
              </>
              {activeStep === MagicNumbers.ONE && (
                <div className="mt-5 text-center">
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
      {show && (
        <Snackbar
          autoHideDuration={1000}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          open={show}
          onClose={() => {
            setShowDraftSaveToast(!showDraftSavedToast);
          }}
          key={"bottom"}
        >
          <ToasterContainer success={success}>
            <CheckCircleRoundedIcon
              style={{ color: "#0eb276", fontSize: "30px" }}
            />
            <SuccessMsgContainer>
              <StyledLink>
                {success ? "Success" : "Error"}
                <br />
                <span
                  style={{
                    color: "black",
                    fontSize: "14px",
                    fontWeight: 600,
                  }}
                >
                  {message}
                </span>
              </StyledLink>
            </SuccessMsgContainer>
          </ToasterContainer>
        </Snackbar>
      )}
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

export const FormContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  flex-wrap: wrap;
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
