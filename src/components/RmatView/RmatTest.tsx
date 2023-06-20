import React, { useEffect, useState } from "react";
import { MainContainer, PaymentContainer } from "../payment/payment";
import { GreenFormHeading } from "../common/common";
import Header from "../common/header";
import { AlertEnums, CommonApi, RoutePaths } from "../common/constant";
import AlertBox from "../alert/Alert";
import { GreenText } from "../student/style";
import StyledButton from "../button/button";
import { useRouter } from "next/router";
import { MainContainer as ParentContainer } from "../../pages/student-registration-form/application-form";
import { AuthApi } from "../../service/Axios";
import DocumentUploadContainer from "../document/DocumentUploadContainer";

const RmatTest: React.FC = () => {
  const [userDetail, setUserDetail] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const url = window.location.href;
    const urlObj = new URL(url);
    const searchParams = new URLSearchParams(urlObj.search);
    const enrolmentCode = searchParams.get("enrolmentCode");
    AuthApi.get(`${CommonApi.GETRMATDETAILS}${enrolmentCode}`)
      .then((res) => {
        console.log({ res });
        // const data = {
        //   statusCode: 200,
        //   message: "Data Fetched Successfully.",
        //   data: {
        //     isActive: true,
        //     id: 1,
        //     createdBy: null,
        //     createdAt: "2023-06-15T13:26:18.201Z",
        //     updatedBy: null,
        //     updatedAt: "2023-06-15T13:26:18.201Z",
        //     deletedBy: null,
        //     deletedAt: null,
        //     username: "pqr1397708.michael",
        //     password: "ml4an5jx",
        //     moodleId: "1859",
        //     url: "https://rmatuat.regenesys.net",
        //   },
        // };
        setUserDetail(res?.data?.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

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
                    <a href={userDetail?.url}>
                      <GreenText>{userDetail?.url}</GreenText>
                    </a>
                  </div>
                  <div className="col-4">
                    <p>Username</p>
                    <a href="#">
                      <GreenText>{userDetail?.username}</GreenText>
                    </a>
                  </div>
                  <div className="col-4">
                    <p>Password</p>
                    <strong>{userDetail?.password}</strong>
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
      <DocumentUploadContainer {...({} as any)} />
    </ParentContainer>
  );
};

export default RmatTest;
