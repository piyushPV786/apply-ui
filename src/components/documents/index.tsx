import { Typography, Card, Grid, Button, Box } from "@mui/material";
import DocumentUploadContainer from "../../components/documents/DocumentUploadContainer";
import { MainContainer } from "../../components/login/style";
import React, { useEffect } from "react";
import StepperComponent from "../../components/stepper/stepper";
import UseDocumentHook from "./customHook/UseDocumentHook";

import { FormProvider, useForm } from "react-hook-form";

const DocumentUploadPage = (props) => {
  const methods = useForm();
  const { applicationCode } = props;
  const { documentTypeData, docJson, onSubmit } =
    UseDocumentHook(applicationCode);

  return (
    <MainContainer>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit((data) => {
            onSubmit(data, false);
          })}
        >
          <Grid
            container
            sm={12}
            xs={12}
            md={12}
            className="d-flex justify-content-center align-items-center"
          >
            <Grid sm={9}>
              <StepperComponent active={1} />
            </Grid>
            <Grid container sm={9}>
              <Grid item sm={9} sx={{ padding: 2 }}>
                {documentTypeData
                  ? documentTypeData?.map((item) => {
                      if (docJson[item?.code]) {
                        return (
                          <DocumentUploadContainer
                            documentName={item?.name}
                            documentCode={item?.code}
                            isRequired={docJson[item?.code]?.isRequired}
                            files={docJson[item?.code].draftFiles}
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
                    <Button
                      className="mb-2"
                      variant="outlined"
                      onClick={methods.handleSubmit((data) => {
                        onSubmit(data, true);
                      })}
                    >
                      Save as Draft
                    </Button>
                    <Button variant="contained" type="submit">
                      Submit Documents
                    </Button>
                  </Box>
                </Card>
                <Card className="mt-3">
                  <Typography
                    textAlign="left"
                    component="header"
                    fontWeight="bold"
                  >
                    Document Status
                  </Typography>
                </Card>
                <Card className="mt-3">
                  <Typography
                    textAlign="left"
                    component="header"
                    fontWeight="bold"
                  >
                    Document Acceptance Criteria
                  </Typography>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </FormProvider>
    </MainContainer>
  );
};

export default DocumentUploadPage;
