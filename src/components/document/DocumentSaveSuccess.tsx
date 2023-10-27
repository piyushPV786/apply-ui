import React from "react";
import { GreenFormHeading } from "../common/common";
import Image from "next/image";
import PayIcon from "../../../public/assets/images/pay.png";
import StyledButton from "../button/button";
import { useRouter } from "next/router";
import { RoutePaths } from "../common/constant";
import { MainContainer, PaymentContainer } from "../login/style";

export const DocumentSaveSuccess = (props: any) => {
  const router = useRouter();
  return (
    <>
      <MainContainer style={{ paddingBottom: "1rem" }}>
        <PaymentContainer>
          <div className="row">
            <div className="col-sm-12">
              <div className="text-center mb-2">
                <Image width="190" height="170" src={PayIcon} alt={"PayIcon"} />
              </div>
              <div className="text-center w-100">
                <GreenFormHeading style={{ fontSize: "24px" }}>
                  Document Saved Successfully
                </GreenFormHeading>
                <p>
                  We will verify and get back to you. You wil receive an order
                  confirmation <br />
                  email with details soon.
                </p>
              </div>
            </div>

            <div>
              <StyledButton
                onClick={() => {
                  localStorage.setItem("leadData", "");
                  sessionStorage.setItem("activeLeadDetail", "");
                  router.push(RoutePaths.Dashboard);
                }}
                title="Back to Dashboard"
                isGreenWhiteCombination
                className="me-2"
              />
            </div>
          </div>
        </PaymentContainer>
      </MainContainer>
    </>
  );
};
