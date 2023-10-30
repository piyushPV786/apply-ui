import React from "react";
import { GreenFormHeading } from "../common/common";
import Image from "next/image";
import PayIcon from "../../../public/assets/images/pay.png";
import { MainContainer, PaymentContainer } from "../login/style";
import Header from "../common/header";
import StyledButton from "../button/button";
const DocumentSuccess = (props: any) => {
  return (
    <>
      <MainContainer style={{ paddingBottom: "1rem" }}>
        <Header />
        <PaymentContainer>
          <div className="d-flex justify-content-center">
            <div className="row">
              <div className="col-sm-12">
                <div className="text-center mb-2">
                  <Image
                    width="190"
                    height="170"
                    src={PayIcon}
                    alt={"PayIcon"}
                  />
                </div>
                <div className="text-center w-100">
                  <GreenFormHeading style={{ fontSize: "24px" }}>
                    Document Submitted Successfully
                  </GreenFormHeading>
                  <p>
                    We will verify and get back to you. You wil receive an order
                    confirmation <br />
                    email with details soon.
                  </p>
                </div>
              </div>
              <div className="m-3">
                <StyledButton
                  onClick={() => {}}
                  title="Back to Dashboard"
                  isGreenWhiteCombination
                  className="me-2"
                />
              </div>
            </div>
          </div>
        </PaymentContainer>
      </MainContainer>
    </>
  );
};
export default DocumentSuccess;
