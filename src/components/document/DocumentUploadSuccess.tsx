import React from "react";
import { Green, GreenFormHeading } from "../common/common";
import { MainContainer as ParentContainer } from "../../pages/student-registration-form/application-form";
import { PaymentContainer, MainContainer } from "../payment/payment";
import Header from "../common/header";
const imgUrl = "/assets/images";

export const DocumentSuccess = (props: any) => {
  return (
    <>
      <ParentContainer>
        <Header />
        <div className="container-fluid w-75 mt-5">
          <MainContainer style={{ paddingBottom: "1rem" }}>
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
                      Document Submitted Successfully
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
          </MainContainer>
        </div>
      </ParentContainer>
    </>
  );
};
