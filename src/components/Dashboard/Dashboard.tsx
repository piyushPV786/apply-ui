import { useEffect, useState } from "react";
import {
  Green,
  GreenFormHeading,
  LoaderComponent,
  Toaster,
} from "../common/common";
import { useRouter } from "next/router";
import { MainContainer as ParentContainer } from "../../pages/student-registration-form/application-form";
import { PaymentContainer } from "../payment/payment";
import Header from "../common/header";
import StyledButton from "../button/button";

import styled from "styled-components";
import Image from "next/image";
import ApplicationIcon from "../../../public/assets/images/new-application-icon.svg";
import {
  APPLICATION_STATUS,
  CommonApi,
  CommonEnums,
  ErrorMessage,
  RoutePaths,
} from "../common/constant";
import useAxiosInterceptor from "../../service/Axios";
import { IApplication, IDocument, IOption } from "../common/types";
import {
  clearRoute,
  downloadDocument,
  getCommonUploadDocumentUrl,
  getStatusColor,
  showErrorToast,
  transformDate,
} from "../../Util/Util";
import { Grid } from "@material-ui/core";
import { CachedOutlined } from "@material-ui/icons";

const sortApplicationOnLastUpdate = (application: any[]) => {
  return application?.sort((a, b) => {
    const dateA = new Date(a.updatedAt);
    const dateB = new Date(b.updatedAt);
    return dateA.getTime() - dateB.getTime();
  });
};

