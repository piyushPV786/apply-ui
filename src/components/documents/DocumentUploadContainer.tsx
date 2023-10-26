import {
  Typography,
  Card,
  Grid,
  Button,
  Tooltip,
  Container,
  Box,
} from "@mui/material";

import { StyledLabel } from "../common/common";
import styled from "styled-components";
import React, { useEffect, useRef } from "react";
import AlertBox from "../alert/Alert";
import { Visibility, CloseOutlined } from "@material-ui/icons";
import { useFormContext } from "react-hook-form";
import { docType } from "./context/common";

interface propsType {
  documentName: string;
  documentCode: string;
  isRequired: boolean;
}

const DocumentUploadContainer = ({
  documentName,
  documentCode,
  isRequired,
  files,
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
  console.log(errors);
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
        {/* {isRejectStatus && (
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
        )} */}

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
                <Button variant="contained">Download Declaration form</Button>
              </Box>
            </InnerContainer>
          </Grid>
        )}
        <Grid item sm={12} xs={12}>
          <FileUploadContainer className="upload-box">
            <Box className="d-flex align-items-center">
              <input
                multiple={documentCode == docType.IDPASSPORT}
                {...register(`fileInput_${documentCode}`, {
                  required: isRequired,
                })}
                // id={`fileInput_${documentType}`}
                className="d-none"
                ref={fileUploadRef}
                accept="image/jpeg, application/pdf"
                type="file"
                onChange={(e) => {
                  const newFile = e?.target?.files && (e?.target?.files as any);

                  setValue(`fileInput_${documentCode}`, [...newFile]);
                }}
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
                Click on browse and Select all files to be uploded from your
                machine
              </Typography>
            </Box>
          </FileUploadContainer>
        </Grid>
        <Grid item sm={12} xs={12}>
          {errors[`fileInput_${documentCode}`] && (
            <Typography color={"error"}>Please upload documents</Typography>
          )}
          {watch(`fileInput_${documentCode}`)
            ? watch(`fileInput_${documentCode}`)?.map((item, index) => {
                return (
                  <UploadedFileViewContainer
                    className="pr-0"
                    // key={`file_${file?.name}_${index}_uploaded`}
                  >
                    <Grid container>
                      <Grid item sm={11}>
                        {item?.name}
                      </Grid>
                      <Grid item>
                        <a href="">
                          <Visibility />
                        </a>
                        <a
                          onClick={() => {
                            const currentFiles = watch(
                              `fileInput_${documentCode}`
                            );
                            const updatedFiles = [
                              ...currentFiles.slice(0, index), // Elements before the index
                              ...currentFiles.slice(index + 1), // Elements after the index
                            ];

                            setValue(`fileInput_${documentCode}`, updatedFiles);
                          }}
                        >
                          <CloseOutlined />
                        </a>
                      </Grid>
                    </Grid>
                  </UploadedFileViewContainer>
                );
              })
            : null}
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

const UploadedFileViewContainer = styled(Container)`
  background-color: #f5f5f5;
  display: flex !important;
  align-items: center;
  justify-content: space-between;
  margin-top: 1.5rem;
  border-left: 5px solid ${"green"};
  & > span {
    word-break: break-all;
  }
`;
export default DocumentUploadContainer;
