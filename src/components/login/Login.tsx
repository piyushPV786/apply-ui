import { Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import StyledButton from "../button/button";
import { useRouter } from "next/router";
import OtpInput from "../Input/otpInput";
import PhoneInput, { parsePhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import RBSLogo from "../../../public/assets/images/RBS_logo_1_white.png";
import Image from "next/image";

import {
  ImageContainer,
  ApplicationFormContainer,
  Heading,
  Item,
  StyleFooter,
  Title,
  StyledLink,
} from "./style";
import { RoutePaths } from "../common/constant";
import { MsgComponent, LoaderComponent } from "../common/common";

const StudentLogin = ({
  mobileNumber,
  setMobileNumber,
  countryCode,
  setCountryCode,
  otp,
  setOtp,
  sendOtpToMobile,
  isProceed,
  verifyOTP,
  setProceed,
}) => {
  const [errorMsg, setErrorMsg] = useState<any>(null);
  const [showResendBtn, setShowResendBtn] = useState<boolean>(false);

  const router = useRouter();
  useEffect(() => {
    const isAuthenticate = JSON.parse(
      sessionStorage?.getItem("authenticate") as any
    );
    const studentId = JSON.parse(
      sessionStorage?.getItem("studentId") as any
    )?.id;
    if (studentId && isAuthenticate) {
      router.push(RoutePaths.Dashboard);
    }
  }, []);

  const isNumberValid =
    mobileNumber &&
    parsePhoneNumber(mobileNumber, countryCode)?.nationalNumber?.length! >= 6 &&
    mobileNumber.length! <= 16;

  const onchangeOtp = (value: string) => setOtp(value);
  const onProceed = async () => {
    const number = parsePhoneNumber(mobileNumber, countryCode);
    const payload = {
      mobileNumber: number?.nationalNumber,
      mobileCountryCode: number?.countryCallingCode,
    };
    const response = await sendOtpToMobile(payload);
    if (response?.data) {
      setProceed(true);
    }
  };

  const onCountryChange = (value: string | any) => {
    if (value) {
      setCountryCode(value);
    }
  };
  const setMobileNumberValue = (value: string) => {
    setMobileNumber(value);
  };

  const verifyNumber = async () => {
    const mobileNumberDetail = JSON.parse(
      sessionStorage.getItem("studentMobile") as any
    );
    const payload = {
      mobileNumber: mobileNumberDetail?.mobileNumber,
      otp: +otp,
      mobileCountryCode: mobileNumberDetail?.countryCodeNumber,
    };
    const response = await verifyOTP(payload);
    if (!response?.data) {
      setErrorMsg({
        success: false,
        message: "Sorry! The entered OTP is invalid. Please try again",
      });
      setShowResendBtn(true);
    }
  };

  const resendOtp = () => {
    setErrorMsg({ success: true, message: "OTP re-sent successfully" });
    setOtp("");
  };

  const today = new Date();
  const year = today.getFullYear();

  const EnterMobNumber = () => {
    return (
      <div>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Item>
              <Title className="login-title">Login with mobile number</Title>
            </Item>
          </Grid>
          <Grid item xs={12}>
            <Item>
              {" "}
              <span className="login-text">
                Enter your mobile number and we will send you an OTP to verify
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
                  setMobileNumberValue(!value ? "" : value);
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
              <Title className="login-title">OTP verification</Title>
            </Item>
          </Grid>
          <Grid item xs={12}>
            <Item>
              <span className="login-text">
                Enter the 4 digit OTP sent to your mobile number{mobileNumber}
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
                onKeypress={(e: any) => {
                  if (e.key === "Enter" && otp.length === 4) {
                    verifyNumber();
                  }
                }}
              />
            </Item>
          </Grid>
          {errorMsg && (
            <Grid item xs={12}>
              <Item>
                <div className="mb-2">
                  <MsgComponent
                    message={errorMsg?.message}
                    success={errorMsg?.success}
                  />
                </div>
              </Item>
            </Grid>
          )}
          <Grid item xs={12}>
            <Item>
              <StyledButton
                disabled={otp.length < 4}
                onClick={() => {
                  verifyNumber();
                }}
                title="Verify"
              />
              {showResendBtn && (
                <StyledLink className="link-text" onClick={resendOtp}>
                  Resend OTP
                </StyledLink>
              )}
              <br />
              <StyledLink
                className="link-text"
                onClick={() => {
                  setOtp("");
                }}
              >
                Change Mobile Number
              </StyledLink>
            </Item>
          </Grid>
        </Grid>
      </div>
    );
  };

  console.log("isProceed ==========>", isProceed);

  return (
    <>
      <ImageContainer>
        <>
          <div className="login-spacing">
            <Heading>
              <div>
                <Image className="login-logo" src={RBSLogo} alt="rbsLogo" />
              </div>
              Regenesys Application Form
            </Heading>
            <ApplicationFormContainer isProceed={isProceed}>
              {!isProceed && <EnterMobNumber />}
              {isProceed && <EnterOtp />}
            </ApplicationFormContainer>
          </div>
          <StyleFooter>
            <span className="footer-text">
              Copyright @ 2015 - {year}{" "}
              <a href="https://www.regenesys.net/">Regenesys Business School</a>
            </span>
          </StyleFooter>
        </>
      </ImageContainer>
    </>
  );
};

export default StudentLogin;
