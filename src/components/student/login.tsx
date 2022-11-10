import { Grid, Input, Snackbar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import StyledButton from "../button/button";
import { GreenText } from "../common/common";
import { useRouter } from "next/router";
import OtpInput from "../Input/otpInput";
import CheckCircleRoundedIcon from "@material-ui/icons/CheckCircleRounded";
import PhoneInput, { parsePhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import axios from "./../../service/Api";
import { AnyCnameRecord } from "dns";
const StudentLogin = () => {
  const [mobileNumber, setMobileNumber] = useState<string>("");
  const [countryCode, setCountryCode] = useState<any>("SA");
  const [otp, setOtp] = useState<string>("");
  const [isProceed, setProceed] = useState<boolean>(false);
  const [showToast, setToast] = useState<boolean>(false);
  const [toastMsg, setToastMsg] = useState<any>({
    message: "",
    success: true,
  });
  const router = useRouter();
  useEffect(() => {
    const isAuthenticate =
      JSON.parse(sessionStorage?.getItem("studentMobile") as any)?.mobileNumber
        ?.length === 10 || null;
    // if (isAuthenticate) {
    //   router.push("test");
    // }
  }, []);
  const isNumberValid =
    mobileNumber &&
    mobileNumber?.length > 0 &&
    parsePhoneNumber(mobileNumber, countryCode)?.nationalNumber?.length === 10;
  const onchangeOtp = (value: string) => setOtp(value);
  const onProceed = () => {
    setProceed(true);
    const number = parsePhoneNumber(mobileNumber, countryCode);
    axios
      .post("/register", {
        mobileNumber: number?.nationalNumber,
        mobileCountryCode: number?.countryCallingCode,
      })
      .then(({ data }) => {
        sessionStorage.setItem(
          "studentMobile",
          JSON.stringify({
            mobileNumber: number?.nationalNumber,
            countryCodeNumber: number?.countryCallingCode,
            countryCode: countryCode,
          })
        );
        sessionStorage.setItem(
          "studentId",
          JSON.stringify({ id: data?.data?.id })
        );
        setProceed(true);
        setToast(true);
        setToastMsg((prevState: any) => ({
          ...prevState,
          message: "OTP number sent successfully",
        }));
      })
      .catch(({ response }) => {
        setToastMsg(() => ({
          success: false,
          message: response?.data?.message,
        }));

        setToast(false);
      });
  };
  const onCountryChange = (value: string | any) => {
    if (value) {
      setCountryCode(value);
    }
  };
  const setMobileNumberValue = (value: string) => {
    setMobileNumber(value);
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
              <PhoneInput
                id="login1"
                international
                countryCallingCodeEditable={false}
                defaultCountry={countryCode}
                placeholder="Select Country Code*"
                onCountryChange={(countryCode: any) =>
                  onCountryChange(countryCode)
                }
                value={mobileNumber}
                autoFocus={true}
                onChange={(value: string) => {
                  setMobileNumberValue(value);
                }}
              />
            </Item>
          </Grid>
          <Grid item xs={12}>
            <Item>
              {" "}
              <StyledButton
                disabled={!isNumberValid}
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
                disabled={otp.length < 4}
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
    const mobileNumber = JSON.parse(
      sessionStorage.getItem("studentMobile") as any
    )?.mobileNumber!;
    axios
      .post("/verify-otp", { mobileNumber, otp: +otp })
      .then(({ data }) => {
        sessionStorage.setItem("authenticate", JSON.stringify("true"));
      })
      .catch((err) => {
        console.log(err);
      });
    setTimeout(() => {
      setProceed(false);
      router.push("/student-registration-form/application-form");
    }, 1000);
  };

  const { message, success } = toastMsg;
  return (
    <>
      <ImageContainer>
        <>
          <Heading>
            <div>
              <img src={"/assets/images/RBS_logo_1_white.svg"} />
            </div>
            Regenesys Application Form
          </Heading>
          <ApplicationFormContainer isProceed={isProceed}>
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
            autoHideDuration={1000}
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
            <ToasterContainer success={success}>
              <CheckCircleRoundedIcon
                style={{ color: "#0eb276", fontSize: "30px" }}
              />
              <SuccessMsgContainer>
                <StyledLink>
                  {success ? "Success" : "Error"}
                  <br />
                  <span
                    style={{
                      color: "black",
                      fontSize: "14px",
                      fontWeight: 600,
                    }}
                  >
                    {message}
                  </span>
                </StyledLink>
              </SuccessMsgContainer>
            </ToasterContainer>
          </Snackbar>
        </>
      </ImageContainer>
    </>
  );
};

export default StudentLogin;
const SuccessMsgContainer = styled.div`
  display: flex;
`;
const ToasterContainer = styled.div<any>`
  display: flex;
  column-gap: 10px;
  width: 310px;
  background: ${({ success }) => (success ? "#e6f4e7" : "#d9534f")};
  height: 75px;
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
  @media screen and (min-width: 410px) and (max-width: 450px) {
    bottom: 260px;
    font-size: 14px;
  }
  @media screen and (min-width: 380px) and (max-width: 395px) {
    bottom: 160px;
    font-size: 14px;
  }
  @media screen and (min-width: 320px) and (max-width: 380px) {
    bottom: 60px;
    font-size: 12px;
  }
`;
const ApplicationFormContainer = styled.div<any>`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  background: white;
  padding: 0.8rem;
  border-radius: 3px;
  @media (max-width: 400px) {
    top: ${({ isProceed }) => (isProceed ? "62%" : "55%")};
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

const Heading = styled.span`
  color: #fcd400;
  font-size: 18px;
  font-weight: bold;
  padding: 1rem 0;
  position: relative;
  text-align: center;
  top: 5%;
`;

export const StyledLink = styled.span`
  color: #008554;
  cursor: pointer;
`;

const url = "/assets/images/bg.jpg";
const MainContainer = styled.div``;
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
  overflow-y: scroll;
`;
