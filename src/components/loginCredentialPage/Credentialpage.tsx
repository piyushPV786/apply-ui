import React from "react";
import { GreenFormHeading } from "../common/common";
import Image from "next/image";
import PayIcon from "../../../public/assets/images/pay.png";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import StyledButton from "../button/button";
import { RoutePaths } from "../common/constant";
import { MainContainer, PaymentContainer } from "../login/style";

export const LoginCredentials = () => {
  const router = useRouter();
  const url: any =
    process.env.NEXT_PUBLIC_CREDENTIAL_URL + RoutePaths.StudentDashboard;
  return (
    <>
      <MainContainer style={{ paddingBottom: "1rem" }}>
        <PaymentContainer>
          <StyledCredentialContainer>
            <InnerCredentialContainer>
              <div className="text-center mb-2">
                <Image width="190" height="170" src={PayIcon} alt={"PayIcon"} />
              </div>
              <div className="text-center w-100">
                <GreenFormHeading style={{ fontSize: "24px" }}>
                  Welcome to Regenesys!
                </GreenFormHeading>
                <p>
                  Your Login ID Created Successfully for ReGenius and <br />
                  Student Management System (SMS)
                </p>
              </div>
              <div style={{ display: "flex" }}>
                <div className="text-center w-100">
                  <h6>ReGenius URL</h6>
                  <Link
                    href={
                      process.env.NEXT_PUBLIC_PAYMENT_RMAT_REDIRECTION_URL || ""
                    }
                    target="blank"
                  >
                    {process.env.NEXT_PUBLIC_PAYMENT_RMAT_REDIRECTION_URL}
                  </Link>
                </div>
                <div className="text-center w-100">
                  <h6>Student Management System URL (SMS)</h6>
                  <Link href={url} target="blank">
                    {process.env.NEXT_PUBLIC_CREDENTIAL_URL +
                      RoutePaths.StudentDashboard}
                  </Link>
                </div>
              </div>
              <CredentialContainer>
                <div className="text-center w-100">
                  <p>Username</p>
                  <h5>
                    {typeof window !== "undefined" &&
                      JSON.parse(
                        sessionStorage.getItem("activeLeadDetail") as any
                      ).username}
                  </h5>
                </div>
                <div className="text-center w-100">
                  <p>Password</p>
                  <h5>
                    {" "}
                    {typeof window !== "undefined" &&
                      JSON.parse(
                        sessionStorage.getItem("activeLeadDetail") as any
                      ).password}
                  </h5>
                </div>
              </CredentialContainer>
              <ButtonContainer>
                <StyledButton
                  onClick={() => {
                    router.push(RoutePaths.Dashboard);
                  }}
                  title="Back to DashBoard"
                ></StyledButton>
              </ButtonContainer>
            </InnerCredentialContainer>
          </StyledCredentialContainer>
        </PaymentContainer>
      </MainContainer>
    </>
  );
};

const StyledCredentialContainer = styled.div<any>`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InnerCredentialContainer = styled.div<any>`
  width: 70%;
  background-color: whitesmoke;
`;

const CredentialContainer = styled.div<any>`
  display: flex;
  margin-top: 20px;
`;
const ButtonContainer = styled.div<any>`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;
