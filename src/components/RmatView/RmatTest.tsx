import React from "react";
import { MainContainer, PaymentContainer } from "../payment/payment";
import { GreenFormHeading } from "../common/common";
import Header from "../common/header";
import { AlertEnums, RoutePaths } from "../common/constant";
import AlertBox from "../alert/Alert";
import { GreenText } from "../student/style";
import StyledButton from "../button/button";
import { useRouter } from "next/router";
import { MainContainer as ParentContainer } from "../../pages/student-registration-form/application-form";
interface RmatTestProps {}

const RmatTest: React.FC = () => {
  const router = useRouter();
  return (
    <ParentContainer className="text-center">
      <Header />
      <div className="container-fluid w-75 mt-5">
        <MainContainer style={{ paddingBottom: "1rem" }}>
          <PaymentContainer>
            <div className="row">
              <div className="col-sm-12">
                <div className="text-center mb-2">
                  {/* <Image width="190" height="170" src={PayIcon} alt="payIcon" /> */}
                </div>
                <div className="text-center w-100">
                  <GreenFormHeading style={{ fontSize: "24px" }}>
                    RMAT Test Details
                  </GreenFormHeading>
                  <p>Your login credentials for the RMAT Test</p>
                  <div className="mb-4 mt-2">
                    <AlertBox
                      style={{ width: "100%", maxWidth: "unset" }}
                      severity={AlertEnums.INFO}
                    >
                      Team is waiting for your test result to proceed further
                      admission process
                    </AlertBox>
                  </div>
                </div>
                <div className="row">
                  <div className="col-4">
                    <p>RMAT Test URL</p>
                    <a href="http://rmat.regeniusuat.net/">
                      <GreenText>http://rmat.regeniusuat.net/</GreenText>
                    </a>
                  </div>
                  <div className="col-4">
                    <p>Username</p>
                    <a href="#">
                      <GreenText>Karn.Sharma@gmail.com</GreenText>
                    </a>
                  </div>
                  <div className="col-4">
                    <p>Password</p>
                    <strong>wp9dh%sKgK</strong>
                  </div>
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
                title={"Back to Dashboard"}
                onClick={() => {
                  localStorage.setItem("leadData", "");
                  sessionStorage.setItem("activeLeadDetail", "");
                  router.push(RoutePaths.Dashboard);
                }}
              />
              &nbsp;&nbsp;&nbsp;
              <StyledButton
                // onClick={onUploadDocument}
                title={"Take RMAT Test"}
              />
            </>
          </div>
        </MainContainer>
      </div>
    </ParentContainer>
  );
};

export default RmatTest;
