import React from "react";
import { DefaultGrey, Green, GreenFormHeading } from "../common/common";
import { MainContainer as ParentContainer } from "../../pages/student-registration-form/application-form";
import { PaymentContainer } from "../payment/payment";
import Header from "../common/header";
import StyledButton from "../button/button";
import { useRouter } from "next/router";
import styled from "styled-components";
const imgUrl = "/assets/images";

export const ApplicationDashboard = (props: any) => {
  const router = useRouter();

  const existingApplication = [1];

  const onApplyNow = () => {
    router.push("/student-registration-form/application-form");
  };
  return (
    <>
      <ParentContainer>
        <Header />
        <div className="container-fluid mt-5">
          <div style={{ paddingBottom: "1rem" }}>
            <PaymentContainer>
              {existingApplication.length > 0 && (
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
                    <div className="col-md-4 mb-2">
                      <ApplicationCard status="pending" />
                    </div>
                    <div className="col-md-4 mb-2">
                      <ApplicationCard status="draft" />
                    </div>
                    <div className="col-md-4">
                      <ApplicationCard status="pendingDocuments" />
                    </div>
                    <div className="col-md-4">
                      <ApplicationCard status="submitted" />
                    </div>
                  </div>
                </div>
              )}
              {existingApplication.length === 0 && (
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
                        <img
                          width="85px"
                          height="85px"
                          src={`${imgUrl}/application-icon.svg`}
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
              )}
            </PaymentContainer>
          </div>
        </div>
      </ParentContainer>
    </>
  );
};

function ApplicationCard(props: any) {
  return (
    <>
      <div className="container bg-white p-3 border rounded">
        <div className="d-flex justify-content-end">
          <StyledStatusBedge status={props?.status}>
            Payment Pending
          </StyledStatusBedge>
        </div>
        <ContentCard>
          <div className="w-100">
            <GreenFormHeading className="fs-4">
              Application Number - 01
            </GreenFormHeading>
          </div>
          <div className="mt-2">
            <p className="mb-0" style={{ color: `#5a636a` }}>
              Name
            </p>
            <strong>Jhon Doe</strong>
          </div>
          <div className="mt-2">
            <p className="mb-0" style={{ color: `#5a636a` }}>
              Intrested Qualification
            </p>
            <strong>Bachelor of Business Administration</strong>
          </div>
          <div className="mt-2 d-flex justify-content-between w-100">
            <div>
              <p className="mb-0" style={{ color: `#5a636a` }}>
                Study Mode
              </p>
              <strong>Online/ Distance</strong>
            </div>
            <div>
              <p className="mb-0" style={{ color: `#5a636a` }}>
                Last updated
              </p>
              <strong>11th Aug 2022</strong>
            </div>
          </div>
          <div className=" w-100 text-center d-flex justify-content-evenly mt-5">
            <StyledButton
              isEditBtn
              className="w-25"
              isGreenWhiteCombination={true}
              title="Edit"
            />
            <StyledButton isPayBtn className="w-25" title="pay" />
          </div>
        </ContentCard>
      </div>
    </>
  );
}

const StyledStatusBedge = styled.div<any>`
  background: ${({ status }) => {
    if (status === "pending") return "#ffde9e";
    if (status === "draft") return "#c1c1c1";
    if (status === "pendingDocuments") return "#b7fffa";
    if (status === "submitted") return "#e0f8ef";
  }};
  border-radius: 10px;
  color: #2d3d54;
  padding: 2px 5px;
  border: 1px solid;
`;

const ContentCard = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;
