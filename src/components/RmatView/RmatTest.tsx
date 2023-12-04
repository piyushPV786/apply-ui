import React, { useEffect, useState } from "react";
import { GreenFormHeading } from "../common/common";
import Header from "../common/header";
import { CommonApi, RoutePaths } from "../common/constant";
import rmatimage from "../../../public/assets/images/rmatlogo.png";
import infoicon from "../../../public/assets/images/info.png";
import Image from "next/image";

import StyledButton from "../button/button";
import { useRouter } from "next/router";
import { AuthApi } from "../../service/Axios";
import { MainContainer } from "../login/style";

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
    <MainContainer className="text-center">
      <Header />
      <div
        className="container-fluid w-50 mt-5 p-2"
        style={{ background: "white" }}
      >
        <div className="text-center mb-2">
          <Image width="100" height="100" src={rmatimage} alt={"PayIcon"} />
        </div>
        <div className="d-flex justify-content-center mb-3">
          <div>
            <GreenFormHeading style={{ fontSize: "24px" }}>
              RMAT Test Details
            </GreenFormHeading>
            <strong>Your login credentials for the RMAT Test </strong>
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <div
            className="mb-5  d-flex justify-content-center align-items-center w-75 rounded"
            style={{
              backgroundColor: "#dff1f6",
              height: 55,
            }}
          >
            <Image width="25" height="25" src={infoicon} alt={"PayIcon"} /> Team
            is waiting for your test result to proceed further admission process
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-sm">
              <div> RMAT Test URL</div>
              <a href={userDetail?.url}>{userDetail?.url}</a>
            </div>
            <div className="col-sm">
              <div>Username</div>
              <strong>{userDetail?.username}</strong>
            </div>
            <div className="col-sm">
              <div>Password</div>
              <strong>{userDetail?.password}</strong>
            </div>
          </div>
        </div>

        <div className="mt-5 mb-3 text-center">
          <>
            <StyledButton
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
              onClick={() => window.open("https://rmatuat.regenesys.net/")}
              title={"Take RMAT Test"}
            />
          </>
        </div>
      </div>
    </MainContainer>
  );
};

export default RmatTest;
