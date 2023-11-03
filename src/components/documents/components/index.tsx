import { Box, Card, Grid, IconButton, List, Typography } from "@mui/material";
import { FileUploadContainer, InnerContainer } from "../../login/style";
import StyledButton from "../../button/button";
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
  const { watch } = useFormContext();
  const fileWatch = watch(element?.code);
  const { getFileUrl } = UsePreviewFile();
  if (!fileWatch || fileWatch?.length === 0 || !fileWatch[0]?.name) {
    return <></>;
  }
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
        {fileWatch && fileWatch[0]?.name}
      </Grid>
      <Grid sm={4} xs={6} item className="d-flex flex-row  ">
        <IconButton
          onClick={() => {
            getFileUrl(fileWatch[0], masterData);
          }}
        >
          <VisibilityOutlined />
        </IconButton>
        <IconButton
          onClick={() => {
            //handleRemoveFiles(index);
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
    </>
  );
};
