import { useEffect, useState } from "react";
import PersonalInfoForm from "../../components/Form/personalInfoForm";
import { useForm, FormProvider } from "react-hook-form";
import styled from "styled-components";
import { Container, Snackbar } from "@material-ui/core";
import StepperComponent from "../../components/stepper/stepper";
import { Green, LoaderComponent } from "../../components/common/common";
import StyledButton from "../../components/button/button";
import { AddressForm } from "../../components/Form/AddressForm";
import { EducationForm } from "../../components/Form/EducationForm";
import { KinDetailsForm } from "../../components/Form/KinForm";
import { EmployedForm } from "../../components/Form/EmployedForm";
import { SponsoredForm } from "../../components/Form/SponsoredCandidateForm";
import Termsconditiondialog from "../../components/dialog/Terms&ConditionDialog";
import useAxiosInterceptor, { UserManagementAPI } from "../../service/Axios";
import {
  ILeadFormValues,
  IMasterData,
  IOption,
} from "../../components/common/types";
import {
  getAllDocumentsDetails,
  getUploadDocumentUrl,
  isValidEmail,
  isValidFileType,
  mapFormData,
  mapFormDefaultValue,
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
  CommonApi,
  CommonEnums,
  MagicNumbers,
  RoutePaths,
} from "../../components/common/constant";
import {
  getIntrestedQualificationPrograms,
  getUserDetailHelper,
} from "../../Util/applicationFormHelper";

