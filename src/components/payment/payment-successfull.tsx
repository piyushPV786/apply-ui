import React, { useState, useEffect } from "react";
import StyledButton from "../button/button";
import { Green, GreenFormHeading } from "../common/common";
import { MainContainer, PaymentContainer } from "./payment";
import { MainContainer as ParentContainer } from "../../pages/student-registration-form/application-form";
import { useRouter } from "next/router";
import Header from "../common/header";
import WarningIcon from "../../../public/assets/images/warning-svgrepo-com.png";
import PayIcon from "../../../public/assets/images/pay.png";
import Image from "next/image";
import { RoutePaths } from "../common/constant";
import { DocumentSuccess } from "../document/DocumentUploadSuccess";

const PaymentSuccessFull = (props: any) => {
  const router = useRouter();
  const onTryAgain = () => {
    router.push({
      pathname: RoutePaths.Application_Form,
      query: { isFormSubmittedAlready: true, isPaymentFail: true },
    });
  };

  const OnlinePaymentSuccess = () => {
    return (
      <PaymentContainer>
        <div className="row">
          <div className="col-sm-12">
            <div className="text-center mb-2">
              <Image width="190" height="170" src={PayIcon} alt="payIcon" />
            </div>
            <div className="text-center w-100">
              <GreenFormHeading style={{ fontSize: "24px" }}>
                Transaction Successfully
              </GreenFormHeading>
              <p>
                We will verify and get back to you. You wil receive an order
                confirmation <br />
                email with details soon.
              </p>
            </div>
          </div>
        </div>
      </PaymentContainer>
    );
  };
  const OnlinePaymentFailed = () => {
    return (
      <>
        <PaymentContainer>
          <div className="row">
            <div className="col-sm-12">
              <div className="text-center mb-2">
                <Image
                  width="100"
                  height="100"
                  src={WarningIcon}
                  alt="warning"
                />
              </div>
              <div className="text-center w-100">
                <GreenFormHeading
                  style={{ fontSize: "28px", color: "#c42014" }}
                >
                  Transaction Failed
                </GreenFormHeading>
                <p>
                  Your payment was not successfully processed. Please try again,
                  if still <br />
                  encounter the same error, try with another payment method.
                  <br />
                  In case of any query please free to contact{" "}
                  <span style={{ color: `${Green}` }}>1800 212 9950</span>
                </p>
              </div>
            </div>
          </div>
        </PaymentContainer>
        <StyledButton onClick={onTryAgain} title={"Try Again"} />
      </>
    );
  };
  const onUploadDocument = () => {
    sessionStorage.setItem("routeTo", "Document");
    router.push(RoutePaths.Application_Form);
  };
  const DocumentUploadSuccess = () => {
    return (
      <>
        <PaymentContainer>
          <div className="row">
            <div className="col-sm-12">
              <div className="text-center mb-2">
                <Image width="190" height="170" src={PayIcon} alt="payIcon" />
              </div>
              <div className="text-center w-100">
                <GreenFormHeading style={{ fontSize: "24px" }}>
                  Your Payment Proof Submitted Successfully
                </GreenFormHeading>
                <p>
                  We will verify and get back to you. You wil receive an order
                  confirmation <br />
                  email with details soon.
                </p>
              </div>
            </div>
          </div>
        </PaymentContainer>
        <div className="mt-4 text-center">
          <>
            <StyledButton
              className="mb-1"
              type="button"
              isGreenWhiteCombination={true}
              title={"Skip for Now"}
              onClick={() => router.push(RoutePaths.Dashboard)}
            />
            &nbsp;&nbsp;&nbsp;
            <StyledButton
              onClick={onUploadDocument}
              title={"Upload Document"}
            />
          </>
        </div>
      </>
    );
  };
  const DocumentUploadFailed = () => {
    return (
      <div className="mt-4 text-center">
        <PaymentContainer>
          <div className="row">
            <div className="col-sm-12">
              <div className="text-center mb-2">
                <Image
                  width="100"
                  height="100"
                  src={WarningIcon}
                  alt="warning"
                />
              </div>
              <div className="text-center w-100">
                <GreenFormHeading
                  style={{ fontSize: "28px", color: "#c42014" }}
                >
                  Transaction Failed
                </GreenFormHeading>
                <p>
                  Your payment was not successfully processed. Please try again,
                  if still <br />
                  encounter the same error, try with another payment method.
                  <br />
                  In case of any query please free to contact{" "}
                  <span style={{ color: `${Green}` }}>1800 212 9950</span>
                </p>
              </div>
            </div>
          </div>
        </PaymentContainer>
      </div>
    );
  };
  return (
    <ParentContainer className="text-center">
    <Header />
    <div className="container-fluid w-75 mt-5">
      <MainContainer style={{ paddingBottom: "1rem" }}>
        {props?.pageType === "failure" && <OnlinePaymentFailed />}
        {props?.pageType === "success" && <OnlinePaymentSuccess />}
        {props?.pageType === "document-success" && <DocumentUploadSuccess />}
        {props?.pageType === "document-upload-success" && <DocumentSuccess />}
        {props?.pageType === "document-failure" && <DocumentUploadFailed />}
      </MainContainer>
    </div>
    <StyledButton
      onClick={() => router.push(RoutePaths.Dashboard)}
      title="Back to Dashboard"
    />
  </ParentContainer>
  );
};

export default PaymentSuccessFull;
