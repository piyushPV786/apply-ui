import { Grid, Input, Snackbar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import StyledButton from "../button/button";
import { GreenText } from "../common/common";
import { useRouter } from "next/router";
import OtpInput from "../Form/Inputs/otpInput";
import CheckCircleRoundedIcon from "@material-ui/icons/CheckCircleRounded";
import Link from "next/link";
const StudentLogin = () => {
  const [mobileNumber, setMobileNumber] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [isProceed, setProceed] = useState<boolean>(false);
  const [showToast, setToast] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const isAuthenticate =
      JSON.parse(sessionStorage?.getItem("studentMobile") as any)?.mobileNumber
        ?.length === 10 || null;
    console.log({ isAuthenticate });
    // if (isAuthenticate) {
    //   router.push("test");
    // }
  }, []);
  const onchangeOtp = (value: string) => setOtp(value);
  const onProceed = () => {
    setProceed(true);
  };
  const EnterMobNumber = () => {
    return (
      <div>
        <Grid style={{ marginTop: "6px" }} container spacing={2}>
          <Grid item xs={12}>
            <Item>
              <Title>Login With Mobile Number</Title>
            </Item>
          </Grid>
          <Grid item xs={12}>
            <Item>
              {" "}
              <span>
                Enter your mobile number we will send you OPT to Verify
              </span>
            </Item>
          </Grid>
          <Grid item xs={12}>
            <Item>
              {" "}
              <CountryBtn>Test</CountryBtn>{" "}
              <StyledInput
                error={mobileNumber.length > 10}
                id="mobile-number"
                autoFocus
                value={mobileNumber}
                onChange={(e: any) => {
                  const result = e.target.value.replace(/\D/g, "");
                  if (result.length > 10) return;
                  setMobileNumber(result);
                }}
              />
            </Item>
          </Grid>
          <Grid item xs={12}>
            <Item>
              {" "}
              <StyledButton
                disabled={mobileNumber.length > 10}
                onClick={() => {
                  onProceed();
                }}
                title="Proceed"
              />
            </Item>
          </Grid>
        </Grid>
      </div>
    );
  };
  const EnterOtp = () => {
    return (
      <div>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Item>
              <Title>OPT Verification</Title>
            </Item>
          </Grid>
          <Grid item xs={12}>
            <Item>
              <span>
                Enter 4 digit OTP code sent to your number {mobileNumber}
              </span>
            </Item>
          </Grid>
          <Grid item xs={12}>
            <Item>
              {" "}
              <OtpInput
                value={otp}
                valueLength={4}
                onChange={(e) => {
                  onchangeOtp(e);
                }}
              />
            </Item>
          </Grid>
          <Grid item xs={12}>
            <Item>
              <StyledButton
                disabled={mobileNumber.length > 10}
                onClick={() => {
                  verifyNumber();
                }}
                title="Verify"
              />
              <StyledLink>Resent OTP</StyledLink>
              <br />
              <StyledLink onClick={() => setProceed(!isProceed)}>
                Change Mobile Number
              </StyledLink>
            </Item>
          </Grid>
        </Grid>
      </div>
    );
  };

  const verifyNumber = () => {
    sessionStorage.setItem("studentMobile", JSON.stringify({ mobileNumber }));
    setProceed(false);
    setToast(!showToast);
  };
  return (
    <>
      <ImageContainer>
        <Heading>
          <div>
            <img src={"/assets/images/RBS_logo_1_white.svg"} />
          </div>
          Regenesys Application Form
        </Heading>
        <ApplicationFormContainer>
          {!isProceed && <EnterMobNumber />}
          {isProceed && <EnterOtp />}
        </ApplicationFormContainer>
        <StyleFooter>
          <span>
            Copyright @ 2015 - 2022{" "}
            <a href="https://www.regenesys.net/">Regenesys Business School</a>
          </span>
        </StyleFooter>
        <Snackbar
          autoHideDuration={2000}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          open={showToast}
          onClose={() => {
            setToast(!showToast);
          }}
          key={"bottom"}
        >
          <ToasterContainer>
            <CheckCircleRoundedIcon
              style={{ color: "#0eb276", fontSize: "30px" }}
            />
            <SuccessMsgContainer>
              <StyledLink>
                Success
                <br />
                <span
                  style={{
                    color: "black",
                    fontSize: "14px",
                    fontWeight: 600,
                  }}
                >
                  OTP number reset successfully
                </span>
              </StyledLink>
            </SuccessMsgContainer>
          </ToasterContainer>
        </Snackbar>
      </ImageContainer>
    </>
  );
};

export default StudentLogin;
const SuccessMsgContainer = styled.div`
  display: flex;
`;
const ToasterContainer = styled.div`
  display: flex;
  column-gap: 10px;
  width: 310px;
  background: #e6f4e7;
  height: 35px;
  color: white;
  padding: 1rem;
  display: flex;
  border-radius: 5px;
  align-items: center;
`;
const StyleFooter = styled.div`
  position: absolute;
  bottom: 10px;
  color: white;
  a,
  a:hover {
    color: #fcd400;
  }
`;
const ApplicationFormContainer = styled.div`
  position: absolute;
  // width: 300px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  background: white;
  padding: 0.8rem;
  border-radius: 3px;
  @media (max-width: 400px) {
    top: 55%;
  }
`;

const Item = styled.div`
  text-align: center;
  button {
    text-align: center;
    width: 100%;
    margin-bottom: 0.7rem;
  }
`;

const Title = styled(GreenText)``;

const CountryBtn = styled.span`
  background: grey;
`;
const Heading = styled.span`
  color: #fcd400;
  font-size: 18px;
  font-weight: bold;
  padding: 1rem 0;
  position: relative;
  text-align: center;
  top: 5%;
`;

const StyledLink = styled.span`
  color: #008554;
  cursor: pointer;
`;

const StyledInput = styled(Input)<any>``;
const url = "/assets/images/bg.jpg";

const ImageContainer = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  background-image: url(${url});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
`;
