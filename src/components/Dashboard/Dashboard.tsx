import React, { useEffect, useState } from "react";
import { Green, GreenFormHeading, Toaster } from "../common/common";
import { MainContainer as ParentContainer } from "../../pages/student-registration-form/application-form";
import { PaymentContainer } from "../payment/payment";
import Header from "../common/header";
import StyledButton from "../button/button";
import { useRouter } from "next/router";
import styled from "styled-components";
import Image from "next/image";
import ApplicationIcon from "../../../public/assets/images/new-application-icon.svg";
import { CommonApi, CommonEnums, RoutePaths } from "../common/constant";
import { AcadmicApi, AuthApi } from "../../service/Axios";
import { IApplication, IDocument, IOption } from "../common/types";
import {
  downloadDocument,
  getCommonUploadDocumentUrl,
  transformDate,
} from "../../Util/Util";

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
        if (application.length > 0 && response.data.length > 0) {
          const applications = [...application];
          applications.forEach((app: IApplication) => {
            response?.data.forEach((element: IOption) => {
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
      router.push(RoutePaths.Application_Form);
    }
  };
  const clearRoute = () => {
    sessionStorage.setItem("routeTo", "");
  };
  const onEdit = (
    applicationCode: string | number,
    leadCode: string,
    status,
    educationDetail
  ) => {
    clearRoute();
    const isdraftSave =
      status === (CommonEnums.DRAFT_STATUS || "DRAFT") ? true : false;
    const leadDetail = {
      applicationCode,
      leadCode,
      isdraftSave,
      educationDetail,
    };
    sessionStorage.setItem("activeLeadDetail", JSON.stringify(leadDetail));
    router.push(RoutePaths.Application_Form);
  };
  const onPay = (
    applicationCode: string | number,
    leadCode: string,
    status,
    educationDetail
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
    router.push(RoutePaths.Application_Form);
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
    router.push(RoutePaths.Application_Form);
  };

  const onDownloadAcceptence = (
    documentDetail: IDocument[],
    applicationCode: string
  ) => {
    const { name, documentTypeCode } = documentDetail[0];
    // const fileType = name.split(".").pop();
    getCommonUploadDocumentUrl(name).then((res) => {
      if (res?.statusCode === 200) {
        downloadDocument(res?.data, name);
      } else {
        setToast({ show: true, message: res?.message, success: false });
      }
    });
  };

  const onToast = () => {
    setToast((prevState) => ({ ...prevState, show: !prevState?.show }));
  };
  const { message, show, success } = showToast;
  return (
    <>
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
                          title="Apply New Course"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    {studentApplications.map(
                      (
                        {
                          status,
                          applicationCode,
                          programName,
                          updatedAt,
                          enrolmentCode,
                          lead: {
                            firstName,
                            lastName,
                            middleName = "",
                            leadCode,
                          },
                          education,
                          document,
                        },
                        idx
                      ) => (
                        <div key={applicationCode} className="col-md-4 mb-2">
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
                            leadCode={leadCode}
                            studyModeCode={education?.studyModeCode}
                            updatedAt={updatedAt}
                            educationDetail={education}
                            document={document}
                            enrolmentCode={enrolmentCode}
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
                          Thank you for trusting Regenesys as your Educational
                          Institution. Please Apply for your interested
                          qualification now.
                        </p>
                        <StyledButton onClick={onApplyNow} title="Apply Now" />
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
  onPay = (...args) => {},
  onUploadDocuments = (...args) => {},
  onDownloadAcceptence = (...args) => {},
  studyModeCode,
  updatedAt = "",
  educationDetail,
  document,
}) {
  const showEditBtn =
    status.includes(CommonEnums.FEES_PENDING_STATUS) ||
    status.includes(CommonEnums.DRAFT_STATUS);
  const showDOcumentUploadBtn =
    status.includes(CommonEnums.RESUB_APP_DOC) ||
    status.includes(CommonEnums.APP_ENROLLED_STATUS) ||
    status.includes("APP-ENROLED");
  const showPayBtn =
    status.includes(CommonEnums.RESUB_APP_FEE_PROOF) ||
    status.includes(CommonEnums.FEES_PENDING_STATUS);
  const enrollmentNumber =
    status.includes(CommonEnums.APP_ENROLLED_STATUS) ||
    status.includes("APP-ENROLED")
      ? enrolmentCode
      : "";
  return (
    <>
      <ApplicationContainer className="container bg-white p-3 app-card border rounded ">
        <div className="d-flex justify-content-end">
          <StyledStatusBedge status={status}>{status}</StyledStatusBedge>
        </div>
        <ContentCard>
          <div className="w-100">
            <GreenFormHeading className="application-number">
              Application Number - {enrollmentNumber || applicationNumber}
              <br />
              Enrollment Number - {enrollmentNumber}
            </GreenFormHeading>
          </div>
          <div className="mt-2 w-100 app-card-block">
            <p className="mb-0" style={{ color: `#5a636a` }}>
              Name
            </p>
            <strong>{name}</strong>
          </div>
          <div className="mt-2 w-100 app-card-block">
            <p className="mb-0" style={{ color: `#5a636a` }}>
              Intrested Program
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
          <div className="w-100 text-center d-flex justify-content-center mt-4 card-group-button">
            {showEditBtn && (
              <StyledButton
                isEditBtn
                className="card-button"
                isGreenWhiteCombination={true}
                title="Edit"
                onClick={() =>
                  onEdit(applicationNumber, leadCode, status, educationDetail)
                }
              />
            )}
            {showPayBtn && (
              <StyledButton
                onClick={() =>
                  onPay(applicationNumber, leadCode, true, educationDetail)
                }
                isPayBtn
                className="card-button"
                title="pay"
              />
            )}
            {showDOcumentUploadBtn && (
              <StyledButton
                onClick={() =>
                  onUploadDocuments(applicationNumber, leadCode, true)
                }
                isUploadBtn
                className="card-button"
                title="Upload Document"
              />
            )}
            {status.includes(CommonEnums.APP_ENROLLED_ACCEPTED) && (
              <StyledButton
                onClick={() =>
                  onDownloadAcceptence(document, applicationNumber)
                }
                isGreenWhiteCombination
                isDownloadBtn
                className="card-button"
                title="Acceptence Letter"
              />
            )}
          </div>
        </ContentCard>
      </ApplicationContainer>
    </>
  );
}

const StyledStatusBedge = styled.div<any>`
  background: ${({ status }) => {
    if (status === CommonEnums.FEES_PENDING_STATUS) return "#ffde9e";
    if (status === (CommonEnums.DRAFT_STATUS || "DRAFT")) return "#c1c1c1";
    if (
      status === (CommonEnums.RESUB_APP_DOC || CommonEnums.RESUB_APP_FEE_PROOF)
    )
      return "#b7fffa";
    if (status === CommonEnums.APP_ENROLLED_STATUS) return "#e0f8ef";
    else return "#ffde9e";
  }};
  border-radius: 5px;
  color: #2d3d54;
  padding: 2px 5px;
  border: 1px solid;
`;

const ApplicationContainer = styled.div``;
const ContentCard = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;
