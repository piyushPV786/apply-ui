import { Box, Card, Grid, IconButton, List, Typography } from "@mui/material";
import { FileUploadContainer, InnerContainer } from "../../login/style";
import { MobileField } from "../../lead/form/components/MobileField";
import { useState } from "react";
import "react-phone-number-input/style.css";
import PhoneInput, { getCountryCallingCode } from "react-phone-number-input";

import StyledButton from "../../button/button";
import { StyledLabel } from "../../common/common";
import {
  DeclarationListitems,
  disableStatus,
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
  const [countryCodeRef, setCountryCode] = useState<any>("ZA");
  const { register } = useFormContext();

  const onCountryChange = (value: string | any) => {
    if (value) {
      setCountryCode(value);
    }
  };

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
      mt={1}
    >
      <Grid sm={4} md={4} item>
        <StyledLabel required={element?.required}>Bursary Name</StyledLabel>
        <input
          {...register(`${element.code}Name`, {
            required: element?.required,
          })}
          className="form-control"
          type={"text"}
          placeholder={"e.g 10 church street"}
        />
      </Grid>
      <Grid sm={4} md={4} item>
        <StyledLabel required={element?.required}>
          Bursary Email Address
        </StyledLabel>
        <input
          {...register(`${element.code}Email`, {
            required: element?.required,
          })}
          className="form-control"
          type={"text"}
          placeholder={"e.g 10 church street"}
        />
      </Grid>
      <Grid sm={4} md={4} item>
        <StyledLabel required={element?.required}>
          Bursary Phone Number
        </StyledLabel>
        <PhoneInput
          {...register(`${element.code}Phone`, {
            required: element?.required,
          })}
          fullWidth
          id="2"
          international
          countryCallingCodeEditable={false}
          defaultCountry={countryCodeRef}
          placeholder="Select Country Code*"
          onCountryChange={(value: any) => {
            onCountryChange(value);
          }}
          onChange={() => {}}
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
          <Typography color={"green"}>
            <VisibilityOutlined />
          </Typography>
        </IconButton>
        {!disableStatus.includes(watch(element?.code)?.status) && (
          <IconButton
            onClick={() => {
              handleRemoveFiles();
            }}
          >
            <Typography color={"error"}>
              <CloseOutlined />
            </Typography>
          </IconButton>
        )}
      </Grid>
    </Grid>
  );
};

export const DocumentStatus = ({ masterData }) => {
  return (
    <>
      <Card className="mt-3 p-1">
        <Typography
          textAlign="left"
          component="header"
          fontWeight="bold"
          className="m-2"
        >
          Document Status
        </Typography>
        <List>
          {masterData?.documentFormData?.map((item: any) => (
            <DeclarationListitems
              text={item?.name}
              code={item?.code}
              isRequired={item?.required}
            />
          ))}
        </List>
      </Card>
      <Card className="mt-3 p-3">
        <Typography component="header" fontWeight="bold">
          Document Acceptance Criteria
        </Typography>
        <List>
          {documentCriteria.map(({ text }: any) => (
            <DeclarationListitems text={text} isRequired={true} />
          ))}
        </List>
      </Card>
    </>
  );
};
