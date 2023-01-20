import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Grid } from "@material-ui/core";
import { StyledLink } from "../student/login";
import { useRouter } from "next/router";
import RbsLogo from "../../../public/assets/images/RBS_logo_2_white.png";
import Image from "next/image";

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
        <CommonHeader>
          <>
            <div className="row">
              <div className="col-md-6">
                <LogoContainer>
                  <div
                    style={{
                      borderRight: "3px solid white",
                      color: "white",
                      paddingRight: "0.5rem",
                    }}
                  >
                    <Image src={RbsLogo} width="180" alt={"RbsLogo"} />
                  </div>
                  <div>
                    <CustomStyledLink>
                      Regenesys Application Form
                    </CustomStyledLink>
                  </div>
                </LogoContainer>
              </div>
              <div className="col-md-6">
                <UserInfoConatiner>
                  <div className="mobNum" style={{ color: "white" }}>
                    Hi {studentMob}
                  </div>
                  <div onClick={exitApp}>
                    <CustomStyledLink className="mobNum">
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
    font-size: 16px;
  }
  @media (max-width: 510px) {
    .mobNum {
      font-size: 14px;
    }
  }
`;

const CustomStyledLink = styled(StyledLink)`
  font-size: 24px;
  font-weight: 700px;
  color: #ffd600 !important;
  @media (max-width: 510px) {
    font-size: 15px;
  }
`;
