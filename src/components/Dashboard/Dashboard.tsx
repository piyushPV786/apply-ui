import { useEffect, useState } from "react";
import {
  Green,
  GreenFormHeading,
  LoaderComponent,
  Toaster,
  studentApplicationAllStatus,
} from "../common/common";
import { useRouter } from "next/router";
import { MainContainer as ParentContainer } from "../../pages/student-registration-form/application-form";
import { PaymentContainer } from "../payment/payment";
import Header from "../common/header";
import StyledButton from "../button/button";

import styled from "styled-components";
import Image from "next/image";
import ApplicationIcon from "../../../public/assets/images/new-application-icon.svg";
import Dropdown from "react-bootstrap/Dropdown";
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
  capitalizeFirstLetter,
  getStatusColor,
  showErrorToast,
  transformDate,
  formateInPascalCase,
} from "../../Util/Util";
import { Grid } from "@material-ui/core";
import { CachedOutlined, Height } from "@material-ui/icons";

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

  const onLoginCredentialsClick = (
    applicationCode: string | number,
    leadCode: string,
    status,
    educationDetail,
    draftId,
    username,
    password
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
      username,
      password,
    };
    sessionStorage.setItem("activeLeadDetail", JSON.stringify(leadDetail));
    router.push("/student-registration-form/credentials", {
      query: `state=${status}`,
    });
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
    status,
    studentCode
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
      studentCode: studentCode,
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
    documentTypeCode
  ) => {
    const documentDetails = documentDetail?.find(
      (doc) => doc?.documentTypeCode === documentTypeCode
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
              message: `${formateInPascalCase(
                documentTypeCode
              )}  Downloaded Successfully`,
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
          <div className="container-fluid application-page mt-4">
            <div style={{ paddingBottom: "1rem" }}>
              <PaymentContainer>
                {studentId && studentApplications.length > 0 ? (
                  <div>
                    <div className="row">
                      <div className="col-md-8">
                        <h2 className="app-header">My Applications</h2>
                        <p className="grey-text">
                          Here are all applications that you've applied through
                          Regenesys
                        </p>
                      </div>
                      <div className="col-md-4 d-flex align-items-start justify-content-end">
                        <div className="d-flex justify-content-end">
                          <StyledButton
                            onClick={onApplyNow}
                            className="button-shadow apply-button"
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
                              username,
                              password,

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
                                onLoginCredentialsClick={
                                  onLoginCredentialsClick
                                }
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
                                username={username}
                                password={password}
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
                              width="50"
                              height="50"
                              src={ApplicationIcon}
                              alt="Application Icon"
                            />
                          </div>
                        </div>
                        <div className="text-center w-100">
                          <GreenFormHeading className="apply-text">
                            No application yet
                          </GreenFormHeading>
                          <p className="grey-text mt-2 mb-3 mx-auto">
                            Thank you for trusting Regenesys as your educational
                            institution. Please apply for your interested
                            qualification now.
                          </p>
                          <StyledButton
                            className="button-shadow"
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
  onLoginCredentialsClick = (...args) => {},
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
  username,
  password,
  ...rest
}) {
  const { sponsor = null } = { ...(rest as any) };
  const isAcceptedApplication = status.includes(
    CommonEnums.APP_ENROLLED_ACCEPTED
  );
  console.log(studentCode);
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

  const showUploadBtn = status.includes(
    APPLICATION_STATUS.APPLICATION_DOCUMENTS_UPLOADED
  );

  const isProgramAddmittedOrIsIntakeAssigned = status.includes(
    CommonEnums.APP_ENROLLED_STATUS
  );

  return (
    <>
      <ApplicationContainer className="container bg-white p-0 app-card border rounded overflow-hidden">
        <div className="d-flex flex-row justify-content-between">
          <div className="refresh-icon" onClick={getStudentApplications}>
            <CachedOutlined
              titleAccess="Refresh Application"
              className="m-2 refresh-button"
            />
          </div>
          <div className="status-sec">
            <StyledStatusBedge status={status}>
              {studentApplicationAllStatus[status] ?? status}
            </StyledStatusBedge>
          </div>
        </div>
        <div className="row px-4">
          <div className="col-md-6">
            <div className="mt-3 w-100 app-card-block">
              <p className="mb-0" style={{ color: `#5a636a` }}>
                Name
              </p>
              <strong>{name}</strong>
            </div>
          </div>
          <div className="col-md-6">
            <div className="mt-3 w-100 app-card-block">
              <p className="mb-0" style={{ color: `#5a636a` }}>
                Last updated
              </p>
              <strong>{transformDate(new Date(updatedAt))}</strong>
            </div>
          </div>
        </div>
        <div className="row px-4">
          <div className="col-md-6">
            <div className="mt-2 w-100 app-card-block">
              <p className="mb-0" style={{ color: `#5a636a` }}>
                Interested Program
              </p>
              <strong>{programName}</strong>
            </div>
          </div>
          <div className="col-md-3">
            <div className="mt-2 w-100 app-card-block">
              <p className="mb-0" style={{ color: `#5a636a` }}>
                Study Type
              </p>
              <strong>Regular</strong>
            </div>
          </div>
          <div className="col-md-3">
            <div className="mt-2 w-100 app-card-block">
              <p className="mb-0" style={{ color: `#5a636a` }}>
                Study Mode
              </p>
              <strong>{studyModeCode}</strong>
            </div>
          </div>
        </div>

        <div className="row px-4">
          <div className="d-flex flex-row ">
            {applicationNumber && (
              <StudentIdCard>Application No: {applicationNumber}</StudentIdCard>
            )}
            {studentCode && (
              <StudentIdCard>Student No: {studentCode}</StudentIdCard>
            )}
            {enrolmentCode && (
              <EnrollmentIdCard>
                Enrollment No: {enrolmentCode}
              </EnrollmentIdCard>
            )}
          </div>
        </div>
        <div className="w-100 mt-4 ">
          <Grid
            container
            style={{
              padding: "10px 16px 10px",
              borderTop: `1px solid ${Green}`,
              backgroundColor: "#f4f2f1",
              minHeight: "64px",
            }}
            sm={12}
          >
            <Grid sm={3} item>
              {!!document?.filter((item) => {
                return (
                  item?.documentTypeCode === CommonEnums.CONFIRMATION_LETTER ||
                  item?.documentTypeCode === CommonEnums.ACCEPTANCE_LETTER ||
                  item?.documentTypeCode === CommonEnums.WELCOME_LETTER
                );
              })?.length && (
                <Dropdown style={{ width: "100%" }}>
                  <ContentCard variant="success" id="dropdown-basic">
                    Downloads
                  </ContentCard>

                  <Dropdown.Menu>
                    {document
                      ?.filter((item) => {
                        return (
                          item?.documentTypeCode ===
                            CommonEnums.CONFIRMATION_LETTER ||
                          item?.documentTypeCode ===
                            CommonEnums.ACCEPTANCE_LETTER ||
                          item?.documentTypeCode === CommonEnums.WELCOME_LETTER
                        );
                      })
                      ?.map((item) => {
                        return (
                          <Dropdown.Item
                            onClick={() => {
                              onDownloadAcceptence(
                                document,
                                item?.documentTypeCode
                              );
                            }}
                            style={{ width: "100%" }}
                          >
                            {`${capitalizeFirstLetter(
                              item?.documentTypeCode.split("-")[0].toLowerCase()
                            )} ${item?.documentTypeCode
                              .split("-")[1]
                              .toLowerCase()}`}
                          </Dropdown.Item>
                        );
                      })}
                  </Dropdown.Menu>
                </Dropdown>
              )}
            </Grid>
            <Grid
              container
              style={{
                justifyContent: "flex-end",
              }}
              className="d-flex flex-row"
              sm={9}
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
              {!showUploadBtn && (
                <Grid item>
                  <StyledButton
                    onClick={() =>
                      onUploadDocuments(
                        applicationNumber,
                        leadCode,
                        status,
                        studentCode
                      )
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

              {isProgramAddmitted && (
                <Grid item>
                  <StyledButton
                    onClick={() => {
                      onLoginCredentialsClick(
                        applicationNumber,
                        leadCode,
                        status,
                        educationDetail,
                        id,
                        username,
                        password
                      );
                    }}
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
          </Grid>
        </div>
      </ApplicationContainer>
    </>
  );
}

const StudentIdCard = styled.div<{ bgColor?: string }>`
  background: ${({ bgColor }) => bgColor || "#235290"};
  color: white;
  max-width: 250px;
  border-radius: 3px;
  padding: 2px 8px;
  margin: 15px 5px 0 0;
  font-size: 13px;
  span {
    font-weight: bold;
  }
`;

const EnrollmentIdCard = styled.div<{ bgColor?: string }>`
  background: ${({ bgColor }) => bgColor || "#239083"};
  color: white;
  max-width: 250px;
  border-radius: 3px;
  padding: 2px 8px;
  margin: 15px 5px 0 0;
  font-size: 13px;
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
  border-top-right-radius: 5px;
  padding: 5px 20px;
  letter-spacing: 0.5px;
  font-size: 14px;
`;

const ApplicationContainer = styled.div`
  position: relative;
`;
const ContentCard = styled(Dropdown.Toggle)`
  height: 34px;
  background-color: #008554;
  font-size: 0.86rem;
  border-radius: 4px;
`;
