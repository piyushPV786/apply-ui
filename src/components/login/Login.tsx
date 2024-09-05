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
import { RoutePaths, StorageName } from "../common/constant";
import { MsgComponent } from "../common/common";
import LoginCustomHook from "./customHook/LoginCustomHook";

const StudentLogin = () => {
  const [errorMsg, setErrorMsg] = useState<any>(null);
  const [showResendBtn, setShowResendBtn] = useState<boolean>(false);
  const [mobileNumber, setMobileNumber] = useState<string>("");
  const [countryCode, setCountryCode] = useState<any>("ZA");
  const [otp, setOtp] = useState<string>("");
  const [isOtp, setIsOtp] = useState<boolean>(false);

  const { sendOtpToMobile, verifyOTP } = LoginCustomHook();

  const router = useRouter();
  useEffect(() => {
    const isAuthenticate = JSON.parse(
      window.localStorage?.getItem(StorageName?.STUDENT_DETAIL) as any,
    );
    if (isAuthenticate) {
      router.push("/dashboard");
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
    const response: any = await sendOtpToMobile(payload);
    setIsOtp(true);
    if (response?.data) {
      setIsOtp(true);
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
    const number = parsePhoneNumber(mobileNumber, countryCode);
    const payload = {
      mobileNumber: number?.nationalNumber,
      otp: +otp,
      mobileCountryCode: number?.countryCallingCode,
    };
    try {
      const response = await verifyOTP(payload);
      const data = response?.data?.data;
      if (data) {
        const { tokenDetails, ...rest } = data;
        await window.localStorage.setItem(
          StorageName?.STUDENT_DETAIL,
          JSON.stringify(rest),
        );
        await window.localStorage.setItem(
          StorageName?.ACCESS_TOKEN,
          tokenDetails.access_token,
        );
        await window.localStorage.setItem(
          StorageName?.REFRESH_TOKEN,
          tokenDetails.refresh_token,
        );
        router.push("/dashboard");
      }
    } catch (err) {
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
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Item>
              <Title className="login-title">Login with mobile number</Title>
            </Item>
          </Grid>
          <Grid item xs={12}>
            <Item>
              <span className="login-text">
                Enter your mobile number and we will send you an OTP to verify
              </span>
            </Item>
          </Grid>
          <Grid item xs={12}>
            <Item>
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
                onChange={(value: any) => {
                  setMobileNumberValue(!value ? "" : value);
                }}
              />
            </Item>
          </Grid>
          <Grid item xs={12}>
            <Item>
              <StyledButton
                disabled={!isNumberValid}
                onClick={(e) => {
                  e.preventDefault();
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
                  setIsOtp(false);
                  setErrorMsg(null);
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

  return (
    <>
      <ImageContainer>
        <>
          <div className="mt-3">
            <Heading>
              <div>
                <Image className="login-logo" src={RBSLogo} alt="rbsLogo" />
              </div>
              Regenesys Application Form
            </Heading>
            <ApplicationFormContainer isProceed={isOtp}>
              {!isOtp && <EnterMobNumber />}
              {isOtp && <EnterOtp />}
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
