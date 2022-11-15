import React, { useState, useEffect } from "react";
import StyledButton from "../button/button";
import { Green, GreenFormHeading } from "../common/common";
import { MainContainer, PaymentContainer } from "./payment";
import { MainContainer as ParentContainer } from "../../pages/student-registration-form/application-form";
import { useRouter } from "next/router";
import Header from "../common/header";
const imgUrl = "/assets/images";

const PaymentSuccessFull = (props: any) => {
  const [isSuccess, setSuccess] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if (window && router.query?.success) {
      const isSuccess = JSON.parse(router.query?.success as any);
      setSuccess(isSuccess);
    }
  }, [router.query]);

  const onTryAgain = () => {
    router.push({
      pathname: "/student-registration-form/application-form",
      query: { isFormSubmittedAlready: true, isPaymentFail: true },
    });
  };
  return (
    <ParentContainer>
      <Header />
      <div className="container-fluid w-75 mt-5">
        <MainContainer style={{ paddingBottom: "1rem" }}>
          {!isSuccess && (
            <PaymentContainer>
              <div className="row">
                <div className="col-sm-12">
                  <div className="text-center mb-2">
                    <img
                      width="100px"
                      height="100px"
                      src={`${imgUrl}/warning-svgrepo-com.png`}
                    />
                  </div>
                  <div className="text-center w-100">
                    <GreenFormHeading
                      style={{ fontSize: "28px", color: "#c42014" }}
                    >
                      Transaction Failed
                    </GreenFormHeading>
                    <p>
                      Your payment was not successfully processed. Please try
                      again, if still <br />
                      encounter the same error, try with another payment method.
                      <br />
                      In case of any query please free to contact{" "}
                      <span style={{ color: `${Green}` }}>1800 212 9950</span>
                    </p>
                  </div>
                </div>
              </div>
            </PaymentContainer>
          )}
          {isSuccess && (
            <PaymentContainer>
              <div className="row">
                <div className="col-sm-12">
                  <div className="text-center mb-2">
                    <img
                      width="190px"
                      height="170px"
                      src={`${imgUrl}/pay.png`}
                    />
                  </div>
                  <div className="text-center w-100">
                    <GreenFormHeading style={{ fontSize: "24px" }}>
                      Your Payment Proof Submitted Successfully
                    </GreenFormHeading>
                    <p>
                      We will verify and get back to you. You wil receive an
                      order confirmation <br />
                      email with details soon.
                    </p>
                  </div>
                </div>
              </div>
            </PaymentContainer>
          )}
          <div className="mt-4 text-center">
            {isSuccess && (
              <>
                <StyledButton
                  className="mb-1"
                  type="button"
                  isGreenWhiteCombination={true}
                  title={"Skip for Now"}
                  onClick={props?.onSkipForNowOnPayment}
                />
                &nbsp;&nbsp;&nbsp;
                <StyledButton
                  onClick={props?.submitPaymentDocs}
                  title={"Upload Document"}
                />
              </>
            )}
            {!isSuccess && (
              <StyledButton onClick={onTryAgain} title={"Try Again"} />
            )}
          </div>
        </MainContainer>
      </div>
    </ParentContainer>
  );
};

export default PaymentSuccessFull;
