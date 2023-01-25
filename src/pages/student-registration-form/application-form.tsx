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
import { IMasterData, IOption } from "../../components/common/types";
import {
  getUploadDocumentUrl,
  isEmpty,
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
const mockFormData = {
  isAgreedTermsAndConditions: true,
  lead: {
    firstName: "Shashank",
    middleName: "",
    lastName: "Gupta",
    dateOfBirth: "2023-01-02",
    email: "dfgdf@rt.vom",
    mobileNumber: "7566410079",
    identificationPassportNumber: 234324324324,
    genderId: "M",
    nationalityId: "BLZ",
    language: "ISX",
    raceId: "INDIAN/ASIAN",
    mobileCountryCode: "ZA",
  },
  address: [
    {
      street: "Test adress",
      zipcode: "234234",
      city: "test city",
      state: "test state",
      country: "Albania",
      addressType: "POSTAL",
    },
    {
      street: "Test adress",
      zipcode: "234234",
      city: "test city",
      state: "test state",
      country: "Albania",
      addressType: "RESIDENTIAL",
    },
  ],
  education: {
    programCode: "BBA-PROG-501",
    qualificationCode: "PQ",
    highSchoolName: "testschool",
    referredById: "2",
    studentTypeId: "1",
    studyModeCode: "DISTANCE-ONLINE",
    socialMediaCode: "TWITTER",
    agentCode: null,
    studyModeDetail: {
      fee: "21000.00",
      feeMode: "SEMESTER",
    },
    applicationFees: "13000.00",
  },
  kin: {
    // isKin: "yes",
    fullName: "sdfsdf",
    relationship: "single",
    email: "sdfdsf@tfgfg.vom",
    mobileNumber: "+9665635435435345",
    mobileCountryCode: "+966",
  },
  employment: {
    // isEmployed: "yes",
    employmentStatusCode: "EMPLOYED",
    employer: "123",
    jobTitle: "tesrt",
    employmentIndustryCode: "MEDIA",
    managerName: "sefsdf",
    officeAddress: "Test Address",
    officeMobileNumber: "+96654654654656",
    officeMobileCountryCode: "+966",
  },
  sponser: {
    // isSponsored: "yes",
    name: "sfdsffd",
    address: "dsfdsfsdf",
    mobileNumber: "+966546354454",
    mobileCountryCode: "+966",
    sponsorModeCode: "SPONSER",
    email: "test@TEST.COM",
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
  const methods = useForm({
    mode: "onChange",
    reValidateMode: "onBlur",
    defaultValues: useMemo(() => {
      return studentData;
      // return mockFormData as any;
    }, [studentData]),
  });
  const {
    register,
    formState: { isValid, isDirty, errors, touchedFields },
    watch,
    setValue,
    getValues,
    trigger,
  } = methods;
  useEffect(() => {
    getUserDetail();
    getMasterData();
  }, []);
  useEffect(() => {
    if (studentData) {
      mapFormDefaultValue();
    }
  }, [studentData]);
  const allFields = watch();

  const isValidDocument =
    isValidFileType(allFields?.document?.uploadedDocs).length === 0;

  const navigateBack = () => {
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
  const mapFormDefaultValue = () => {
    const acceptedKeys = [
      "kin",
      "address",
      "lead",
      "education",
      "employment",
      "sponsor",
    ];
    for (let [key, value] of Object.entries(studentData)) {
      if (
        key === "kin" ||
        key === "sponser" ||
        (key === "employment" && isEmpty(studentData[key]))
      ) {
        return;
      }
      if (acceptedKeys.includes(key)) {
        setValue(key, value, {
          shouldDirty: true,
          shouldTouch: true,
          shouldValidate: true,
        });
      }
    }
  };
  const updateLead = (request: any) => {
    AuthApi.post(CommonApi.SAVEUSER, {
      ...request,
    })
      .then(({ data: response }) => {
        sessionStorage.setItem(
          "studentId",
          JSON.stringify({
            id: response?.data?.leadData?.id,
            leadCode: response?.data?.leadData?.leadCode,
          })
        );
        sessionStorage.setItem("leadData", JSON.stringify(response?.data));
        setShowDraftSaveToast({
          success: true,
          message: response?.message,
          show: true,
        });
        if (activeStep === MagicNumbers.TWO) {
          setActiveStep(2);
          setDocumentUploadDone(true);
          setPaymentDone(true);
          uploadStudentDocs();
        } else {
          setSubmitted(true);
          setActiveStep(activeStep + 1);
        }
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

    const { isSameAsPostalAddress = "", ...rest } = { ...(formData as any) };

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
    )?.applicationCode;
    const draftUpdateCode = activeLeadDetail || appCode;
    if (leadCode && !isDraftSave) {
      updateLead(request);
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
        router.push(RoutePaths.Document_Success);
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
          setStudentData(response?.data);
          if (leadDetail?.isPaymentPending && routeTo !== "Document") {
            setActiveStep(1);
            setSubmitted(true);
            setPaymentDone(true);
          }
          if (routeTo === "Document") {
            routeIfStepDone(routeTo); /// calling this if user coming back from payment success screen
          }
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
  // console.log({ allFields, errors });
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
                        employerArr={[]}
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
                    <label className="form-check-label terms-text">
                      <span className="me-1">I have read and agreed</span>
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: Green }}
                        href="https://www.regenesys.net/terms-and-conditions/"
                      >
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
                      onClick={methods.handleSubmit(
                        (data) => onSubmit(data, false) as any
                      )}
                      disabled={!isValid && !isValidDocument}
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
