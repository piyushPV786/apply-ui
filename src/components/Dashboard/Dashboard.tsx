import React, { useEffect, useState } from "react";
import { Green, GreenFormHeading } from "../common/common";
import { MainContainer as ParentContainer } from "../../pages/student-registration-form/application-form";
import { PaymentContainer } from "../payment/payment";
import Header from "../common/header";
import StyledButton from "../button/button";
import { useRouter } from "next/router";
import styled from "styled-components";
import Image from "next/image";
import ApplicationIcon from "../../../public/assets/images/application-icon.svg";
import { CommonApi, CommonEnums, RoutePaths } from "../common/constant";
import { AcadmicApi, AuthApi } from "../../service/Axios";
import { IApplication, IOption } from "../common/types";
import { transformDate } from "../../Util/Util";

export const ApplicationDashboard = (props: any) => {
  const [studentId, setStudenId] = useState<string | null>(null);
  const [studentApplications, setStudentApplications] = useState<
    IApplication[]
  >([]);
  const router = useRouter();

  useEffect(() => {
    const studentId = JSON.parse(
      sessionStorage?.getItem("studentId") as any
    )?.leadCode;
    // if ("RLEAD00000005" || (studentId && studentApplications.length === 0)) {
    if (studentId && studentApplications.length === 0) {
      // getStudentApplications(studentId);
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
    router.push(RoutePaths.Application_Form);
  };
  const onEdit = (
    applicationCode: string | number,
    leadCode: string,
    isDraft
  ) => {
    const isdraftSave = isDraft === CommonEnums.DRAFT ? true : false;
    const leadDetail = { applicationCode, leadCode, isdraftSave };
    sessionStorage.setItem("activeLeadDetail", JSON.stringify(leadDetail));
    onApplyNow();
  };
  const onPay = (
    applicationCode: string | number,
    leadCode: string,
    isDraft
  ) => {
    const isdraftSave = isDraft === CommonEnums.DRAFT;
    const isPaymentPending = isDraft === CommonEnums.DRAFT;
    const leadDetail = {
      applicationCode,
      leadCode,
      isPaymentPending,
      isdraftSave,
    };
    sessionStorage.setItem("activeLeadDetail", JSON.stringify(leadDetail));
  };
  return (
    <>
      <ParentContainer>
        <Header />
        <div className="container-fluid mt-5">
          <div style={{ paddingBottom: "1rem" }}>
            <PaymentContainer>
              {studentId && studentApplications.length > 0 ? (
                <div>
                  <div className="row">
                    <div className="col">
                      <GreenFormHeading
                        style={{ fontSize: "24px", color: "#000" }}
                      >
                        My Applications
                      </GreenFormHeading>
                      <p>
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
                          lead: {
                            firstName,
                            lastName,
                            middleName = "",
                            leadCode,
                          },
                          education: { studyModeCode },
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
                            leadCode={leadCode}
                            studyModeCode={studyModeCode}
                            updatedAt={updatedAt}
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
                            width="85"
                            height="85"
                            src={ApplicationIcon}
                            alt="application-icon.svg"
                          />
                        </div>
                      </div>
                      <div className="text-center w-100">
                        <GreenFormHeading
                          style={{ fontSize: "24px", color: "#000" }}
                        >
                          No application yet
                        </GreenFormHeading>
                        <p>
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
      </ParentContainer>
    </>
  );
};

function ApplicationCard({
  name,
  applicationNumber,
  status = "",
  programName,
  leadCode,
  onEdit = (...args) => {},
  onPay = (...args) => {},
  studyModeCode,
  updatedAt = "",
}) {
  return (
    <>
      <ApplicationContainer className="container bg-white p-3 border rounded ">
        <div className="d-flex justify-content-end">
          <StyledStatusBedge status={status}>{status}</StyledStatusBedge>
        </div>
        <ContentCard>
          <div className="w-100">
            <GreenFormHeading className="fs-4">
              Application Number - {applicationNumber}
            </GreenFormHeading>
          </div>
          <div className="mt-2">
            <p className="mb-0" style={{ color: `#5a636a` }}>
              Name
            </p>
            <strong>{name}</strong>
          </div>
          <div className="mt-2">
            <p className="mb-0" style={{ color: `#5a636a` }}>
              Intrested Program
            </p>
            <strong>{programName}</strong>
          </div>
          <div className="mt-2 d-flex justify-content-between w-100">
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
          <div className=" w-100 text-center d-flex justify-content-evenly mt-5">
            <StyledButton
              isEditBtn
              className="w-25"
              isGreenWhiteCombination={true}
              title="Edit"
              onClick={() => onEdit(applicationNumber, leadCode, status)}
            />
            {status !== CommonEnums.DRAFT && (
              <StyledButton
                onClick={() => onPay(applicationNumber, leadCode, status)}
                isPayBtn
                className="w-25"
                title="pay"
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
    if (status === CommonEnums.FEES_PENDING) return "#ffde9e";
    if (status === CommonEnums.DRAFT) return "#c1c1c1";
    if (status === "pendingDocuments") return "#b7fffa";
    if (status === "submitted") return "#e0f8ef";
    else return "#ffde9e";
  }};
  border-radius: 10px;
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