const isValidLeadEmail = (value: string) => isValidEmail(value);
const ApplicationForm = () => {
  const router = useRouter();
  const { AuthApi, loading, AcadmicApi, CommonAPI } = useAxiosInterceptor();
  const [isFormSubmitted, setSubmitted] = useState<boolean>(false);
  const [isPaymentDone, setPaymentDone] = useState<boolean>(false);

  const [agentData, setAgentData] = useState([]);

  const [showDraftSavedToast, setShowDraftSaveToast] = useState<any>({
    message: "",
    success: false,
    show: false,
  });
  const [leadId, setLeadId] = useState<string>("");
  const [activeStep, setActiveStep] = useState<any>(0);
  const [masterData, setMasterData] = useState<IMasterData | null>(null);
  const [isApplicationEnrolled, setApllicationEnrolled] =
    useState<boolean>(false);
  const [isNewApplication, setNewApplication] = useState<boolean>(false);
  const [identificationDocumentTypeData, setIdentificationDocumentTypeData] =
    useState<any>([]);
  const [nationalityStatus, setNationalityStatus] = useState([]);
  const [termsOpen, settermsOpen] = useState<any>(false);
  const [posStateData, setPosStateData] = useState([]);
  const [resStateData, setResStateData] = useState([]);
  const [sponsorStateData, setSponsorStateData] = useState([]);
  const [employedStateData, setEmployedStateData] = useState([]);
  const methods = useForm<ILeadFormValues>({
    mode: "all",
    reValidateMode: "onBlur",
  });
  const {
    register,
    formState: { isValid, isDirty, errors },
    watch,
    setValue,
    clearErrors,
    getValues,
    trigger,
  } = methods;
  useEffect(() => {
    getUserDetail();
    getMasterData();
    getAgentDetails();
    getNationalData();
    identificationDocumentType();
  }, []);

  useEffect(() => {
    if (window) {
      const queryParams = new URLSearchParams(location?.search);
      const applicationStatus = queryParams.get("status");

      if (applicationStatus === CommonEnums.APP_ENROLLED_ACCEPTED) {
        setApllicationEnrolled(true);
        setNewApplication(true);
      } else {
        setApllicationEnrolled(false);
        if (
          applicationStatus === CommonEnums.NEW_STATUS ||
          !applicationStatus
        ) {
          setNewApplication(true);
        } else if (applicationStatus === CommonEnums.TRUE) {
          setNewApplication(false);
        }
      }
    }
  }, []);
  const allFields = watch();
  const isValidDocument =
    allFields?.document?.uploadedDocs?.length > 0 &&
    isValidFileType(allFields?.document?.uploadedDocs).length === 0;

  const navigateBack = () => {
    setSubmitted(false);
    setActiveStep((prevState: number) => prevState - 1);
  };
  const navigateNext = () => {
    setActiveStep((prevState: number) => prevState + 1);
  };

  const termsHandelClose = () => {
    settermsOpen(false);
  };
  const termsHandelOpen = () => {
    settermsOpen(true);
  };

  const identificationDocumentType = async () => {
    const response = await CommonAPI.get(CommonApi.IDENTIFICATIONDOCUMENT);

    setIdentificationDocumentTypeData(response?.data.data);
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

  const updateTermsConditions = (status) => {
    if (status == true) {
      allFields.lead.isAgreedTermsAndConditions = true;
      setValue("isAgreedTermsAndConditions", true);
      clearErrors("isAgreedTermsAndConditions");
      settermsOpen(false);
    }

    if (status == false) {
      allFields.lead.isAgreedTermsAndConditions = false;
      setValue("isAgreedTermsAndConditions", false);
      clearErrors("isAgreedTermsAndConditions");
      settermsOpen(false);
    }
  };

  const updateLead = (
    request: any,
    leadCode: string,
    applicationCode: string,
    activeLeadDetail: any,
    status: string,
    draftSave: boolean | undefined
  ) => {
    if (activeStep === MagicNumbers.TWO) {
      uploadStudentDocs(draftSave);
      return;
    }
    let methodType;
    if (
      applicationCode &&
      applicationCode?.length > 0 &&
      (status !== CommonEnums.DRAFT_STATUS || !status)
    ) {
      methodType = AuthApi.put(
        `${CommonApi.SAVEUSER}/${leadCode}/application/${applicationCode}?isDraft=false`,
        {
          ...request,
        }
      );
    } else {
      if (draftSave) {
        const fetchMethod =
          applicationCode &&
          applicationCode?.length > 0 &&
          (status !== CommonEnums.DRAFT_STATUS || !status)
            ? "put"
            : "post";
        request.applicationCode = applicationCode;
        methodType = AuthApi[fetchMethod](
          `${CommonApi.SAVEUSER}?isDraft=true`,
          {
            ...request,
          }
        );
      } else {
        methodType = AuthApi.post(`${CommonApi.SAVEUSER}?isDraft=false  `, {
          ...request,
        });
      }
    }

    methodType
      .then(({ data: response }) => {
        if (!applicationCode || status === CommonEnums.DRAFT_STATUS) {
          sessionStorage.setItem(
            "studentId",
            JSON.stringify({
              id: response?.data?.leadData?.id,
              leadCode: response?.data?.leadData?.leadCode,
            })
          );
          localStorage.setItem("leadData", JSON.stringify(response?.data));
          if (activeLeadDetail) {
            sessionStorage.setItem(
              "activeLeadDetail",
              JSON.stringify({
                ...activeLeadDetail,
                applicationCode:
                  response?.data?.applicationData?.applicationCode,
              })
            );
          }
        }

        setShowDraftSaveToast({
          success: true,
          message: response?.message,
          show: true,
        });
        if (activeStep === MagicNumbers.TWO && draftSave) {
          router.push(RoutePaths.Dashboard);
        }
        setSubmitted(false);
        if (activeStep < MagicNumbers.TWO) {
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
        setSubmitted(false);
      });
  };
  const updateUserAsDraft = (request) => {
    const activeLeadDetail = JSON.parse(
      sessionStorage?.getItem("activeLeadDetail") as any
    );
    const appCode = activeLeadDetail.applicationCode;

    AuthApi.put(`${CommonApi.SAVEDRAFT}/${appCode}`, {
      ...request,
    })
      .then(({ data }) => {
        setShowDraftSaveToast({
          success: true,
          message: "Saved as draft",
          show: true,
        });
        router.push(RoutePaths.Dashboard);
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

  const createDraft = (data) => {
    if (data?.education?.isInternationDegree === "yes") {
      data.education.isInternationDegree = true;
    } else if (data?.education?.isInternationDegree === "no") {
      data.education.isInternationDegree = false;
    }

    if (data?.employment?.zipCode === "") {
      data.employment.zipCode = null;
    }

    const formData = { ...data };

    const {
      isSameAsPostalAddress = "",
      payment = null,
      ...rest
    } = { ...(formData as any) };

    let request = mapFormData({
      ...rest,
    });

    const activeLeadDetail = JSON.parse(
      sessionStorage?.getItem("activeLeadDetail") as any
    );
    const leadCode =
      sessionStorage?.getItem("studentId") &&
      sessionStorage?.getItem("studentId") !== "undefined" &&
      sessionStorage?.getItem("studentId") !== "{}"
        ? JSON.parse(sessionStorage?.getItem("studentId") as any)?.leadCode
        : activeLeadDetail?.leadCode;

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
        router.push(RoutePaths.Dashboard);
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

  const submitFormData = (data: any, isDraftSave?: boolean) => {
    if (data?.education?.isInternationDegree === "yes") {
      data.education.isInternationDegree = true;
    } else if (data?.education?.isInternationDegree === "no") {
      data.education.isInternationDegree = false;
    }

    if (data?.employment?.zipCode === "") {
      data.employment.zipCode = null;
    }

    const formData = { ...data };

    const {
      isSameAsPostalAddress = "",
      payment = null,
      ...rest
    } = { ...(formData as any) };

    let request = mapFormData(
      {
        ...rest,
      },
      isDraftSave,
      activeStep
    );
    const appCode = localStorage?.getItem("leadData")
      ? JSON.parse(localStorage?.getItem("leadData") as any)?.applicationData
          ?.applicationCode
      : null;
    const activeLeadDetail = JSON.parse(
      sessionStorage?.getItem("activeLeadDetail") as any
    );
    const leadCode =
      sessionStorage?.getItem("studentId") &&
      sessionStorage?.getItem("studentId") !== "undefined" &&
      sessionStorage?.getItem("studentId") !== "{}"
        ? JSON.parse(sessionStorage?.getItem("studentId") as any)?.leadCode
        : activeLeadDetail?.leadCode;
    const draftUpdateCode = activeLeadDetail?.applicationCode
      ? activeLeadDetail?.applicationCode
      : appCode;
    const AppStatus = activeLeadDetail?.status;
    if (leadCode && !isDraftSave) {
      setSubmitted(true);
      request.lead.leadCode = leadCode;

      updateLead(
        request,
        leadCode,
        draftUpdateCode,
        activeLeadDetail,
        AppStatus,
        isDraftSave
      );
      return;
    }

    if (leadCode && isDraftSave && activeStep === MagicNumbers.TWO) {
      setSubmitted(true);
      request.lead.leadCode = leadCode;
      updateLead(
        request,
        leadCode,
        draftUpdateCode,
        activeLeadDetail,
        AppStatus,
        isDraftSave
      );
      return;
    }

    if (
      isDraftSave &&
      checkValidationForDraftSave() &&
      activeStep !== MagicNumbers.TWO
    ) {
      checkValidationForDraftSave();

      updateLead(
        request,
        leadCode,
        draftUpdateCode,
        activeLeadDetail,
        AppStatus,
        isDraftSave
      );
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
  const Dates = new Date();
  const timestamp =
    Dates.toLocaleDateString("en-GB").split("/").join("") +
    Dates.getHours() +
    Dates.getMinutes();

  const uploadStudentDocs = async (isDraft: boolean = false) => {
    const {
      document: { uploadedDocs = [] as File[] },
      payment,
    } = { ...allFields };
    const { paymentProof = [] } = { ...payment };
    let count = 0;
    const successLength: any[] = [];
    let payload;

    const files = [] as any[];
    if (activeStep === MagicNumbers.TWO) {
      uploadedDocs.map(
        (file: File & { typeCode: string; documentTypeCode: string }) => {
          if (file?.typeCode === "nationalIdPassport") {
            files.push({
              documentTypeCode:
                allFields?.document?.identificationDocumentType?.includes(
                  "others"
                )
                  ? allFields?.document?.other
                  : allFields?.document?.identificationDocumentType ||
                    "nationalIdPassport",
              fileName: file.name,
              fileType: file.type,
            });
          } else
            files.push({
              documentTypeCode: file?.documentTypeCode || file?.typeCode,
              fileName: file.name,
              fileType: file.type,
            });
        }
      );
    } else if (activeStep === MagicNumbers.ONE) {
      paymentProof.map((file) => {
        files.push({
          documentTypeCode: "PAYMENTPROOF",
          fileName: file.name,
          fileType: file.type,
        });
      });
    }

    payload = {
      files,
      amount: allFields.payment?.finalFee,
      paymentModeCode: "OFFLINE",
      discountCode: allFields?.payment?.discountCode,
      discountAmount: allFields?.payment?.discountAmount,
      currencyCode: allFields?.payment?.selectedCurrency,
      isDraft,
      // studentTypeCode: allFields?.education?.studentTypeCode,
    };
    getUploadDocumentUrl(payload)
      .then((res) => {
        if (res.statusCode === 201) {
          count = count + 1;
          successLength.push("true");
          res?.data.forEach((url, index) => {
            const filesTakenForm =
              activeStep === MagicNumbers.ONE ? paymentProof : uploadedDocs;
            uploadFiles(url, filesTakenForm[index]);
          });
        } else {
          showToast(false, res.message);
          console.log(res.message);
        }
      })
      .then(() => {
        if (count === successLength.length) {
          setSubmitted(false);
          if (activeStep === MagicNumbers.ONE) {
            setPaymentDone(true);
            setTimeout(() => {
              router.push(RoutePaths.Payment_Success);
            }, 2000);
          } else {
            setActiveStep(0);
            setTimeout(() => {
              if (isDraft) {
                router.push(RoutePaths.Document_Save_Success);
              } else {
                router.push(RoutePaths.Document_Success);
              }
            }, 2000);
          }
          showToast(true, "Documents Successfully Uploaded");
        }
      })
      .catch((err) => {
        console.log(err);
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
    console.log(isDrafSave);
    submitFormData(data, isDrafSave);
  };

  const getMasterData = () => {
    AuthApi.get(CommonApi.GETMASTERDATA)
      .then(({ data }: any) => {
        setMasterData({ ...masterData, ...data?.data });
        getIntrestedQualificationPrograms(AcadmicApi, setMasterData);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const getDocumentDetails = async () => {
    const response = await getAllDocumentsDetails();
    setValue("document.documentDetails", response?.data);
  };

  const getNationalData = () => {
    CommonAPI.get(CommonApi.NATIONALITYSTATUS)
      .then(({ data }) => {
        setNationalityStatus(data?.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getStateData = async (countryCode, varient) => {
    const data = await CommonAPI.get(`${CommonApi.STATE}/${countryCode}`);
    if (varient == "POSTAL") {
      setPosStateData(data?.data?.data);
    } else if (varient == "RESIDENTIAL") {
      setResStateData(data?.data?.data);
    } else if (varient == "SPONSOR") {
      setSponsorStateData(data?.data?.data);
    } else if (varient == "EMPLOYED") {
      setEmployedStateData(data?.data?.data);
    }
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
    if (leadDetail && leadDetail.applicationCode) {
      getUserDetailHelper(
        leadDetail,
        transformFormData,
        mapFormDefaultValue,
        routeTo,
        setActiveStep,
        setSubmitted,
        setPaymentDone,
        routeIfStepDone,
        setValue,
        AuthApi
      );
      getDocumentDetails(); /// this will give detals of document which are already upload or if its give empty array it mean nothing uploaded yet
    } else {
      setValue("document.documentDetails", []);
    }
  };

  const onManagementStudentSubmit = () => {
    const applicationCode = JSON.parse(
      sessionStorage.getItem("activeLeadDetail")!
    )?.applicationCode;
    const programFee = isApplicationEnrolled
      ? allFields?.payment?.selectedFeeModeFee!
      : allFields?.education?.applicationFees || "0";
    const normalDiscountAmount = allFields?.payment?.discountAmount;
    const discountAmount = allFields?.payment?.conversionRate
      ? Number(normalDiscountAmount) * (allFields?.payment?.conversionRate || 0)
      : normalDiscountAmount;
    const payload = {
      discountCode: allFields?.payment?.managementDiscountCode,
      amount: +programFee,
      phone: allFields?.lead?.mobileNumber,
      email: allFields?.lead?.email,
      discountAmount: String(discountAmount),
    };
    AuthApi.post(`application/${applicationCode}/payment/management`, {
      ...payload,
    })
      .then(({ data }) => {
        router.push(RoutePaths.APPLICATION_ENROLLED_SUCCESS);
        setActiveStep(0);
        setPaymentDone(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAgentDetails = async () => {
    UserManagementAPI.get(CommonApi.AGENT_LIST)
      .then(({ data }) => {
        setAgentData(data?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const language = masterData?.languageData as IOption[];

  const nationalities = masterData?.nationalityData as IOption[];
  const relationData = masterData?.relationData as IOption[];
  const highestQualifications =
    masterData?.highestQualificationData as IOption[];
  const programs = masterData?.programs as IOption[];

  const race = masterData?.raceData as IOption[];
  const socialMedias = masterData?.socialMediaData as IOption[];
  const sponsorModes = masterData?.sponsorModeData as IOption[];
  const studyModes = masterData?.studyModeData as IOption[];
  const genders = masterData?.genderData as IOption[];
  const employmentStatus = masterData?.employmentStatusData?.filter(
    (item) => item?.name?.toLowerCase() !== "unemployed"
  ) as IOption[];
  const employmentIndustries = masterData?.employmentIndustryData as IOption[];
  const countryData = masterData?.countryData as IOption[];

  const documentType = masterData?.documentTypeData as IOption[];
  const studyTypeData = masterData?.studentTypeData as IOption[];
  const isManagementStudentType =
    allFields?.education?.studentTypeCode?.toLowerCase() ===
    CommonEnums.MANAGEMENT;

  const onSkipForNowOnPayment = () => {};
  const onSkipForNowOnDocument = () => {
    setActiveStep(0);
  };
  const { message, success, show } = showDraftSavedToast;
  const today = new Date();
  const year = today.getFullYear();

  const isValidForm = () => {
    if (activeStep === 0) {
      return (
        activeStep === MagicNumbers.ZERO &&
        !isValid &&
        !isValidLeadEmail(allFields?.lead?.email)
      );
    } else {
      return (
        activeStep === MagicNumbers.TWO &&
        !isValid &&
        !isValidLeadEmail(allFields?.lead?.email)
      );
    }
  };

  return (
    <>
      {loading ? (
        <LoaderComponent />
      ) : (
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
                            identityDocuments={identificationDocumentTypeData}
                            key="personalForm"
                            genders={genders}
                            nationalities={nationalities}
                            homeLanguage={language}
                            race={race}
                            nationalityStatusData={nationalityStatus}
                          />
                          <AddressForm
                            key="AddressForm"
                            leadId={leadId}
                            countryData={countryData}
                            getStateData={getStateData}
                            posStateData={posStateData}
                            resStateData={resStateData}
                          />
                          <EducationForm
                            key="EducationForm"
                            highestQualifications={highestQualifications}
                            programs={programs}
                            socialMedias={socialMedias}
                            agentArr={agentData}
                            studyTypeData={studyTypeData}
                            isApplicationEnrolled={isApplicationEnrolled}
                            leadId={leadId}
                          />
                          <SponsoredForm
                            leadId={leadId}
                            key="SponsoredForm"
                            sponsorModeArr={sponsorModes}
                            relationData={relationData}
                            countryData={countryData}
                            getStateData={getStateData}
                            sponsorStateData={sponsorStateData}
                          />
                          <EmployedForm
                            leadId={leadId}
                            key="EmployedForm"
                            employmentStatusArr={employmentStatus}
                            employmentIndustries={employmentIndustries}
                            countryData={countryData}
                            getStateData={getStateData}
                            employedStateData={employedStateData}
                          />
                          <KinDetailsForm
                            relationData={relationData}
                            leadId={leadId}
                            key="KinDetailsForm"
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
                      isManagementStudentType={isManagementStudentType}
                      isApplicationEnrolled={isApplicationEnrolled}
                      onSubmit={uploadStudentDocs}
                    />
                  </>
                )}
                {activeStep === MagicNumbers.TWO && (
                  <>
                    <DocumentUploadForm
                      allFields={allFields}
                      isValidDocument={isValidDocument}
                      documentType={identificationDocumentTypeData}
                      leadId={leadId}
                      isApplicationEnrolled={isNewApplication}
                      onSubmit={() => submitFormData(allFields, false) as any}
                      onSaveDraft={() => onSubmit(getValues(), true) as any}
                      selectedPrograms={
                        programs?.find(
                          (prog) =>
                            prog?.code === allFields?.education?.programCode
                        )!
                      }
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
                      <div className="form-check text-center d-flex flex-row">
                        <input
                          className="form-check-input me-2"
                          type="checkbox"
                          checked={allFields?.lead?.isAgreedTermsAndConditions}
                          onClick={() => {
                            if (
                              allFields?.lead.isAgreedTermsAndConditions ==
                                false ||
                              allFields?.lead.isAgreedTermsAndConditions == null
                            ) {
                              settermsOpen(true);
                            } else if (
                              allFields?.lead.isAgreedTermsAndConditions == true
                            ) {
                              updateTermsConditions(false);
                            }
                          }}
                          id="flexCheckDefault"
                          {...register("isAgreedTermsAndConditions", {
                            required: true,
                          })}
                        />

                        <Termsconditiondialog
                          termsHandelOpen={termsHandelOpen}
                          termsHandelClose={termsHandelClose}
                          termsOpen={termsOpen}
                          updateTermsConditions={updateTermsConditions}
                        />
                      </div>
                    )}
                    {errors?.isAgreedTermsAndConditions && (
                      <div className="invalid-feedback">
                        Please check terms and conditions
                      </div>
                    )}

                    {activeStep === MagicNumbers.ZERO && (
                      <div className="mt-4 text-center">
                        {!isApplicationEnrolled && (
                          <>
                            <>
                              {/* {activeStep != 2 && (
                                <StyledButton
                                  onClick={onSkipForNowOnDocument}
                                  type="button"
                                  className="me-2 mb-1"
                                  isGreenWhiteCombination={true}
                                  title={"Skip for Now"}
                                />
                              )} */}
                            </>
                            {activeStep !== 2 && (
                              <StyledButton
                                onClick={() => {
                                  if (
                                    JSON.parse(
                                      sessionStorage?.getItem(
                                        "activeLeadDetail"
                                      ) as any
                                    )?.isdraftSave == true
                                  ) {
                                    updateUserAsDraft(allFields);
                                  } else {
                                    createDraft(allFields);
                                  }
                                }}
                                type="button"
                                disabled={!isDirty}
                                isGreenWhiteCombination={true}
                                title={"Save as Draft"}
                              />
                            )}
                            &nbsp;&nbsp;&nbsp;
                            <StyledButton
                              onClick={() => {
                                activeStep === 2
                                  ? (submitFormData(allFields, false) as any)
                                  : methods.handleSubmit((data) => {
                                      if (
                                        JSON.parse(
                                          sessionStorage?.getItem(
                                            "activeLeadDetail"
                                          ) as any
                                        )?.isdraftSave == true
                                      ) {
                                        onSubmit(data, true) as any;
                                      } else {
                                        onSubmit(data, false) as any;
                                      }
                                    })();
                              }}
                              disabled={isValidForm()}
                              title={activeStep < 2 ? "Save & Next" : "Submit"}
                            />
                          </>
                        )}
                        {isApplicationEnrolled && (
                          <>
                            <StyledButton
                              onClick={() => {
                                router.push(RoutePaths.Dashboard);
                              }}
                              isGreenWhiteCombination
                              title={"Back to Dashboard"}
                              className="me-3"
                            />
                            <StyledButton
                              onClick={() => {
                                methods.handleSubmit(
                                  (data) => onSubmit(data, false) as any
                                )();
                              }}
                              disabled={!isValid}
                              title={"Save"}
                            />
                          </>
                        )}
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
                        className="me-2"
                        onClick={navigateBack}
                        type="button"
                        isGreenWhiteCombination={true}
                        title={"Back"}
                      />
                      {isManagementStudentType && (
                        <StyledButton
                          onClick={() => {
                            onManagementStudentSubmit();
                          }}
                          disabled={
                            !allFields?.payment?.discountAmount ||
                            Number(allFields?.payment?.discountAmount) === 0
                          }
                          title={"Submit"}
                        />
                      )}
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
      )}
    </>
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
