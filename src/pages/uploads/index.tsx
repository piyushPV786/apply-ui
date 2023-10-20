import { Typography, Card, Grid, Button, Box } from "@mui/material";
import DocumentUploadContainer from "../../components/documents/DocumentUploadContainer";
import { MainContainer } from "../../components/login/style";
import React from "react";
import StepperComponent from "../../components/stepper/stepper";
import DocumentsHook from "../../components/documents/customHook/documentsHook";
import { docValidation } from "../../components/documents/context/common";

const DocumentUploadPage = () => {
  const { documentTypeData } = DocumentsHook();

  return (
    <MainContainer>
      <Grid
        container
        sm={12}
        xs={12}
        md={12}
        className="d-flex justify-content-center align-items-center"
      >
        <Grid sm={9}>
          <StepperComponent active={3} />
        </Grid>
        <Grid container sm={9}>
          <Grid item sm={9} sx={{ padding: 2 }}>
            {documentTypeData
              ? documentTypeData?.map((item) => {
                  if (docValidation[item?.code]) {
                    return (
                      <DocumentUploadContainer
                        documentName={item?.name}
                        documentCode={item?.code}
                        isRequired={docValidation[item?.code]?.isRequired}
                      />
                    );
                  }
                })
              : null}
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
              <Typography textAlign="left" component="header" fontWeight="bold">
                Document Status
              </Typography>
            </Card>
            <Card className="mt-3">
              <Typography textAlign="left" component="header" fontWeight="bold">
                Document Acceptance Criteria
              </Typography>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </MainContainer>
  );
};

export default DocumentUploadPage;