export const ApplicationDashboard = (props: any) => {
  const [studentId, setStudenId] = useState<string | null>(null);
  const [studentApplications, setStudentApplications] = useState<
    IApplication[]
  >([]);
  const [showToast, setToast] = useState<{
    success: boolean;
    message: string;
    show: boolean;
  }>({ success: false, message: "", show: false });
  const { loading, AuthApi, AcadmicApi } = useAxiosInterceptor();
  const router = useRouter();

  useEffect(() => {
    const studentId = JSON.parse(
      sessionStorage?.getItem("studentId") as any
    )?.leadCode;
    if (studentId && studentApplications.length === 0) {
      getStudentApplications(studentId);
      setStudenId(studentId);
    }
  }, []);
  const getStudentApplications = (studentId) => {
    AuthApi.get(`${CommonApi.SAVEUSER}/${studentId}/application`)
      .then(({ data: response }) =>
        getIntrestedQualificationPrograms(response?.data)
      )
      .catch((err) => {
        console.log(err);
      });
  };
  const getIntrestedQualificationPrograms = (application: [IApplication]) => {
    AcadmicApi.get(CommonApi.GETINTRESTEDQUALIFICATION)
      .then(({ data: response }: any) => {
        if (application.length > 0 && response.data?.length > 0) {
          const applications = [...application];
          applications.forEach((app: IApplication) => {
            response?.data?.forEach((element: IOption) => {
              if (element?.code === app.education?.programCode) {
                app.programName = element.name;
              }
            });
          });
          setStudentApplications(applications);
        } else setStudentApplications(application);
      })
      .catch((err) => console.log(err));
  };
  const onApplyNow = () => {
    clearRoute();
    const leadId = JSON.parse(sessionStorage.getItem("studentId")!)
      ?.leadCode as any;
    const leadDetail = {
      leadCode: leadId,
    };
    sessionStorage.setItem("activeLeadDetail", JSON.stringify(leadDetail));
    if (leadId) {
      router.push(RoutePaths.Application_Form, {
        query: `status=New-Application`,
      });
    }
  };

  const onEdit = (
    applicationCode: string | number,
    leadCode: string,
    status,
    educationDetail,
    draftId
  ) => {
    clearRoute();
    const isdraftSave = status === CommonEnums.DRAFT_STATUS ? true : false;
    const leadDetail = {
      applicationCode,
      leadCode,
      isdraftSave,
      educationDetail,
      status,
      draftId,
    };
    sessionStorage.setItem("activeLeadDetail", JSON.stringify(leadDetail));
    const url = status.includes(CommonEnums.APP_ENROLLED_ACCEPTED)
      ? `${RoutePaths.Application_Form}?status=${CommonEnums.APP_ENROLLED_ACCEPTED}`
      : RoutePaths.Application_Form;
    router.push(url);
  };
  const onPay = (
    applicationCode: string | number,
    leadCode: string,
    status,
    educationDetail,
    show
  ) => {
    clearRoute();
    const isdraftSave = false;
    const isPaymentPending = status;
    const leadDetail = {
      applicationCode,
      leadCode,
      isPaymentPending,
      isdraftSave,
      educationDetail,
    };
    sessionStorage.setItem("activeLeadDetail", JSON.stringify(leadDetail));
    router.push(RoutePaths.Application_Form, { query: `status=${status}` });
  };
  const onUploadDocuments = (
    applicationCode: string | number,
    leadCode: string,
    status
  ) => {
    clearRoute();
    const isdraftSave = false;
    const isPaymentPending = false;
    const isDocumentPending = true;
    const leadDetail = {
      applicationCode,
      leadCode,
      isPaymentPending,
      isdraftSave,
      isDocumentPending,
    };
    sessionStorage.setItem("activeLeadDetail", JSON.stringify(leadDetail));
    router.push(RoutePaths.Application_Form, { query: `status=${status}` });
  };
  const onUploadBursaryDocuments = (
    applicationCode: string | number,
    leadCode: string,
    status
  ) => {
    clearRoute();
    const isdraftSave = false;
    const isPaymentPending = false;
    const isDocumentPending = true;
    const leadDetail = {
      applicationCode,
      leadCode,
      isPaymentPending,
      isdraftSave,
      isDocumentPending,
      status,
    };
    sessionStorage.setItem("activeLeadDetail", JSON.stringify(leadDetail));
    router.push(RoutePaths.Application_Form, { query: `status=${status}` });
  };

  const onDownloadAcceptence = async (
    documentDetail: IDocument[],
    documentTypeCode:
      | CommonEnums.CONFIRMATION_LETTER
      | CommonEnums.ACCEPTANCE_LETTER
  ) => {
    const documentDetails = documentDetail?.find(
      (doc) => doc?.documentTypeCode === CommonEnums.ACCEPTANCE_LETTER
    );

    if (documentDetails) {
      const { name = "" } = { ...documentDetails };
      if (!name) return showErrorToast(ErrorMessage);
      getCommonUploadDocumentUrl(name).then((res) => {
        if (res?.statusCode === 200) {
          downloadDocument(res?.data, name);
          setTimeout(() => {
            setToast({
              show: true,
              message: `${
                documentTypeCode === CommonEnums.ACCEPTANCE_LETTER
                  ? "Acceptance"
                  : "Confirmation"
              } Letter Downloaded Successfully`,
              success: true,
            });
          }, 1000);
        } else {
          setToast({ show: true, message: res?.message, success: false });
        }
      });
    }
  };

  const onToast = () => {
    setToast((prevState) => ({ ...prevState, show: !prevState?.show }));
  };
  const { message, show, success } = showToast;

  return (
    <>
      {loading ? (
        <LoaderComponent />
      ) : (
        <ParentContainer>
          <Header />
          <div className="container-fluid application-page mt-5">
            <div style={{ paddingBottom: "1rem" }}>
              <PaymentContainer>
                {studentId && studentApplications.length > 0 ? (
                  <div>
                    <div className="row">
                      <div className="col">
                        <h2 className="app-header">My Applications</h2>
                        <p className="grey-text">
                          Here are all applications that you've applied through
                          Regenesys
                        </p>
                      </div>
                      <div className="col pe-0">
                        <div className="d-flex justify-content-end">
                          <StyledButton
                            onClick={onApplyNow}
                            title="Apply a New Application"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      {studentApplications
                        ?.sort((a: any, b: any) => {
                          const dateA = new Date(a.updatedAt);
                          const dateB = new Date(b.updatedAt);
                          return dateB.getTime() - dateA.getTime();
                        })
                        ?.map(
                          (
                            {
                              status,
                              applicationCode,
                              programName,
                              updatedAt,
                              enrolmentCode,
                              id,
                              lead: {
                                firstName,
                                lastName,
                                middleName = "",
                                leadCode,
                              },
                              education,
                              studentCode,
                              document,

                              ...rest
                            },
                            idx
                          ) => (
                            <div
                              key={applicationCode}
                              className="col-md-6 mb-2"
                            >
                              <ApplicationCard
                                key={applicationCode}
                                status={status}
                                applicationNumber={applicationCode}
                                name={`${firstName} ${middleName} ${lastName}`}
                                programName={programName}
                                onEdit={onEdit}
                                onPay={onPay}
                                onDownloadAcceptence={onDownloadAcceptence}
                                onUploadDocuments={onUploadDocuments}
                                onUploadBursaryDocuments={
                                  onUploadBursaryDocuments
                                }
                                getStudentApplications={() =>
                                  getStudentApplications(studentId)
                                }
                                leadCode={leadCode}
                                id={id}
                                studyModeCode={education?.studyModeCode}
                                updatedAt={updatedAt}
                                educationDetail={education}
                                document={document}
                                enrolmentCode={enrolmentCode}
                                studentCode={studentCode}
                                {...rest}
                              />
                            </div>
                          )
                        )}
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="row">
                      <div className="col-sm-12 col-lg-12 col-md-12">
                        <div className=" d-flex justify-content-center text-center mb-2">
                          <div
                            style={{
                              background: `${Green}`,
                              borderRadius: "50%",
                              padding: "1.5rem",
                            }}
                          >
                            <Image
                              width="60"
                              height="60"
                              src={ApplicationIcon}
                              alt="Application Icon"
                            />
                          </div>
                        </div>
                        <div className="text-center w-100">
                          <GreenFormHeading
                            style={{ fontSize: "24px", color: "#000" }}
                          >
                            No application yet
                          </GreenFormHeading>
                          <p className="grey-text mt-2">
                            Thank you for trusting Regenesys as your educational
                            institution. Please apply for your interested
                            qualification now.
                          </p>
                          <StyledButton
                            onClick={onApplyNow}
                            title="Apply Now"
                          />
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </PaymentContainer>
            </div>
          </div>
          <Toaster
            key={"id"}
            message={message}
            show={show}
            success={success}
            setShowToast={onToast}
          />
        </ParentContainer>
      )}
    </>
  );
};

function ApplicationCard({
  name,
  applicationNumber,
  enrolmentCode,
  status = "",
  programName,
  leadCode,
  onEdit = (...args) => {},
  getStudentApplications = () => {},
  onPay = (...args) => {},
  onUploadDocuments = (...args) => {},
  onDownloadAcceptence = (...args) => {},
  onUploadBursaryDocuments = (...args) => {},
  studyModeCode,
  updatedAt = "",
  educationDetail,
  document,
  studentCode,
  id,
  ...rest
}) {
  const { sponsor = null } = { ...(rest as any) };
  const isAcceptedApplication = status.includes(
    CommonEnums.APP_ENROLLED_ACCEPTED
  );
  const sponsorModeType = sponsor?.sponsorModeCode;
  const router = useRouter();
  const showEditBtn =
    status.includes(CommonEnums.FEES_PENDING_STATUS) ||
    status.includes(CommonEnums.APP_FEE_DOC_VER_PEND) ||
    status.includes(CommonEnums.DRAFT_STATUS) ||
    isAcceptedApplication;

  const showPayBtn =
    status.includes(CommonEnums.RESUB_APP_FEE_PROOF) || isAcceptedApplication;
  const isProgramAddmitted = status.includes(CommonEnums.PROG_ADMITTED);
  const isIntakeAssignmentPending = status.includes(
    APPLICATION_STATUS.INTAKE_ASSIGNMENT_PENDING
  );
  const showCredentialBtn = status.includes(CommonEnums.PROG_ADMITTED);
  const enrollmentNumber = status.includes(CommonEnums.APP_ENROLLED_STATUS)
    ? enrolmentCode
    : "";
  const payBtnTitle = isAcceptedApplication
    ? "Pay Program Fee"
    : "Pay Application Fee";

  const showRMATBtn = status.includes(CommonEnums.RMAT_PENDING);

  const showUploadBtn =
    status.includes(CommonEnums.APP_ENROLLED_STATUS) ||
    status.includes(CommonEnums.APP_FEE_ACCEPTED) ||
    status.includes(CommonEnums.RESUB_APP_DOC);

  const isProgramAddmittedOrIsIntakeAssigned =
    isProgramAddmitted || isIntakeAssignmentPending;

  return (
    <>
      <ApplicationContainer className="container bg-white p-0 app-card border rounded overflow-hidden">
        <span className="cursor-pointer" onClick={getStudentApplications}>
          <CachedOutlined className="m-2" />
        </span>
        <div className="d-flex justify-content-end">
          <StyledStatusBedge status={status}>{status}</StyledStatusBedge>
        </div>
        <div className="row px-4">
          <div className="col-md-4">
            <div className="mt-2 w-100 app-card-block">
              <p className="mb-0" style={{ color: `#5a636a` }}>
                Name
              </p>
              <strong>{name}</strong>
            </div>
          </div>
          <div className="col-md-4">
            <div className="mt-2 w-100 app-card-block">
              <p className="mb-0" style={{ color: `#5a636a` }}>
                Last updated
              </p>
              <strong>{transformDate(new Date(updatedAt))}</strong>
            </div>
          </div>
        </div>
        <div className="row px-4">
          <div className="col-md-4">
            <div className="mt-2 w-100 app-card-block">
              <p className="mb-0" style={{ color: `#5a636a` }}>
                Interested Program
              </p>
              <strong>{programName}</strong>
            </div>
          </div>
          <div className="col-md-4">
            <div className="mt-2 w-100 app-card-block">
              <p className="mb-0" style={{ color: `#5a636a` }}>
                Study Type
              </p>
              <strong>Regular</strong>
            </div>
          </div>
          <div className="col-md-4">
            <div className="mt-2 w-100 app-card-block">
              <p className="mb-0" style={{ color: `#5a636a` }}>
                Study Mode
              </p>
              <strong>{studyModeCode}</strong>
            </div>
          </div>
        </div>
        {isProgramAddmittedOrIsIntakeAssigned && (
          <div className="row px-4">
            <div className="d-flex flex-column">
              {studentCode && (
                <StudentIdCard>
                  Student No: <span>{studentCode}</span>
                </StudentIdCard>
              )}
              {enrollmentNumber && (
                <StudentIdCard>Enrollment No: {enrollmentNumber}</StudentIdCard>
              )}
            </div>
          </div>
        )}

        <div className="w-100 mt-4 ">
          <Grid
            style={{
              padding: "10px 16px 10px 0",
              borderTop: `1px solid ${Green}`,
              backgroundColor: "#f4f2f1",
              justifyContent: "flex-end",
            }}
            container
            spacing={1}
          >
            {showEditBtn && (
              <Grid item>
                <StyledButton
                  isEditBtn
                  className="card-button"
                  isGreenWhiteCombination={true}
                  title="Edit"
                  onClick={() =>
                    onEdit(
                      applicationNumber,
                      leadCode,
                      status,
                      educationDetail,
                      id
                    )
                  }
                />
              </Grid>
            )}
            {showRMATBtn && (
              <Grid item>
                <StyledButton
                  onClick={() => {
                    router.push(RoutePaths.RMATView, {
                      query: { enrolmentCode },
                    });
                  }}
                  isRMATBtn
                  title="Take RMAT Test"
                />
              </Grid>
            )}
            {showPayBtn && (
              <Grid item>
                <StyledButton
                  onClick={() =>
                    isAcceptedApplication
                      ? onPay(
                          applicationNumber,
                          leadCode,
                          status,
                          educationDetail
                        )
                      : onPay(
                          applicationNumber,
                          leadCode,
                          status,
                          educationDetail
                        )
                  }
                  isPayBtn
                  className="card-button"
                  title={payBtnTitle}
                />
              </Grid>
            )}
            {showUploadBtn && (
              <Grid item>
                <StyledButton
                  onClick={() =>
                    onUploadDocuments(applicationNumber, leadCode, true, status)
                  }
                  isUploadBtn
                  className="card-button"
                  title="Upload Documents"
                />
              </Grid>
            )}
            {isAcceptedApplication &&
              educationDetail?.studentTypeCode === "BURSARY" &&
              sponsorModeType === "EMPBURSARY" && (
                <Grid item>
                  <StyledButton
                    onClick={() =>
                      onUploadBursaryDocuments(
                        applicationNumber,
                        leadCode,
                        status
                      )
                    }
                    isUploadBtn
                    className="card-button"
                    title="Upload Employee Bursary Letter"
                  />
                </Grid>
              )}
            {isProgramAddmittedOrIsIntakeAssigned && (
              <Grid item>
                <StyledButton
                  isDownloadBtn
                  isGreenWhiteCombination
                  onClick={() =>
                    onDownloadAcceptence(
                      document,
                      CommonEnums.CONFIRMATION_LETTER
                    )
                  }
                  className="card-button"
                  title="Confirmation Letter"
                />
              </Grid>
            )}

            {isProgramAddmittedOrIsIntakeAssigned && (
              <Grid item>
                <StyledButton
                  onClick={() =>
                    onDownloadAcceptence(
                      document,
                      CommonEnums.ACCEPTANCE_LETTER
                    )
                  }
                  isGreenWhiteCombination
                  isDownloadBtn
                  className="card-button"
                  title="Acceptence Letter"
                />
              </Grid>
            )}
            {isProgramAddmittedOrIsIntakeAssigned && (
              <Grid item>
                <StyledButton
                  onClick={() =>
                    onDownloadAcceptence(document, CommonEnums.WELCOME_LETTER)
                  }
                  isGreenWhiteCombination
                  isDownloadBtn
                  className="card-button"
                  title="Welcome Letter"
                />
              </Grid>
            )}
            {isProgramAddmitted && (
              <Grid item>
                <StyledButton
                  onClick={() =>
                    router.push("/student-registration-form/credentials", {
                      query: `state=${status}`,
                    })
                  }
                  className="card-button"
                  title="view login credentials"
                />
              </Grid>
            )}

            {showCredentialBtn && (
              <Grid item>
                <StyledButton
                  onClick={() =>
                    router.push("/student-registration-form/credentials", {
                      query: `state=${status}`,
                    })
                  }
                  className="card-button"
                  title="view login credentials"
                />
              </Grid>
            )}

            {isAcceptedApplication &&
              educationDetail?.studentTypeCode === "BURSARY" &&
              sponsorModeType === "EMPBURSARY" && (
                <Grid item>
                  <StyledButton
                    onClick={() =>
                      onUploadBursaryDocuments(
                        applicationNumber,
                        leadCode,
                        status
                      )
                    }
                    isUploadBtn
                    className="card-button"
                    title="Upload Employee Bursary Letter"
                  />
                </Grid>
              )}
          </Grid>
        </div>
        {/* <div className="d-flex justify-content-between">
          <Tooltip title="Refresh Application">
            <IconButton color="inherit">
              {" "}
              <CachedOutlined onClick={getStudentApplications} />
            </IconButton>
          </Tooltip>

          <StyledStatusBedge status={status}>{status}</StyledStatusBedge>
        </div>
        <ContentCard>
          {!showCredentialBtn ? (
            <div className="w-100">
              {applicationNumber && (
                <GreenFormHeading className="application-number">
                  Application Number - {applicationNumber}
                </GreenFormHeading>
              )}
              {enrolmentCode ? (
                <GreenFormHeading className="application-number">
                  Enrollment Number - {enrolmentCode}
                </GreenFormHeading>
              ) : null}
            </div>
          ) : (
            <div className="w-100">
              <GreenFormHeading className="application-number">
                Student Id - {studentCode}
              </GreenFormHeading>
              {enrolmentCode ? (
                <GreenFormHeading className="application-number">
                  Enrollment Number - {enrolmentCode}
                </GreenFormHeading>
              ) : null}
            </div>
          )}
          {enrollmentNumber && (
            <div className="mt-2 w-100 app-card-block">
              <p className="mb-0" style={{ color: `#5a636a` }}>
                Application Number
              </p>
              <strong>{applicationNumber}</strong>
            </div>
          )}
          <div className="mt-2 w-100 app-card-block">
            <p className="mb-0" style={{ color: `#5a636a` }}>
              Name
            </p>
            <strong>{name}</strong>
          </div>
          <div className="mt-2 w-100 app-card-block">
            <p className="mb-0" style={{ color: `#5a636a` }}>
              Interested Program
            </p>
            <strong>{programName}</strong>
          </div>
          <div className="mt-2 d-flex justify-content-between w-100 app-card-block">
            <div>
              <p className="mb-0" style={{ color: `#5a636a` }}>
                Study Mode
              </p>
              <strong>{studyModeCode}</strong>
            </div>
            <div>
              <p className="mb-0" style={{ color: `#5a636a` }}>
                Last updated
              </p>
              <strong>{transformDate(new Date(updatedAt))}</strong>
            </div>
          </div>
          <div className="w-100 mt-4 ">
            <Grid container spacing={1}>
              {showEditBtn && (
                <Grid item>
                  <StyledButton
                    isEditBtn
                    className="card-button"
                    isGreenWhiteCombination={true}
                    title="Edit"
                    onClick={() =>
                      onEdit(
                        applicationNumber,
                        leadCode,
                        status,
                        educationDetail,
                        id
                      )
                    }
                  />
                </Grid>
              )}
              {showRMATBtn && (
                <Grid item>
                  <StyledButton
                    onClick={() => {
                      router.push(RoutePaths.RMATView, {
                        query: { enrolmentCode },
                      });
                    }}
                    isRMATBtn
                    title="Take RMAT Test"
                  />
                </Grid>
              )}
              {showPayBtn && (
                <Grid item>
                  <StyledButton
                    onClick={() =>
                      isAcceptedApplication
                        ? onPay(
                            applicationNumber,
                            leadCode,
                            status,
                            educationDetail
                          )
                        : onPay(
                            applicationNumber,
                            leadCode,
                            status,
                            educationDetail
                          )
                    }
                    isPayBtn
                    className="card-button"
                    title={payBtnTitle}
                  />
                </Grid>
              )}
              {showCredentialBtn && (
                <Grid item>
                  <StyledButton
                    isDownloadBtn
                    onClick={() =>
                      onDownloadAcceptence(
                        document,
                        CommonEnums.CONFIRMATION_LETTER
                      )
                    }
                    className="card-button"
                    title="Confirmation Letter"
                  />
                </Grid>
              )}

              {showCredentialBtn && (
                <Grid item>
                  <StyledButton
                    onClick={() =>
                      router.push("/student-registration-form/credentials", {
                        query: `state=${status}`,
                      })
                    }
                    className="card-button"
                    title="view login credentials"
                  />
                </Grid>
              )}
              {showUploadBtn && (
                <Grid item>
                  <StyledButton
                    onClick={() =>
                      onUploadDocuments(
                        applicationNumber,
                        leadCode,
                        true,
                        status
                      )
                    }
                    isUploadBtn
                    className="card-button"
                    title="Upload Documents"
                  />
                </Grid>
              )}
              {isAcceptedApplication && (
                <Grid item>
                  <StyledButton
                    onClick={() =>
                      onDownloadAcceptence(
                        document,
                        CommonEnums.ACCEPTANCE_LETTER
                      )
                    }
                    isGreenWhiteCombination
                    isDownloadBtn
                    className="card-button"
                    title="Acceptence Letter"
                  />
                </Grid>
              )}
              {isAcceptedApplication &&
                educationDetail?.studentTypeCode === "BURSARY" &&
                sponsorModeType === "EMPBURSARY" && (
                  <Grid item>
                    <StyledButton
                      onClick={() =>
                        onUploadBursaryDocuments(
                          applicationNumber,
                          leadCode,
                          status
                        )
                      }
                      isUploadBtn
                      className="card-button"
                      title="Upload Employee Bursary Letter"
                    />
                  </Grid>
                )}
            </Grid>
          </div>
        </ContentCard> */}
      </ApplicationContainer>
    </>
  );
}

const StudentIdCard = styled.div<{ bgColor?: string }>`
  background: ${({ bgColor }) => bgColor || "#239083"};
  color: white;
  max-width: 250px;
  border-radius: 3px;
  padding: 2px 8px;
  margin: 15px 0;
  span {
    font-weight: bold;
  }
`;

const StyledStatusBedge = styled.div<any>`
  background: ${({ status }) => `${getStatusColor(status)}`};
  color: white;
  padding: 2px 5px;
  border: 1px solid;
  position: relative;
  margin-right: 0 !important;
  border-top: 0;
  border-bottom-left-radius: 10px;
  border-top-right-radius: 10px;
  padding: 5px 20px;
`;

const ApplicationContainer = styled.div`
  position: relative;
`;
const ContentCard = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;
