import { Card, Grid, Box } from "@mui/material";
import { MainContainer } from "../../components/login/style";
import DocumentUploadContainer from "../../components/documents/DocumentUploadContainer";
import StepperComponent from "../../components/stepper/stepper";
import StyledButton from "../button/button";
import { StyledMessage } from "../common/common";
import Header from "../common/header";

import { FormProvider, useForm } from "react-hook-form";
import React, { useEffect } from "react";

import {
  ActionDocumentSubmit,
  UseDocumentHook,
} from "./customHook/UseDocumentHook";
import { DocumentStatus } from "./components";
import { setDocumentValue } from "../../Util/Util";
import { Spinner } from "../Loader";
import UseUploadDocumentHook from "./customHook/UseUploadDocumentHook";

const DocumentUploadPage = (props) => {
  const methods = useForm();
  const { applicationCode } = props;
  const { masterData } = UseDocumentHook(applicationCode);
  const { saveAsDraft, submitDocument, disable, loader } =
    ActionDocumentSubmit();
  const { handleSubmit } = methods;

  const { uploadDocument, uploadProgress } = UseUploadDocumentHook(masterData);
  console.log("upload progress =============>", uploadProgress);

  useEffect(() => {
    if (masterData?.documents) {
      setDocumentValue(masterData?.documents, methods.setValue);
    }
  }, [masterData?.documents]);

  return (
    <MainContainer>
      {loader && <Spinner />}
      <Header />
      <FormProvider {...methods}>
        <form>
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
            <Grid container sm={10}>
              <Grid item sm={9} sx={{ padding: 2 }}>
                <StyledMessage />
                {masterData?.documentFormData?.map((element) => {
                  if (element?.show) {
                    return (
                      <DocumentUploadContainer
                        element={element}
                        masterData={masterData}
                        uploadDocument={uploadDocument}
                      />
                    );
                  }
                })}
              </Grid>
              <Grid item sm={3} className="pt-3">
                <Box className="sticky-wrapper">
                  <Card className="p-2 mt-5">
                    <Box className="d-flex justify-content-center flex-column">
                      <StyledButton
                        disabled={disable}
                        type="button"
                        isGreenWhiteCombination
                        title="Save As Draft"
                        className="mb-2"
                        onClick={(e) => {
                          e.preventDefault();
                          const data = methods.watch();
                          saveAsDraft(data, masterData);
                        }}
                      />

                      <StyledButton
                        disabled={disable}
                        type="button"
                        title="Submit Documents"
                        onClick={handleSubmit((d) =>
                          submitDocument(d, masterData)
                        )}
                      />
                    </Box>
                  </Card>
                  <DocumentStatus masterData={masterData} />
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </FormProvider>
    </MainContainer>
  );
};

export default DocumentUploadPage;
