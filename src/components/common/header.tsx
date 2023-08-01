import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Grid } from "@material-ui/core";
import { StyledLink } from "../student/login";
import { useRouter } from "next/router";
import RbsLogo from "../../../public/assets/images/RBS_logo_2_white.png";
import Image from "next/image";
import { RoutePaths } from "./constant";

const Header = (props: any) => {
  const [studentMob, setStudentMob] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    if (window) {
      const studentMobileNumber =
        window &&
        window !== undefined &&
        JSON.parse(sessionStorage?.getItem("studentMobile") as any)
          ?.mobileNumber;
      setStudentMob(studentMobileNumber);
    }
  }, [props]);
  const exitApp = () => {
    sessionStorage.clear();
    localStorage.clear();
    setTimeout(() => {
      router.push("/");
    }, 1000);
  };
  return (
    <>
      <Grid>
        <CommonHeader className="header">
          <>
            <div className="row align-items-center">
              <div className="col-md-6">
                <LogoContainer
                  onClick={() => router.push(RoutePaths.Dashboard)}
                >
                  <div
                    style={{
                      borderRight: "2px solid white",
                      color: "white",
                      paddingRight: "0.5rem",
                    }}
                  >
                    <Image src={RbsLogo} width="180" alt={"RbsLogo"} />
                  </div>
                  <div className="d-flex align-items-center">
                    <CustomStyledLink>
                      Regenesys Application Form
                    </CustomStyledLink>
                  </div>
                </LogoContainer>
              </div>
              <div className="col-md-6">
                <UserInfoConatiner>
                  <div className="mobNum" style={{ color: "white" }}>
                    Hi, <span>{studentMob}</span>
                  </div>
                  <div onClick={exitApp}>
                    <CustomStyledLink className="logout-text">
                      Logout
                    </CustomStyledLink>
                  </div>
                </UserInfoConatiner>
              </div>
            </div>
          </>
        </CommonHeader>
      </Grid>
    </>
  );
};

export default Header;

const CommonHeader = styled.div`
  width: 100%;
  padding: 0.5rem;
  background: #008554;
`;

const LogoContainer = styled.div`
  display: flex;
  column-gap: 10px;
  width: 100%;
  @media (max-width: 510px) {
    width: 100%;
    img {
      width: 142px;
    }
  }
`;

const UserInfoConatiner = styled.div`
  text-align: right;
  .mobNum {
    font-size: 13px;
  }
`;

const CustomStyledLink = styled(StyledLink)`
  font-size: 18px;
  font-weight: 500;
  font-family: Roboto;
  color: #ffd600 !important;
  @media (max-width: 510px) {
    font-size: 15px;
  }
`;
