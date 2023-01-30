import { useEffect, useState } from "react";
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
import { IMasterData, IOption } from "../../components/common/types";
import {
  formOptions,
  getUploadDocumentUrl,
  isEmpty,
  isObjectEmpty,
  mapFormData,
  transformFormData,
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
  acceptedKeysToMap,
  CommonApi,
  MagicNumbers,
  RoutePaths,
} from "../../components/common/constant";
const mockData = {
  isAgreedTermsAndConditions: true,
  lead: {
    id: 84,
    leadCode: "RLEAD00000074",
    firstName: "Shashank test update",
    middleName: "",
    lastName: "Gupta",
    email: "shashankTest@test.com",
    mobileNumber: "123456789",
    mobileCountryCode: "27",
    dateOfBirth: "1991-12-02",
    identificationNumber: "34543535435",
    gender: "M",
    nationality: "IND",
    language: "HIN",
    race: "INDIAN/ASIAN",
  },
  address: [
    {
      addressType: "POSTAL",
      street: "sdfdsf",
      country: "Indian",
      state: "dwfdsf",
      city: "dsfds",
      zipcode: 34435,
    },
    {
      addressType: "RESIDENTIAL",
      street: "sdfdsf",
      country: "Indian",
      state: "dwfdsf",
      city: "dsfds",
      zipcode: 34435,
    },
  ],
  education: {
    programCode: "BBA-PROG-501",
    studyModeCode: "DISTANCE-ONLINE",
    qualificationCode: "MAT",
    socialMediaCode: "",
    applicationFees: "13000.00",
    programFees: "21000.00",
    programMode: "SEMESTER",
    agentCode: "ABSI",
    highSchoolName: "sdfsdf",
    studentTypeCode: "REGULAR",
    referredById: "AGENT",
  },
};

