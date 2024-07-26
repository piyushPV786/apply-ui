import { Typography, Box, ListItem, ListItemText } from "@mui/material";
import styled from "styled-components";
import { useFormContext } from "react-hook-form";
import { CommonEnums } from "../../common/constant";

// comon document page used constants //
export const mbaDocs = ["MOTIVATIONLETTER"];
export const nonMandatoryDocuments = [
  "TERMS&CONDITION",
  "APPLICATIONLETTER",
  "MATRIC",
  "OTHERS",
  "INTERVIEWNOTES",
  "EDFORALLCONTRACT",
  "RPL",
  "SAQA",
  "DEBITORDER",
  "COURSEAPPROVAL",
  "MBCERTIFICATE",
];

export const docType = {
  RESUMECV: "RESUMECV",
  MATRIC: "MATRIC",
  HIGHESTQUALIFICATION: "HIGHESTQUALIFICATION",
  BURSARYLETTER: "BURSARYLETTER",
  DECLARATIONFORM: "DECLARATIONFORM",
  MOTIVATIONLETTER: "MOTIVATIONLETTER",
  INTERVIEWNOTES: "INTERVIEWNOTES",
};

export const bursarryFeilds = {
  Name: "BURSARYLETTERName",
  Email: "BURSARYLETTEREmail",
  Phone: "BURSARYLETTERPhone",
};

export const dashboardRedirectStatus = [
  CommonEnums?.RESUB_APP_DOC,
  CommonEnums?.BURSARY_LETTER_PEND,
  CommonEnums?.RESUB_BURSARY_DOC,
  CommonEnums?.APP_ENROLLED_STATUS,
];

export const customStatus = {
  UPLOADPENDING: "UPLOADPENDING",
  UPLOADED: "UPLOADED",
  EDFORALLCONTRACT: "EDFORALLCONTRACT",
};

export const status = {
  PENDING: "Approval Pending",
  SALES_APPROVED: "Sales Approved",
  ADMISSION_APPROVED: "Admission Approved",
  REJECT: "Document Rejected",
  UPLOADPENDING: "Upload Pending",
  UPLOADED: "Uploaded",
  SALES_REJECT: "Sales Rejected",
  ADMISSION_REJECT: "Admission Rejected",
};

export const docRejectStatus = ["SALES_REJECT", "ADMISSION_REJECT"];

export const disableStatus = ["SALES_APPROVED", "ADMISSION_APPROVED"];

export const statusColor = {
  PENDING: { text: "#af7300", background: "#fcefd0" },
  SALES_APPROVED: { text: "#008554", background: "#eefbe5" },
  ADMISSION_APPROVED: { text: "#008554", background: "#eefbe5" },
  REJECT: { text: "#af7300", background: "#fcefd0" },
  UPLOADPENDING: { text: "#af7300", background: "#fcefd0" },
  UPLOADED: { text: "#af7300", background: "#fcefd0" },
  SALES_REJECT: { text: "#ff281b", background: "#ffe9e9" },
  ADMISSION_REJECT: { text: "#ff281b", background: "#ffe9e9" },
};

export const acceptedFileTypes = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "application/pdf",
];

export const MBACode = "MBA-Prog";
export const DBMCode = "DBM-Prog";

export const allowedPaymentStatus = [
  "APP-FEE-PEND",
  "ENRL-ACCEPTED",
  "PROG-FEE-PEND",
  "RPL-FEE-PEND",
  "MONTHLY_PAYMENT_REJECTED",
  "RESUB-APP-FEE-PROOF",
];

export const documentCriteria = [
  {
    text: `File accepted: JPEG/JPG/PNG, PDF (Max size: 2MB)`,
    isInnerText: true,
  },
  {
    text: `ID should be at least valid for 6 months`,
    isInnerText: true,
  },
  { text: "Upload a color scan of the original document." },
];

// comon document page used components //

export const ShortTypography = styled(Typography)<any>(() => ({
  fontSize: "13px !important",
  fontWeight: "700px ! important",
  maxWidth: "122px",
}));

export const DeclarationListitems = (props) => {
  const { text, code, isShow } = props;

  const { watch } = useFormContext();

  if (isShow) {
    return (
      <ListItem
        key={text}
        dense
        sx={{
          width: "100%",
          bgcolor: "background.paper",
          marginRight: "5px",
        }}
      >
        <ListItemText
          id={text}
          primary={
            code ? (
              <ShortTypography className="h6">{text}</ShortTypography>
            ) : (
              <Typography className="h6">{text}</Typography>
            )
          }
        />
        {code && (
          <ShortTypography
            sx={{
              color: `${
                watch(code)?.status
                  ? statusColor[watch(code).status]?.text
                  : statusColor[getStatus(watch(code))]?.text
              }`,
            }}
          >
            {watch(code)?.status
              ? status[watch(code)?.status]
              : status[getStatus(watch(code))]}
          </ShortTypography>
        )}
      </ListItem>
    );
  } else {
    return null;
  }
};
export const IconButton = styled(Box)<any>(({ color }) => ({
  height: "40px",
  width: "40px",
  border: `2px solid ${color}`,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 50,
  cursor: "pointer",
  color: `${color}`,
  margin: "3px",
}));

//common functions//
export const fileValidation = (value, element) => {
  if (
    (!value || value?.length === 0 || value[0]?.name?.length === 0) &&
    element?.required === true
  ) {
    return "This file is Required please upload file";
  }
  if (value && element?.code) {
    if (value[0] && !acceptedFileTypes.includes(value[0]?.type)) {
      return "This file type is not accepted please upload from accepted file types";
    } else if (
      value[0]?.size > 20 * 1024 * 1024 &&
      element?.code === customStatus?.EDFORALLCONTRACT
    ) {
      return "File size should be at most 20MB";
    } else if (
      value[0]?.size > 3 * 1024 * 1024 &&
      element?.code !== customStatus?.EDFORALLCONTRACT
    ) {
      return "File size should be at most 3MB";
    }
  }

  return true;
};

export const getStatus = (value) => {
  if (value) {
    if (value?.length > 0) {
      return customStatus.UPLOADED;
    } else {
      return customStatus.UPLOADPENDING;
    }
  } else {
    return customStatus.UPLOADPENDING;
  }
};
