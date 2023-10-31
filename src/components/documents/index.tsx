import { Typography, Card, Grid, Box, List } from "@mui/material";
import { MainContainer } from "../../components/login/style";
import DocumentUploadContainer from "../../components/documents/DocumentUploadContainer";
import StepperComponent from "../../components/stepper/stepper";
import StyledButton from "../button/button";
import Header from "../common/header";

import UseDocumentHook from "./customHook/UseDocumentHook";
import { FormProvider, useForm } from "react-hook-form";
import React from "react";
import {
  documentCriteria,
  DeclarationListitems,
} from "../../components/documents/context/common";

const DocumentUploadPage = (props) => {
  const methods = useForm();
  const { applicationCode } = props;
  const { documentTypeData, docJson, onSubmit, documetDiclarationLeter } =
    UseDocumentHook(applicationCode);

  return (
    <MainContainer>
      <Header />
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
                            documetDiclarationLeter={documetDiclarationLeter}
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
              <Grid item sm={3} sx={{ padding: 2 }}>
                <Box className="sticky-wrapper">
                  <Card sx={{ padding: 2, marginTop: 5 }}>
                    <Box className="d-flex justify-content-center flex-column">
                      <StyledButton
                        isGreenWhiteCombination
                        title="Save As Draft"
                        className="mb-2"
                        onClick={() => {
                          const data = methods.watch();
                          onSubmit(data, true);
                        }}
                      />

                      <StyledButton
                        title="Submit Documents"
                        onClick={methods.handleSubmit((data) => {
                          onSubmit(data, false);
                        })}
                      />
                    </Box>
                  </Card>
                  <Card className="mt-3 p-3">
                    <Typography
                      textAlign="left"
                      component="header"
                      fontWeight="bold"
                    >
                      Document Status
                    </Typography>
                    <List>
                      {documentTypeData?.map((item) => (
                        <DeclarationListitems text={item?.name} />
                      ))}
                    </List>
                  </Card>
                  <Card className="mt-3 p-3">
                    <Typography component="header" fontWeight="bold">
                      Document Acceptance Criteria
                    </Typography>
                    <List>
                      {documentCriteria.map(({ text }: any) => (
                        <DeclarationListitems text={text} />
                      ))}
                    </List>
                  </Card>
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
