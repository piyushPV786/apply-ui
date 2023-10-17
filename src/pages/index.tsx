import Head from "next/head";
import StudentLogin from "../components/login/Login";
import LoginCustomHook from "../components/login/customHook/LoginCustomHook";

export default function Home() {
  const {
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
  } = LoginCustomHook();
  return (
    <div>
      <Head>
        <title>Regenesys- Student Application Form</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <StudentLogin
        mobileNumber={mobileNumber}
        setMobileNumber={setMobileNumber}
        countryCode={countryCode}
        setCountryCode={setCountryCode}
        otp={otp}
        setOtp={setOtp}
        sendOtpToMobile={sendOtpToMobile}
        isProceed={isProceed}
        verifyOTP={verifyOTP}
        setProceed={setProceed}
      />
    </div>
  );
}
