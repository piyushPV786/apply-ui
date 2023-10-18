import {
  Typography,
  Card,
  Grid,
  Button,
  Tooltip,
  Container,
  Box,
} from "@mui/material";
import { List } from "@material-ui/core";
import { StyledLabel, Green } from "../../components/common/common";
import styled from "styled-components";
import React, { useRef, useState, useEffect } from "react";
import AlertBox from "../../components/alert/Alert";
import { EyeCircleOutline, CloseCircleOutline } from "mdi-material-ui";

const DocumentUploadContainer = ({ isDeclaretionForm, isRejectStatus }) => {
  const fileUploadRef = useRef<any>(null);
  const onDocUploadClick = () => {
    const fileElement = fileUploadRef.current as HTMLInputElement;
    fileElement?.click() as any;
  };

  return (
    <Card sx={{ padding: 3, marginTop: 5 }}>
      <Grid container spacing={1}>
        <Grid item sm={12} xs={12}>
          <Typography
            textAlign="left"
            component="header"
            style={{ fontFamily: "roboto-medium", fontSize: "14px" }}
            fontWeight="bold"
          >
            <StyledLabel required>
              Document Title
              <Tooltip
                title="Not mandatory for undergraduate students"
                placement="top"
              >
                <span>
                  <span>(Optional)</span>
                </span>
              </Tooltip>
            </StyledLabel>
          </Typography>
        </Grid>
        {isRejectStatus && (
          <Grid item sm={12} xs={12}>
            {" "}
            <AlertBox
              style={{
                width: "100%",
                maxWidth: "unset",
                margin: "10px 0",
              }}
              severity={"danger"}
            >
              Reason text why doc was rejected
            </AlertBox>
          </Grid>
        )}

        {isDeclaretionForm && (
          <Grid sm={12} xs={12} item>
            {" "}
            <InnerContainer className="mobile-block">
              <Box>
                <Typography
                  textAlign="left"
                  className="mr-2 document-infotext"
                  variant="body1"
                >
                  Please download the declaration form, print, fill it out and
                  upload it here
                </Typography>
              </Box>
              <Box>
                <Button variant="contained">Download Declaration form</Button>
              </Box>
            </InnerContainer>
          </Grid>
        )}
        <Grid item sm={12} xs={12}>
          <FileUploadContainer className="upload-box">
            <Box className="d-flex align-items-center">
              <input
                // id={`fileInput_${documentType}`}
                className="d-none"
                ref={fileUploadRef}
                accept="image/jpeg, application/pdf"
                type="file"
                onChange={(e) => {}}
              />
              <Box className="mr-2">
                <Button
                  variant="contained"
                  onClick={() => {
                    onDocUploadClick();
                  }}
                >
                  Browse
                </Button>
              </Box>
              <Typography className="doc-upload-text">
                Drop files here or click browse through your machine
              </Typography>
            </Box>
          </FileUploadContainer>
        </Grid>
        <Grid item sm={12} xs={12}>
          <Container
            sx={{
              display: "flex",
              alignItems: "center",
              background: "#f5f5f5",
              borderLeft: "5px solid",
              borderColor: "green",
            }}
            className="pr-0"
            // key={`file_${file?.name}_${index}_uploaded`}
          >
            <Grid container>
              <Grid item sm={11}>
                FileName
              </Grid>
              <Grid item>
                <a href="">
                  <EyeCircleOutline />
                </a>
                <a href="">
                  <CloseCircleOutline />
                </a>
              </Grid>
            </Grid>
          </Container>
        </Grid>
      </Grid>
    </Card>
  );
};

const InnerContainer = styled(Container)`
  background-color: #faeeda;
  padding: 16px;
  margin-top: 16px;
  display: flex !important;
  justify-content: space-between;
  align-items: center;
`;

const FileUploadContainer = styled(Container)<{ disabled?: boolean }>`
  display: flex;
  align-items: center;

  column-gap: 1rem;
  border: 1px solid;
  padding: 0.7rem;
  background: #f5f5f5;
  ${({ disabled }) =>
    disabled &&
    `
  pointer-events:noneimportant;
  color: #bebdbf!important
  
  `}
`;
export default DocumentUploadContainer;
