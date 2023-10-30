import { Typography, Box, ListItem, ListItemText } from "@mui/material";
import styled from "styled-components";

// comon document page used constants //
export const mbaDocs = ["MOTIVATIONLETTER", "INTERVIEWNOTES"];

export const docType = {
  IDPASSPORT: "IDPASSPORT",
  RESUMECV: "RESUMECV",
  MATRIC: "MATRIC",
  HIGHESTQUALIFICATION: "HIGHESTQUALIFICATION",
  BURSARYLETTER: "BURSARYLETTER",
  DECLARATIONFORM: "DECLARATIONFORM",
  MOTIVATIONLETTER: "MOTIVATIONLETTER",
  INTERVIEWNOTES: "INTERVIEWNOTES",
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
export const DeclarationListitems = ({ text }) => {
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
export const fileValidation = (value) => {
  if (!value || value.length === 0) {
    return "This file is Required please upload file";
  }
  for (let i = 0; i < value.length; i++) {
    if (value[i].type && !acceptedFileTypes.includes(value[i].type)) {
      return "This file type is not accepted please upload from accepted file types";
    } else if (value[i].size > 2 * 1024 * 1024) {
      return "File size should be at most 2MB";
    }
  }
  return true;
};
