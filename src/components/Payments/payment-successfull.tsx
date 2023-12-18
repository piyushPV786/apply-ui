import React from "react";
import StyledButton from "../button/button";
import { Green, GreenFormHeading } from "../common/common";
import { useRouter } from "next/router";
import Header from "../common/header";
import WarningIcon from "../../../public/assets/images/warning-svgrepo-com.png";
import PayIcon from "../../../public/assets/images/pay.png";
import Image from "next/image";
import { RoutePaths } from "../common/constant";
import { MainContainer, PaymentContainer } from "../login/style";

const PaymentSuccessFull = (props: any) => {
  const router = useRouter();

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
                Payment Successful
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
                  Payment Failed
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
      </>
    );
  };

  return (
    <MainContainer className="text-center">
      <Header />
      <div className="container-fluid w-75 mt-5">
        <PaymentContainer style={{ paddingBottom: "1rem" }}>
          {props?.pageType === "failure" && <OnlinePaymentFailed />}
          {props?.pageType === "success" && <OnlinePaymentSuccess />}

          <div>
            {props?.pageType === "failure" && (
              <StyledButton
                onClick={() => router.push(`/payments/${props.appCode}`)}
                title="Retry Payment"
                isGreenWhiteCombination
                className="me-2"
              />
            )}
            <StyledButton
              onClick={() => {
                localStorage.setItem("leadData", "");
                sessionStorage.setItem("activeLeadDetail", "");
                router.push(RoutePaths.Dashboard);
              }}
              title="Back to Dashboard"
              isGreenWhiteCombination
            />
          </div>
        </PaymentContainer>
      </div>
    </MainContainer>
  );
};

export default PaymentSuccessFull;
