import { Typography, Card, Grid, Container, Box, Chip } from "@mui/material";

import { StyledLabel } from "../common/common";
import styled from "styled-components";
import React, { useEffect, useRef } from "react";
import { VisibilityOutlined, CloseOutlined } from "@material-ui/icons";
import { useFormContext } from "react-hook-form";
import {
  docType,
  fileValidation,
  IconButton,
  statusColor,
  status,
} from "./context/common";
import StyledButton from "../button/button";
import { FileUploadContainer, InnerContainer } from "../login/style";

import {
  DeclarationComponent,
  ErrorHandling,
  FileRegister,
} from "./components";

interface propsType {
  documentName: string;
  documentCode: string;
  isRequired: boolean;
  files: any;
  documetDiclarationLeter: any;
}

const DocumentUploadContainer2 = ({
  documentName,
  documentCode,
  isRequired,
  files,
  documetDiclarationLeter,
}: propsType) => {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  const fileUploadRef = useRef<any>(null);
  const onDocUploadClick = () => {
    const fileElement = fileUploadRef.current as HTMLInputElement;
    fileElement?.click() as any;
  };
  useEffect(() => {
    setValue(`fileInput_${documentCode}`, files);
  }, [files]);

  const handleRemoveFiles = (index) => {
    const currentFiles = watch(`fileInput_${documentCode}`);
    const updatedFiles = [
      ...currentFiles.slice(0, index),
      ...currentFiles.slice(index + 1),
    ];

    setValue(`fileInput_${documentCode}`, updatedFiles);
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
            <StyledLabel required={isRequired}>
              {documentName}
              {/* <Tooltip
                title="Not mandatory for undergraduate students"
                placement="top"
              >
                <span>
                  <span>(Optional)</span>
                </span>
              </Tooltip> */}
            </StyledLabel>
          </Typography>
        </Grid>
        {documentCode == docType.DECLARATIONFORM && (
          <Grid sm={12} xs={12} item>
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
                <StyledButton
                  title="Download Declaration form"
                  onClick={() => {
                    documetDiclarationLeter();
                  }}
                />
              </Box>
            </InnerContainer>
          </Grid>
        )}
        <Grid item sm={12} xs={12}>
          <FileUploadContainer className="upload-box">
            <Box className="d-flex align-items-center">
              <input
                {...register(`fileInput_${documentCode}`, {
                  validate: (value) => {
                    return fileValidation(value, isRequired);
                  },
                })}
                id={`fileInput_${documentCode}`}
                className="d-none"
                ref={fileUploadRef}
                accept="image/jpeg, application/pdf"
                type="file"
                onChange={(e) => {
                  const newFile = e?.target?.files && (e?.target?.files as any);

                  setValue(`fileInput_${documentCode}`, [...newFile], {
                    shouldValidate: true,
                    shouldDirty: true,
                    shouldTouch: true,
                  });
                }}
              />
              <Box className="mr-2">
                <StyledButton
                  title="Browse"
                  onClick={() => {
                    onDocUploadClick();
                  }}
                />
              </Box>
              <Typography className="doc-upload-text">
                Click on browse and Select all files to be uploded from your
                machine
              </Typography>
            </Box>
          </FileUploadContainer>
        </Grid>
        <Grid item sm={12} xs={12}>
          {errors[`fileInput_${documentCode}`] && (
            <Typography color={"error"}>
              {errors[`fileInput_${documentCode}`]?.message as any}
            </Typography>
          )}
          {watch(`fileInput_${documentCode}`)
            ? watch(`fileInput_${documentCode}`)?.map((item, index) => {
                return (
                  <Grid
                    container
                    sx={{
                      backgroundColor: "#f5f5f5",
                      borderLeft: `5px solid ${"green"}`,
                    }}
                    className="p-3  mt-3  "
                    sm={12}
                    xs={12}
                    md={12}
                    lg={12}
                  >
                    <Grid sm={8} xs={6} item>
                      {item.name}
                    </Grid>
                    <Grid sm={4} xs={6} item className="d-flex flex-row  ">
                      <IconButton
                        color={"green"}
                        onClick={() => {
                          // DocumentServices.getFilePreview();
                        }}
                      >
                        <VisibilityOutlined />
                      </IconButton>
                      <IconButton
                        color={"red"}
                        onClick={() => {
                          handleRemoveFiles(index);
                        }}
                      >
                        <CloseOutlined />
                      </IconButton>
                    </Grid>
                  </Grid>
                );
              })
            : null}
        </Grid>
      </Grid>
    </Card>
  );
};

const DocumentUploadContainer = ({ element, masterData }) => {
  const { watch } = useFormContext();

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
            <StyledLabel required={element?.required}>
              {element?.label}
            </StyledLabel>
            <Status
              status={
                watch(element?.code)?.status
                  ? watch(element?.code)?.status
                  : "UPLOADPENDING"
              }
            >
              {watch(element?.code)?.status
                ? status[watch(element?.code)?.status]
                : status["UPLOADPENDING"]}
            </Status>
          </Typography>
        </Grid>
        <DeclarationComponent element={element} masterData={masterData} />
        <FileRegister element={element} />
        <ErrorHandling element={element} masterData={masterData} />
      </Grid>
    </Card>
  );
};

const Status = styled.span<{ status: string; noBg?: boolean }>`
  ${({ status }) => {
    return `
      background:${statusColor[status]?.background};
      color:${statusColor[status]?.text}
      `;
  }};
  ${({ noBg = false }) =>
    noBg &&
    `
  background:transparent !important;
  box-shadow: none!important;
  text-transform: capitalize!important;
  `};
  padding: 4px 10px;
  border-radius: 4px;
  margin-left: 16px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

export default DocumentUploadContainer;
