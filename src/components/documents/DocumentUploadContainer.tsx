import { Typography, Card, Grid } from "@mui/material";

import { StyledLabel } from "../common/common";
import styled from "styled-components";
import React from "react";
import { useFormContext } from "react-hook-form";
import { getStatus } from "./context/common";

import { statusColor, status, disableStatus } from "./context/common";

import {
  DeclarationComponent,
  ErrorHandling,
  FileRegister,
  BursaryFeilds,
} from "./components";

interface propsType {
  documentName: string;
  documentCode: string;
  isRequired: boolean;
  files: any;
  documetDiclarationLeter: any;
}

const DocumentUploadContainer = ({ element, masterData }) => {
  const { watch } = useFormContext();

  return (
    <Card className="p-4 mt-3">
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
                  : getStatus(watch(element?.code))
              }
            >
              {watch(element?.code)?.status
                ? status[watch(element?.code)?.status]
                : status[getStatus(watch(element?.code))]}
            </Status>
          </Typography>
        </Grid>
        <BursaryFeilds element={element} masterData={masterData} />
        <DeclarationComponent element={element} masterData={masterData} />
        {!disableStatus.includes(watch(element?.code)?.status) && (
          <FileRegister element={element} />
        )}
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
