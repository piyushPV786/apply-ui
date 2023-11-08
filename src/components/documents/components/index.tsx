import { Box, Card, Grid, IconButton, List, Typography } from "@mui/material";
import { FileUploadContainer, InnerContainer } from "../../login/style";

import StyledButton from "../../button/button";
import { StyledLabel } from "../../common/common";
import {
  DeclarationListitems,
  docType,
  documentCriteria,
  fileValidation,
} from "../context/common";
import { useFormContext } from "react-hook-form";
import { CloseOutlined, VisibilityOutlined } from "@material-ui/icons";
import {
  UseDownloadDeclarationLatter,
  UsePreviewFile,
} from "../customHook/UseDocumentHook";
import { StyleLabel } from "../../button/labelButton";

export const DeclarationComponent = ({ element, masterData }) => {
  const { downloadDeclarationLatter } = UseDownloadDeclarationLatter();
  if (element?.code !== docType.DECLARATIONFORM) {
    return <></>;
  }
  return (
    <Grid sm={12} xs={12} item>
      <InnerContainer className="mobile-block">
        <Box>
          <Typography
            textAlign="left"
            className="mr-2 document-infotext"
            variant="body1"
          >
            Please download the declaration form, print, fill it out and upload
            it here
          </Typography>
        </Box>
        <Box>
          <StyledButton
            title="Download Declaration form"
            onClick={() => {
              downloadDeclarationLatter(masterData);
            }}
          />
        </Box>
      </InnerContainer>
    </Grid>
  );
};

export const BursaryFeilds = ({ element, masterData }) => {
  const { register } = useFormContext();
  if (element?.code !== docType.BURSARYLETTER) {
    return <></>;
  }
  return (
    <Grid
      container
      sm={12}
      md={12}
      mb={2}
      columnSpacing={2}
      rowSpacing={2}
      mt={2}
    >
      <Grid sm={4} md={4} item>
        <StyledLabel required>Bursary Name</StyledLabel>
        <input
          {...register(`${element.code}bursaryName`)}
          className="form-control"
          type={"text"}
          placeholder={"e.g 10 church street"}
        />
      </Grid>
      <Grid sm={4} md={4} item>
        <StyledLabel required>Bursary Email Address</StyledLabel>
        <input
          {...register(`${element.code}bursaryEmail`)}
          className="form-control"
          type={"text"}
          placeholder={"e.g 10 church street"}
        />
      </Grid>
      <Grid sm={4} md={4} item sx={{ height: 20, flexDirection: "row" }}>
        <StyledLabel required>Bursary Name</StyledLabel>
        <input
          className="form-control"
          type={"text"}
          placeholder={"e.g 10 church street"}
        />
      </Grid>
    </Grid>
  );
};

export const FileRegister = ({ element }) => {
  const { register } = useFormContext();

  return (
    <Grid item sm={12} xs={12}>
      <FileUploadContainer className="upload-box">
        <Box className="d-flex align-items-center">
          <StyleLabel htmlFor={`${element?.code}`}>
            <span className="labelTitle">Browse</span>
            <input
              multiple={false}
              {...register(`${element.code}`, {
                validate: (value) => {
                  return fileValidation(value, element?.required);
                },
              })}
              id={`${element?.code}`}
              className="d-none"
              accept="image/jpeg, application/pdf"
              type="file"
            />
          </StyleLabel>
          <Typography className="doc-upload-text">
            Click on browse and Select all files to be uploded from your machine
          </Typography>
        </Box>
      </FileUploadContainer>
    </Grid>
  );
};

export const ErrorHandling = ({ element, masterData }) => {
  const {
    formState: { errors },
  } = useFormContext();
  return (
    <Grid item sm={12} xs={12}>
      {errors[element.code] && (
        <Typography color={"error"}>
          {errors[element.code]?.message as any}
        </Typography>
      )}
      <HandleAction element={element} masterData={masterData} />
    </Grid>
  );
};

export const HandleAction = ({ element, masterData }) => {
  const { watch, setValue } = useFormContext();
  const fileWatch = watch(element?.code)?.file
    ? watch(element?.code)?.file
    : watch(element?.code);
  const { getFileUrl } = UsePreviewFile();
  const handleRemoveFiles = () => {
    setValue(element?.code, undefined);
  };

  if (!fileWatch || fileWatch?.length === 0 || !fileWatch[0]?.name) {
    return <></>;
  }
  console.log(`watch${element?.code}`, fileWatch);
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
      <Grid sm={11} xs={6} item>
        {fileWatch && fileWatch[0]?.name}
      </Grid>
      <Grid sm={1} xs={6} item className="d-flex flex-row  ">
        <IconButton
          onClick={() => {
            getFileUrl(fileWatch[0], masterData);
          }}
        >
          <VisibilityOutlined />
        </IconButton>
        <IconButton
          onClick={() => {
            handleRemoveFiles();
          }}
        >
          <CloseOutlined />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export const DocumentStatus = ({ masterData }) => {
  return (
    <>
      <Card className="mt-3 p-3">
        <Typography textAlign="left" component="header" fontWeight="bold">
          Document Status
        </Typography>
        <List>
          {masterData?.documentTypes?.map((item: any) => (
            <DeclarationListitems text={item?.name} code={item?.code} />
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
    </>
  );
};
