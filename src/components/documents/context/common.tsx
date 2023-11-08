import { Typography, Box, ListItem, ListItemText } from "@mui/material";
import styled from "styled-components";
import { useFormContext } from "react-hook-form";

// comon document page used constants //
export const mbaDocs = ["MOTIVATIONLETTER", "INTERVIEWNOTES"];

export const docType = {
  RESUMECV: "RESUMECV",
  MATRIC: "MATRIC",
  HIGHESTQUALIFICATION: "HIGHESTQUALIFICATION",
  BURSARYLETTER: "BURSARYLETTER",
  DECLARATIONFORM: "DECLARATIONFORM",
  MOTIVATIONLETTER: "MOTIVATIONLETTER",
  INTERVIEWNOTES: "INTERVIEWNOTES",
};

export const customStatus = {
  UPLOADPENDING: "UPLOADPENDING",
  UPLOADED: "UPLOADED",
};

export const status = {
  PENDING: "Aproval Pending",
  SALES_APPROVED: "Sales Approved",
  ADMISSION_APPROVED: "Admission Approved",
  REJECT: "Document Rejected",
  UPLOADPENDING: "Upload Pending",
  UPLOADED: "Uploaded",
};

export const statusColor = {
  PENDING: { text: "#af7300", background: "#fcefd0" },
  SALES_APPROVED: { text: "#008554", background: "#eefbe5" },
  ADMISSION_APPROVED: { text: "#008554", background: "#eefbe5" },
  REJECT: { text: "#af7300", background: "#fcefd0" },
  UPLOADPENDING: { text: "#af7300", background: "#fcefd0" },
  UPLOADED: { text: "#af7300", background: "#fcefd0" },
};

export const acceptedFileTypes = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "application/pdf",
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
export const DeclarationListitems = (props) => {
  const { text, code } = props;

  const { watch } = useFormContext();

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
      <ListItemText id={text} primary={<Typography>{text}</Typography>} />
      {code && (
        <Typography
          sx={{
            color: `${
              watch(code)?.status
                ? statusColor[watch(code).status].text
                : watch(code)
                ? statusColor[customStatus.UPLOADED].text
                : statusColor[customStatus.UPLOADPENDING].text
            }`,
          }}
        >
          {watch(code)?.status
            ? status[watch(code)?.status]
            : watch(code)
            ? status[customStatus.UPLOADED]
            : status[customStatus.UPLOADPENDING]}
        </Typography>
      )}
    </ListItem>
  );
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
export const fileValidation = (value, isRequired) => {
  if (
    (!value || value?.length === 0 || value[0]?.name?.length === 0) &&
    isRequired == true
  ) {
    return "This file is Required please upload file";
  }
  if (value) {
    if (value[0]?.type && !acceptedFileTypes.includes(value[0]?.type)) {
      return "This file type is not accepted please upload from accepted file types";
    } else if (value[0]?.size > 2 * 1024 * 1024) {
      return "File size should be at most 2MB";
    }
  }

  return true;
};
