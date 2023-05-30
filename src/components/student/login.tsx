import { Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import StyledButton from "../button/button";
import { useRouter } from "next/router";
import OtpInput from "../Input/otpInput";
import PhoneInput, { parsePhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import RBSLogo from "../../../public/assets/images/RBS_logo_1_white.png";
import Image from "next/image";

import axios from "axios";
import authConfig from "./auth";
import {
  AuthValuesType,
  RegisterParams,
  LoginParams,
  ErrCallbackType,
  UserDataType,
} from "./types";
import {
  ImageContainer,
  ApplicationFormContainer,
  Heading,
  Item,
  StyleFooter,
  Title,
} from "./style";
import styled from "styled-components";
import { CommonApi, RoutePaths } from "../common/constant";
import { MsgComponent, LoaderComponent } from "../common/common";
import useAxiosInterceptor from "../../service/Axios";

const StudentLogin = () => {
  const [mobileNumber, setMobileNumber] = useState<string>("");
  const [countryCode, setCountryCode] = useState<any>("ZA");
  const [otp, setOtp] = useState<string>("");
  const [isProceed, setProceed] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<any>(null);
  const [showToast, setToast] = useState<boolean>(false);
  const [showResendBtn, setShowResendBtn] = useState<boolean>(false);
  const [isResendOtp, setResend] = useState<boolean>(false);
  const { baseAuth, loading } = useAxiosInterceptor();

  const defaultProvider: AuthValuesType = {
    user: null,
    loading: true,
    setUser: () => null,
    setLoading: () => Boolean,
    isInitialized: false,
    login: () => Promise.resolve(),
    logout: () => Promise.resolve(),
    setIsInitialized: () => Boolean,
    register: () => Promise.resolve(),
  };
  const [user, setUser] = useState<UserDataType | null>(defaultProvider.user);
  const userData = {
    id: 1,
    role: "admin",
    password: "admin",
    fullName: "John Doe",
    username: "johndoe",
    email: "admin@materialize.com",
  };
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

  useEffect(() => {
    let timer;
    if (isProceed && isResendOtp) {
      timer = setTimeout(() => {
        setShowResendBtn(true);
      }, 60000);
    }
  }, [isProceed, isResendOtp]);

  const isNumberValid =
    mobileNumber &&
    parsePhoneNumber(mobileNumber, countryCode)?.nationalNumber?.length! >= 6 &&
    mobileNumber.length! <= 16;

  const onchangeOtp = (value: string) => setOtp(value);
  const onProceed = () => {
    setProceed(true);
    const number = parsePhoneNumber(mobileNumber, countryCode);
    baseAuth
      .post(CommonApi.REGISTERUSER, {
        mobileNumber: number?.nationalNumber,
        mobileCountryCode: number?.countryCallingCode,
      })
      .then(({}) => {
        const studentDetail = {
          mobileNumber: number?.nationalNumber,
          countryCodeNumber: number?.countryCallingCode,
          countryCode: countryCode,
        };
        sessionStorage.setItem("studentMobile", JSON.stringify(studentDetail));
        setResend(true);
        setProceed(true);
        setToast(true);
      })
      .catch(({ response }) => {
        console.error(response);
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
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Item>
              <Title className="login-title">Login With Mobile Number</Title>
            </Item>
          </Grid>
          <Grid item xs={12}>
            <Item>
              {" "}
              <span className="login-text">
                Enter your mobile number we will send you OTP to Verify
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
                  setProceed(!isProceed);
                  setResend(false);
                  setShowResendBtn(false);
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

  const verifyNumber = async () => {
    const mobileNumberDetail = JSON.parse(
      sessionStorage.getItem("studentMobile") as any
    );
    baseAuth
      .post(CommonApi.VERIFYOTP, {
        mobileNumber: mobileNumberDetail?.mobileNumber,
        otp: +otp,
        mobileCountryCode: mobileNumberDetail?.countryCodeNumber,
      })
      .then(({ data }) => {
        sessionStorage.setItem(
          authConfig.storageTokenKeyName,
          data.data.tokenDetails.access_token
        );
        sessionStorage.setItem(
          authConfig.refreshToken,
          data.data.tokenDetails.refresh_token
        );
        setErrorMsg(null);
        sessionStorage.setItem(
          "studentId",
          JSON.stringify({ leadCode: data?.data?.leadCode })
        );
        sessionStorage.setItem("authenticate", JSON.stringify("true"));

        router.push(RoutePaths.Dashboard);
      })
      .catch(({}) => {
        setErrorMsg({
          success: false,
          message: "Sorry! The entered OTP is invalid. Please try again",
        });
      });
  };

  const resendOtp = () => {
    setErrorMsg({ success: true, message: "OTP re-sent successfully" });
    setOtp("");
    setShowResendBtn(true);
    setResend(true);
  };

  const today = new Date();
  const year = today.getFullYear();

  return (
    <>
      {loading ? (
        <LoaderComponent />
      ) : (
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
                <a href="https://www.regenesys.net/">
                  Regenesys Business School
                </a>
              </span>
            </StyleFooter>
          </>
        </ImageContainer>
      )}
    </>
  );
};

export default StudentLogin;
export const StyledLink = styled.span`
  color: #008554;
  cursor: pointer;
`;
