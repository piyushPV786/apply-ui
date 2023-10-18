import {
  Typography,
  Card,
  Grid,
  Button,
  Tooltip,
  Container,
  Box,
} from "@mui/material";
import DocumentUploadContainer from "../../components/document/DocumentUploadContainer";
import React, { useRef, useState, useEffect } from "react";
import StepperComponent from "../../components/stepper/stepper";

const DocumentUploadPage = () => {
  return (
    <Box sx={{ backgroundColor: "#dde1e3" }}>
      <Grid
        container
        sm={12}
        xs={12}
        md={12}
        className="d-flex justify-content-center align-items-center"
      >
        <Grid sm={9}>
          <StepperComponent
            isFormSubmitted={true}
            isPaymentDone={true}
            active={3}
          />
        </Grid>
        <Grid container sm={9}>
          <Grid item sm={9} sx={{ padding: 2 }}>
            <DocumentUploadContainer
              isDeclaretionForm={true}
              isRejectStatus={false}
            />
            <DocumentUploadContainer
              isDeclaretionForm={false}
              isRejectStatus={true}
            />
            <DocumentUploadContainer
              isDeclaretionForm={false}
              isRejectStatus={false}
            />
            <DocumentUploadContainer
              isDeclaretionForm={false}
              isRejectStatus={false}
            />
          </Grid>
          <Grid
            item
            sm={3}
            sx={{ padding: 2, marginTop: 5 }}
            className="sticky-wrapper"
          >
            <Card sx={{ padding: 2 }}>
              <Box className="d-flex justify-content-center flex-column">
                <Button className="mb-2" variant="outlined">
                  Save as Draft
                </Button>
                <Button variant="contained">Submit Documents</Button>
              </Box>
            </Card>
            <Card className="mt-3">
              {" "}
              <Typography textAlign="left" component="header" fontWeight="bold">
                Document Status
              </Typography>
            </Card>
            <Card className="mt-3">
              {" "}
              <Typography textAlign="left" component="header" fontWeight="bold">
                Document Acceptance Criteria
              </Typography>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DocumentUploadPage;
