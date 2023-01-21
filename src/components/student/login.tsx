import { Grid, Snackbar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import StyledButton from "../button/button";
import { useRouter } from "next/router";
import OtpInput from "../Input/otpInput";
import CheckCircleRoundedIcon from "@material-ui/icons/CheckCircleRounded";
import PhoneInput, { parsePhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import axios from "../../service/Axios";
import RBSLogo from "../../../public/assets/images/RBS_logo_1_white.svg";
import Image from "next/image";
import {
  ImageContainer,
  ApplicationFormContainer,
  Heading,
  Item,
  StyleFooter,
  SuccessMsgContainer,
  Title,
  ToasterContainer,
} from "./style";
import styled from "styled-components";
import { CommonApi, RoutePaths } from "../common/constant";

const StudentLogin = () => {
  const [mobileNumber, setMobileNumber] = useState<string>("");
  const [countryCode, setCountryCode] = useState<any>("ZA");
  const [otp, setOtp] = useState<string>("");
  const [isProceed, setProceed] = useState<boolean>(false);
  const [showToast, setToast] = useState<boolean>(false);
  const [toastMsg, setToastMsg] = useState<any>({
    message: "",
    success: true,
  });
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
    parsePhoneNumber(mobileNumber, countryCode)?.nationalNumber?.length! >= 8 &&
    parsePhoneNumber(mobileNumber, countryCode)?.nationalNumber?.length! <= 14;

  const onchangeOtp = (value: string) => setOtp(value);
  const onProceed = () => {
    setProceed(true);
    const number = parsePhoneNumber(mobileNumber, countryCode);
    axios
      .post(CommonApi.REGISTERUSER, {
        mobileNumber: number?.nationalNumber,
        mobileCountryCode: number?.countryCallingCode,
      })
      .then(({ data }) => {
        const studentDetail = {
          mobileNumber: number?.nationalNumber,
          countryCodeNumber: number?.countryCallingCode,
          countryCode: countryCode,
        };
        sessionStorage.setItem("studentMobile", JSON.stringify(studentDetail));
        setProceed(true);
        setToastMsg((prevState: any) => ({
          ...prevState,
          message: "OTP number sent successfully",
        }));
        setToast(true);
      })
      .catch(({ response }) => {
        setToastMsg(() => ({
          success: false,
          message: response?.data?.message,
        }));
        setToast(true);
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
              <Title>OPT verification</Title>
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
              <StyledLink onClick={resendOtp}>Resend OTP</StyledLink>
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
    setToast(true);
    const mobileNumberDetail = JSON.parse(
      sessionStorage.getItem("studentMobile") as any
    );
    axios
      .post(CommonApi.VERIFYOTP, {
        mobileNumber: mobileNumberDetail?.mobileNumber,
        otp: +otp,
        mobileCountryCode: mobileNumberDetail?.countryCodeNumber,
      })
      .then(({ data }) => {
        setToastMsg(() => ({
          success: true,
          message: data?.message,
        }));
        sessionStorage.setItem(
          "studentId",
          JSON.stringify({ leadCode: data?.data?.leadCode })
        );
        sessionStorage.setItem("authenticate", JSON.stringify("true"));
        setTimeout(() => {
          router.push(RoutePaths.Dashboard);
        }, 2500);
      })
      .catch(({ response }) => {
        setToastMsg(() => ({
          success: false,
          message: response?.data?.message,
        }));
        setToast(true);
      });
  };

  const resendOtp = () => {
    setToastMsg(() => ({
      success: true,
      message: "OTP re-sent successfully",
    }));
    setToast(true);
    setOtp("");
  };

  const { message, success } = toastMsg;
  return (
    <>
      <ImageContainer>
        <>
          <Heading>
            <div>
              <Image src={RBSLogo} alt="rbsLogo" />
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
export const StyledLink = styled.span`
  color: #008554;
  cursor: pointer;
`;