const isValidFileType = (files: any[]) => {
  if (!files || files.length === 0) return [];
  return files.filter((file) => file?.error === true);
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
  const [leadId, setLeadId] = useState<string>("");
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isDocumentUploadDone, setDocumentUploadDone] =
    useState<boolean>(false);
  const [masterData, setMasterData] = useState<IMasterData | null>(null);
  const [leadDetail, setLeadDetail] = useState<any>(null);
  const methods = useForm({
    mode: "all",
    reValidateMode: "onBlur",
    // defaultValues: useMemo(() => {
    //   // return mockData;
    //   // return studentData;
    // }, [studentData]),
  });
  const {
    register,
    formState: {
      isValid,
      isDirty,
      errors,
      touchedFields,
    },
    watch,
    setValue,
    getValues,
    trigger,
  } = methods;
  useEffect(() => {
    getUserDetail();
    getMasterData();
  }, []);
  const allFields = watch();

  const isValidDocument =
    isValidFileType(allFields?.document?.uploadedDocs).length === 0;

  const navigateBack = () => {
    if (leadDetail?.isPaymentPending || leadDetail?.isDocumentPending) {
      router.back();
      return;
    }
    setSubmitted(false);
    setActiveStep((prevState: number) => prevState - 1);
  };
  const navigateNext = () => {
    setSubmitted(true);
    setPaymentDone(true);
    setActiveStep((prevState: number) => prevState + 1);
  };

  const routeIfStepDone = (routeTo: string) => {
    if (routeTo) {
      switch (routeTo) {
        case "Document":
          setSubmitted(false);
          setActiveStep(2);
          setPaymentDone(true);
          break;
        default:
          break;
      }
    }
  };
  const mapFormDefaultValue = (studentData: any) => {
    for (let [key, value] of Object.entries(studentData)) {
      if (
        (key === "kin" || key === "sponser" || key === "employment") &&
        isObjectEmpty(studentData[key])
      ) {
        return;
      }
      if (acceptedKeysToMap.includes(key)) {
        if (key === "education" && studentData[key]) {
          const valueCode = studentData[key]?.socialMediaCode
            ? "SOCIALMEDIA"
            : studentData[key]?.agentCode
            ? "AGENT"
            : "";
          setValue(key, value, formOptions);
          setValue(`${key}.referredById`, valueCode, formOptions);
          return;
        }
        setValue(key, value, formOptions);
      }
    }
  };
  const updateLead = (
    request: any,
    leadCode: string,
    applicationCode: string,
    activeLeadDetail: any
  ) => {
    if (activeStep === MagicNumbers.TWO) {
      setActiveStep(2);
      setDocumentUploadDone(true);
      setPaymentDone(true);
      uploadStudentDocs();
      return;
    }

    const methodType = applicationCode
      ? AuthApi.put(
          `${CommonApi.SAVEUSER}/${leadCode}/application/${applicationCode}`,
          {
            ...request,
          }
        )
      : AuthApi.post(CommonApi.SAVEUSER, {
          ...request,
        });
    methodType
      .then(({ data: response }) => {
        sessionStorage.setItem(
          "studentId",
          JSON.stringify({
            id: response?.data?.leadData?.id,
            leadCode: response?.data?.leadData?.leadCode,
          })
        );
        sessionStorage.setItem("leadData", JSON.stringify(response?.data));
        activeLeadDetail &&
          sessionStorage.setItem(
            "activeLeadDetail",
            JSON.stringify({ ...activeLeadDetail })
          );

        setShowDraftSaveToast({
          success: true,
          message: response?.message,
          show: true,
        });
        setSubmitted(false);
        setActiveStep(activeStep + 1);
      })
      .catch((err) => {
        console.log(err.message);
        setShowDraftSaveToast({
          success: false,
          message: err?.message,
          show: true,
        });
        setSubmitted(false);

      });
  };
  const updateUserAsDraft = (request, appCode: string) => {
    AuthApi.put(`${CommonApi.SAVEDRAFT}/${appCode}`, {
      ...request,
    })
      .then(({ data }) => {
        setShowDraftSaveToast({
          success: true,
          message: "Saved as draft",
          show: true,
        });
        // setTimeout(() => {
        //   router.push(RoutePaths.Dashboard);
        // }, 2000);
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
  const creatDraft = (request, leadCode) => {
    request.lead.leadCode = leadCode;
    AuthApi.post(`${CommonApi.SAVEDRAFT}`, {
      ...request,
    })
      .then(({ data }) => {
        setShowDraftSaveToast({
          success: true,
          message: "Saved as draft",
          show: true,
        });
        // setTimeout(() => {
        //   router.push(RoutePaths.Dashboard);
        // }, 2000);
      })
      .catch((err) => {
        console.log(err.message);
        setShowDraftSaveToast({
          success: false,
          message: err?.message,
          show: true,
        });
      });
  };
  const submitFormData = (data: object, isDraftSave?: boolean) => {
    const formData = { ...data };

    const {
      isSameAsPostalAddress = "",
      payment = null,
      ...rest
    } = { ...(formData as any) };

    let request = mapFormData({
      ...rest,
    });
    const leadCode = JSON.parse(
      sessionStorage?.getItem("studentId") as any
    )?.leadCode;
    const appCode = JSON.parse(sessionStorage?.getItem("leadData") as any)
      ?.applicationData?.applicationCode;
    const activeLeadDetail = JSON.parse(
      sessionStorage?.getItem("activeLeadDetail") as any
    );
    const draftUpdateCode = activeLeadDetail?.applicationCode || appCode;
    if (leadCode && !isDraftSave) {
      setSubmitted(true);
      request.lead.leadCode = leadCode;
      updateLead(request, leadCode, draftUpdateCode, activeLeadDetail);
      return;
    }
    if (draftUpdateCode && isDraftSave) {
      updateUserAsDraft(request, draftUpdateCode);
      return;
    }
    if (isDraftSave && checkValidationForDraftSave()) {
      checkValidationForDraftSave() && creatDraft(request, leadCode);
      return;
    }
  };

  const checkValidationForDraftSave = () => {
    let isValid = true;
    const {
      lead: { firstName, lastName, email, mobileNumber },
    } = { ...allFields } as any;
    const feildObject: any = {
      firstName,
      lastName,
      email,
      mobileNumber,
    };

    for (let [key, value] of Object.entries(feildObject)) {
      if (
        !feildObject[key] ||
        feildObject[key]?.length === 0 ||
        feildObject[key] === 0
      ) {
        isValid = false;
        const lead = `lead.${key}`;
        setValue(lead, null, {
          shouldTouch: true,
          shouldDirty: true,
          shouldValidate: true,
        });
        trigger(key, { shouldFocus: true });
      }
    }
    return isValid;
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
  const uploadStudentDocs = async () => {
    const {
      document: { uploadedDocs = [] as File[] },
    } = allFields;
    let count = 0;
    const successLength: any[] = [];
    await Promise.all(
      uploadedDocs.map((file: File & { typeCode: string }) => {
        const payload = {
          documentTypeCode: file?.typeCode || "other",
          fileName: file.name,
          fileType: file.type,
          amount: +allFields?.education?.studyModeDetail?.fee || 0,
          paymentModeCode: "OFFLINE",
        };
        return getUploadDocumentUrl(payload).then((res) => {
          if (res.statusCode === 201) {
            count = count + 1;
            successLength.push("true");
            uploadFiles(res?.data, file);
          } else {
            showToast(false, res.message);
            console.log(res.message);
          }
        });
      })
    ).then(() => {
      if (count === successLength.length) {
        showToast(true, "Docuuments Successfully Uploaded");
        setTimeout(() => {
          router.push(RoutePaths.Document_Success);
        }, 2000);
      }
    });
  };
  const showToast = (success: boolean, message: string) => {
    setShowDraftSaveToast({
      success: success,
      message: message,
      show: true,
    });
  };

  const onSubmit = (data: any, isDrafSave?: boolean) => {
    submitFormData(data, isDrafSave);
  };

  const getMasterData = () => {
    AuthApi.get(CommonApi.GETMASTERDATA)
      .then(({ data }: any) => {
        setMasterData({ ...masterData, ...data?.data });
        getIntrestedQualificationPrograms();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getUserDetail = () => {
    const isAuthenticate = JSON.parse(
      sessionStorage?.getItem("authenticate") as any
    );
    if (!isAuthenticate?.includes("true") || !isAuthenticate) {
      router.push("/");
      return;
    }
    const leadDetail = JSON.parse(
      sessionStorage?.getItem("activeLeadDetail") as any
    );
    const routeTo: string = sessionStorage.getItem("routeTo")! || "";
    setLeadId(leadDetail?.applicationCode);
    if (leadDetail) {
      AuthApi.get(
        `lead/${leadDetail?.leadCode}/application/${leadDetail?.applicationCode}?isDraft=${leadDetail?.isdraftSave}`
      )
        .then(({ data: response }) => {
          const formData = { ...response?.data };
          const truncateFormData = transformFormData(formData);
          mapFormDefaultValue(formData);
          setStudentData(response?.data);
          if (leadDetail?.isPaymentPending && routeTo !== "Document") {
            setActiveStep(1);
            setSubmitted(true);
            setPaymentDone(true);
          }
          if (leadDetail?.isDocumentPending) {
            setActiveStep(2);
            setSubmitted(true);
            setPaymentDone(true);
          }
          if (routeTo === "Document") {
            routeIfStepDone(routeTo); /// calling this if user coming back from payment success screen
          }
          setLeadDetail(leadDetail);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const getIntrestedQualificationPrograms = () => {
    AcadmicApi.get(CommonApi.GETINTRESTEDQUALIFICATION)
      .then(({ data }: any) => {
        setMasterData((prevState: any) => ({
          ...prevState,
          programs: data.data as IOption[],
        }));
      })
      .catch((err) => console.log(err));
  };
  // console.log({
  //   allFields,
  //   errors,
  // });
  const language = masterData?.languageData as IOption[];
  const nationalities = masterData?.nationalityData as IOption[];
  const highestQualifications =
    masterData?.highestQualificationData as IOption[];
  const programs = masterData?.programs as IOption[];
  const race = masterData?.raceData as IOption[];
  const socialMedias = masterData?.socialMediaData as IOption[];
  const sponsorModes = masterData?.sponsorModeData as IOption[];
  const studyModes = masterData?.studyModeData as IOption[];
  const genders = masterData?.genderData as IOption[];
  const employmentStatus = masterData?.employmentStatusData as IOption[];
  const employmentIndustries = masterData?.employmentIndustryData as IOption[];
  const countryData = masterData?.countryData as IOption[];
  const agentData = masterData?.agentData as IOption[];
  const documentType = masterData?.documentTypeData as IOption[];
  const studyTypeData = masterData?.studentTypeData as IOption[];

  const onSkipForNowOnPayment = () => {};
  const onSkipForNowOnDocument = () => {
    setActiveStep(0);
  };
  const { message, success, show } = showDraftSavedToast;

  const today = new Date();
  const year = today.getFullYear();

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
                <div className="application-form">
                  <div className="row">
                    <form onSubmit={(data) => onSubmit(data, false)}>
                      <PersonalInfoForm
                        key="personalForm"
                        genders={genders}
                        nationalities={nationalities}
                        homeLanguage={language}
                        race={race}
                      />
                      <AddressForm
                        key="AddressForm"
                        leadId={leadId}
                        countryData={countryData}
                      />
                      <EducationForm
                        key="EducationForm"
                        highestQualifications={highestQualifications}
                        programs={programs}
                        socialMedias={socialMedias}
                        agentArr={agentData}
                        studyTypeData={studyTypeData}
                      />
                      <KinDetailsForm leadId={leadId} key="KinDetailsForm" />
                      <EmployedForm
                        leadId={leadId}
                        key="EmployedForm"
                        employmentStatusArr={employmentStatus}
                        employmentIndustries={employmentIndustries}
                      />
                      <SponsoredForm
                        leadId={leadId}
                        key="SponsoredForm"
                        sponsorModeArr={sponsorModes}
                      />
                    </form>
                  </div>
                </div>
              </>
            )}
          </FormContainer>
          <FormContainer>
            {activeStep === MagicNumbers.ONE && (
              <>
                <Payment
                  programs={programs}
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
                  documentType={documentType}
                  leadId={leadId}
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
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: Green }}
                        href="https://www.regenesys.net/terms-and-conditions/"
                      >
                        {" "}
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
                    {activeStep !== 2 && (
                      <StyledButton
                        onClick={() => onSubmit(getValues(), true)}
                        type="button"
                        disabled={
                          (!isDirty && !isValidDocument) || !isValidDocument
                        }
                        isGreenWhiteCombination={true}
                        title={"Save as Draft"}
                      />
                    )}
                    &nbsp;&nbsp;&nbsp;
                    <StyledButton
                      onClick={methods.handleSubmit(
                        (data) => onSubmit(data, false) as any
                      )}
                      disabled={!isValid && !isValidDocument || isFormSubmitted }
                      title={activeStep < 2 ? "Save & Next" : "Submit"}
                    />
                    <StyleFooter>
                      <span
                        className="footer-text"
                        style={{ color: "#131718" }}
                      >
                        Copyright @ 2015 - {year}{" "}
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
            setShowDraftSaveToast((prevState) => ({
              ...prevState,
              show: !show,
            }));
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
  min-height: 200px;
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
