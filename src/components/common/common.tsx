import { Accordion, Box, LinearProgressProps } from "@material-ui/core";
import styled from "styled-components";
import {
  StyledLink,
  SuccessMsgContainer,
  ToasterContainer,
} from "../login/style";

import CheckCircleRoundedIcon from "@material-ui/icons/CheckCircleRounded";
import { Snackbar } from "@material-ui/core";
import { CommonEnums } from "./constant";
import Image from "next/image";
import Spinner from "../../../public/assets/images/spinner.svg";
import { IDynamicObject } from "./types";
import { LinearProgress, Typography } from "@mui/material";

export const GreenFormHeading = styled.p`
  font-size: 16px;
  font-weight: 500;
  color: #008554;
  margin: 0 0 2px;
  margin-right: 20px;

  @media (max-width: 510px) {
    img {
      width: 25px;
      height: 25px;
    }
  }
`;

export const StyledSpan = styled.span`
  --bs-text-opacity: 1;
  color: rgba(var(--bs-danger-rgb), var(--bs-text-opacity)) !important;
  position: unset !important ;
`;

export const StyledMessage = (props: any) => {
  return (
    <label className="form-label">
      All the documents with
      <StyledSpan className="text-danger"> * </StyledSpan>
      are Required.
    </label>
  );
};

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
    height: 45px;
  }

  @media (max-width: 510px) {
    .MuiAccordionSummary-root {
      height: 60px;
    }
  }
`;
export const GreyStyledAccordion = styled(Accordion)`


  .MuiAccordionSummary-root {

    height: 60px;
    border-bottom: none !important;
    display: flex;
    flex-direction row
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
const isSponsor = `${SponsorCandidateDetail}.isSponsor`;

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

export const nonMandatorySponsorFeilds = ["email", "mobileNumber"];
export const mandatorySponsorModeFeilds = ["GUARDIAN", "BURSARY"];

export const studentApplicationAllStatus: IDynamicObject = {
  "APP-FEE-DOC-VER-PEND": "Application Fee Verification Pending",
  "RESUB-APP-FEE-PROOF": "Resubmit application Fee POP",
  "APP-FEE-VER-PEND": "Application Fee POP Verification Pending",
  "APP-FEE-ACCEPTED": "Application Fee Accepted",
  "APP-FEE-REJECTED": "Application Fee Rejected",
  "APP-ENROLLED": "Registration Confirmed",
  "APP-DOC-VER-PEND": "Application Document Verification Pending",
  "APP-DOC-REQUESTED": "Application Documents Requested",
  "APP-DOC-ACCEPTED": "Application Documents Accepted",
  "RMAT-PEND": "RMAT Pending",
  "RMAT-PASS": "RMAT Pass",
  "RMAT-FAIL": "RMAT Fail",
  "ENRL-ACCEPTED": "Enrolment Accepted",
  "PROG-FEE-PEND": "Qualification Fee Pending",
  "BURSARY-REQUESTED": "Request for Bursary",
  "BURSARY-DOC-VER-PEND": "Bursary Document Verification Pending",
  "BURSARY-DOC-REQUESTED": "Bursary Documents Requested",
  "BURSARY-PEND": "Bursary Confirmation Pending",
  "BURSARY-APPROVED": "Bursary Approved",
  "BURSARY-REJECTED": "Bursary Rejected",
  "LOAN-REQUESTED": "Request for Loan",
  "LOAN-DOC-VER-PEND": "Loan Document Verification Pending",
  "LOAN-DOC-REQUESTED": "Loan Documents Requested",
  "LOAN-PEND": "Loan Confirmation Pending",
  "LOAN-APPROVED": "Loan Approved",
  "LOAN-REJECTED": "Loan Rejected",
  "PROG-FEE-DOC-VER-PEND": "Qualification Fees Document Verification Pending",
  "RESUB-PROG-FEE-PROOF": "Resubmit Program Fee POP",
  "PROG-FEE-VER-PEND": "Program Fees Verification Pending",
  "DEBIT-ORDER-FORM-PEND": "Debit Order Form Pending",
  "DEBIT-ORDER-FORM-DOC-VER-PEND":
    "Debit Order Form Document Verification Pending",
  "DEBIT-ORDER-FORM-VER-PEND": "Debit Order Form Verification Pending",
  "DEBIT-ORDER-FORM-ACCEPTED": "Debit Order Form Accepted",
  "RESUB-DEBIT-ORDER-FORM": "Resubmit Debit Order Form",
  "EFT-LETTER-PEND": "EFT Letter Pending",
  "EFT-LETTER-DOC-VER-PEND": "EFT Letter Document Verification Pending",
  "EFT-LETTER-VER-PEND": "EFT Letter Verification Pending",
  "EFT-LETTER-ACCEPTED": "EFT Letter Accepted",
  "RESUB-EFT-LETTER": "Resubmit EFT Letter",
  "PROG-FEE-ACCEPTED": "Qualification Fee Accepted",
  "INTAKE-ASSIGNMENT-PEND": "Intake Assignment Pending",
  "INTAKE-ASSIGNED": "Intake Assigned",
  "PROG-ADMITTED": "Enrolled to the Program",
  ENROLLED: "Enrolled to the Program",
  "APP-DRAFT": "In Draft",
  "APP-FEE-PEND": "Application  Fee Pending",
  "UPLD-APP-DOC": "Upload Application documents",
  "APP-DOC-UPLOADED": "Application documents Uploaded",
  "RESUB-APP-DOC": "Resubmit application Documents",
  "UPLD-BURSARY-DOC": "Upload Bursary Documents",
  "BURSARY-DOC-UPLOADED": "Bursary Document Uploaded",
  "RESUB-BURSARY-DOC": "Resubmit Bursary Documents",
  "BURSARY-DOC-ACCEPTED": "Bursary Documents Accepted",
  "UPLD-LOAN-DOC": "Upload Loan Documents",
  "LOAN-DOC-UPLOADED": "Loan Document Uploaded",
  "RESUB-LOAN-DOC": "Resubmit Loan Documents",
  "LOAN-DOC-ACCEPTED": "Loan Documents Accepted",
  "INTAKE-ASSIGNMENT PENDING": "Intake Assignment Pending",
  "BURSARY-LETTER-PEND": "Upload Bursary Documents",
  "RMAT-PENDING": "RMAT Exam is Pending",
  "INTAKE-ASSIGNMENT-PENDING": "Intake Assignment Pending",
};
export enum FileSize {
  maxSize = 2000 * 1024,
}

export function LinearProgressWithLabel(
  props: LinearProgressProps & { value: number }
) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} color="success" />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.primary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}
