import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Grid, Container } from "@material-ui/core";
import { StyledLink } from "../student/login";
import { useRouter } from "next/router";

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
    router.push("/");
  };
  return (
    <>
      <Grid>
        <CommonHeader>
          <Container>
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
                    <img
                      src={"/assets/images/RBS_logo_2_white.png"}
                      width="180px"
                    />
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
                  <div  onClick={exitApp}>
                    <CustomStyledLink  className="mobNum">
                      Logout
                    </CustomStyledLink>
                  
                  </div>
                </UserInfoConatiner>
              </div>
            </div>
          </Container>
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
