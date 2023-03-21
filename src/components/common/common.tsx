import { Accordion } from "@material-ui/core";
import styled from "styled-components";
import {
  StyledLink,
  SuccessMsgContainer,
  ToasterContainer,
} from "../student/style";
import CheckCircleRoundedIcon from "@material-ui/icons/CheckCircleRounded";
import { Snackbar } from "@material-ui/core";
import { CommonEnums } from "./constant";
import Image from "next/image";
import Spinner from "../../../public/assets/images/spinner.svg";

export const GreenFormHeading = styled.p`
  font-size: 17px;
  font-weight: 500;
  color: #008554;
  margin: 0;

  @media (max-width: 510px) {
    font-size: 11px;
    img {
      width: 25px;
      height: 25px;
    }
  }
`;

export const Green = "#008554";
export const DefaultGrey = "#dde1e3";
export const StyledLabel = (props: any) => {
  const {
    required = false,
    className = "form-label",
    style = { marginTop: props?.hideLabel ? "18px" : "auto" },
  } = { ...props };
  return (
    <label style={style} className={className}>
      {props?.children}{" "}
      {required && !props?.forceHide && <span className="text-danger">*</span>}
    </label>
  ) as any;
};

export const StyledAccordion = styled(Accordion)`
  .MuiAccordionSummary-root {
    border-bottom: 3px solid ${Green}!important;
    height: 45px;
  }

  @media (max-width: 510px) {
    .MuiAccordionSummary-root {
      height: 60px;
    }
  }
`;

export const Toaster = ({ success, message, setShowToast, show }) => (
  <Snackbar
    autoHideDuration={1000}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    open={show}
    onClose={() => {
      setShowToast(!show);
    }}
    key={"bottom"}
  >
    <ToasterContainer success={success}>
      <CheckCircleRoundedIcon style={{ color: "#0eb276", fontSize: "30px" }} />
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
);

//sponsor field Keys ///
const SponsorCandidateDetail = "sponsor";

const sponsorMode = `${SponsorCandidateDetail}.sponsorModeCode`;
const sponsorName = `${SponsorCandidateDetail}.name`;
const sponsorEmail = `${SponsorCandidateDetail}.email`;
const sponsorAddress = `${SponsorCandidateDetail}.address`;
const sponsorPhoneNumber = `${SponsorCandidateDetail}.mobileNumber`;
const sponsorMobileCode = `${SponsorCandidateDetail}.mobileCountryCode`;
const isSponsored = `${SponsorCandidateDetail}.isSponsored`;

export const getSponsorNameLabel = (
  studentType: string,
  sponsorType: string
) => {
  if (studentType === "regular" && sponsorType === CommonEnums.GUARDIAN) {
    return "Guardian Name";
  }
  if (
    studentType === "bursary" &&
    sponsorType === CommonEnums.EMPLOYEE_BURSARY
  ) {
    return "Employer Bursary Name";
  } else return "Sponsor Name";
};
export const getSponsorEmailLabel = (
  studentType: string,
  sponsorType: string
) => {
  if (studentType === "regular" && sponsorType === CommonEnums.GUARDIAN) {
    return "Guardian Email Address";
  }
  if (
    studentType === "bursary" &&
    sponsorType === CommonEnums.EMPLOYEE_BURSARY
  ) {
    return "Employer Bursary Email Address";
  } else return "Email Address";
};
export const getSponsorMobileLabel = (
  studentType: string,
  sponsorType: string
) => {
  if (studentType === "regular" && sponsorType === CommonEnums.GUARDIAN) {
    return "Guardian Phone Number";
  }
  if (
    studentType === "bursary" &&
    sponsorType === CommonEnums.EMPLOYEE_BURSARY
  ) {
    return "Employer Bursary Phone Number";
  } else return "Phone Number";
};
export const getSponsorAddressLabel = (
  studentType: string,
  sponsorType: string
) => {
  if (studentType === "regular" && sponsorType === CommonEnums.GUARDIAN) {
    return "Guardian Address";
  }
  if (
    studentType === "bursary" &&
    sponsorType === CommonEnums.EMPLOYEE_BURSARY
  ) {
    return "Employer Bursary Address";
  } else return "Address";
};

export const MsgComponent = ({
  success,
  message,
}: {
  success: boolean;
  message: string;
}) => {
  return (
    <>
      <p style={{ color: success ? "#0EB276" : "#FF0000" }}>{message}</p>
    </>
  );
};

export const LoaderComponent = () => {
  return (
    <>
      <LoadinContainer>
        <div>
          <Image src={Spinner} alt="spinner" />
        </div>
      </LoadinContainer>
    </>
  );
};

const LoadinContainer = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  cursor: pointer;
  opacity: 0.6;
  z-index: 999;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;
