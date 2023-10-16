import React, { useRef, useState, SyntheticEvent, useEffect } from "react";
import { UseFormSetValue, UseFormReturn } from "react-hook-form";
import styled from "styled-components";
import { Container, Typography, Tooltip } from "@mui/material";
import StyledButton from "../button/button";
import { Green, StyledLabel } from "../common/common";
import { AlertEnums } from "../common/constant";
import AlertBox from "../alert/Alert";
import TextField, { textFieldClasses } from "@mui/material/TextField";
import Autocomplete, { autocompleteClasses } from "@mui/material/Autocomplete";
import PhoneInput, { getCountryCallingCode } from "react-phone-number-input";

import {
  downloadDeclarationLetter,
  isInvalidFileType,
  showErrorToast,
} from "../../Util/Util";
import { GreenText } from "../student/style";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

import {
  CheckOutlined,
  CloseOutlined,
  VisibilityOutlined,
} from "@material-ui/icons";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  makeStyles,
} from "@material-ui/core";
import { CommonAPI } from "../../service/Axios";
import axios from "axios";

import { IOption } from "../common/types";

interface DocumentUploadContainerProps {
  title: string;
  status: string;
  documentType: string;
  fileUploadButtonText?: string;
  reasonText?: string;
  isDeclaration?: boolean;
  disabled?: boolean;
  draftSaveDoc?: File | any;
  isOptional?: boolean;
  customComponent?:
    | React.ReactComponentElement<any>
    | React.ReactNode
    | ReactJSXElement;
  onUpload?: (file: File | File[]) => void;
  onRemove?: (index: number, file: File) => void;
  selectedDocuments?: (File & { error: boolean; typeCode: string })[];
  documentFormFields: any;
  register: UseFormReturn["register"];
  setValue: UseFormSetValue<any>;
  documentTypeList: IOption[];
  id: string;
  watch: UseFormReturn["watch"];
  documentFieldErrors: any;
  isBursarry: boolean;
}

const getFilePreview = (fileName, fileExt) => {
  CommonAPI.get(`/document?filename=${fileName}.${fileExt}`).then(
    ({ data: url }) => {
      const fileUrl = url?.data?.split("?");
      const data = fileUrl[0];
      const ext = data.split(".").pop();
      axios
        .get(url?.data, {
          responseType: "arraybuffer",
        })
        .then((response) => {
          const file = new Blob([response.data], {
            type: ext === "pdf" ? "application/pdf" : "image/jpeg",
          });
          const fileURL = URL.createObjectURL(file);
          window.open(fileURL);
        })
        .catch((error) => {
          showErrorToast("Error viewing file. Please try again after sometime");
          console.log("Error viewing file", error.message);
        });
    }
  );
};

const showPdf = (
  e: SyntheticEvent,
  item: File & { isUploadedNow?: boolean; code?: string }
) => {
  e.preventDefault();
  if (!item?.isUploadedNow) {
    let fileExt = item?.name?.split(".").pop();
    if (fileExt === "jpg") {
      fileExt = "jpeg";
    }
    getFilePreview(item?.code, fileExt);
    return;
  }
  const file = new Blob([item], {
    type: item?.type.includes("pdf") ? "application/pdf" : "image/jpeg",
  });
  const fileURL = URL.createObjectURL(file);
  window.open(fileURL);
};

const DocumentUploadContainer: React.FC<DocumentUploadContainerProps> = ({
  title = "Declaration form",
  status = "Approved",
  fileUploadButtonText = "Browse",
  isDeclaration = false,
  reasonText = "The document is not clear, Please reupload and submit the document again",
  onUpload,
  documentType,
  onRemove,
  customComponent,
  isOptional = false,
  draftSaveDoc,
  disabled = false,
  selectedDocuments = [],
  documentFormFields,
  register,
  documentFieldErrors,
  setValue,
  documentTypeList,
  id,
  watch,
  isBursarry,
}) => {
  const [uploadDocs, setUploadDocs] = useState<
    (File & { error: boolean; typeCode: string })[]
  >([]);

  const fileUploadRef = useRef<any>(null);

  const onDocUploadClick = () => {
    const fileElement = fileUploadRef.current as HTMLInputElement;
    fileElement?.click() as any;
  };

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [errorType, setErrorType] = useState<string>("");

  const statusType = status?.toLowerCase();

  const isApproved = statusType?.includes("submitted");
  const isSubmitted = statusType?.includes("approved");

  useEffect(() => {
    if (selectedDocuments?.length > 0) {
      setUploadDocs(selectedDocuments?.filter((item) => Boolean(item)));
    }
  }, []);

  const uploadDocuments = (files: any) => {
    const uploadedFiles = files;
    uploadedFiles.forEach((item: any) => {
      item.error = isInvalidFileType(item.type);
    });
    setUploadDocs(uploadedFiles);
    onUpload && onUpload(files);
  };

  const onRemoveDoc = (index: number, file: File & { typeCode: string }) => {
    fileUploadRef!.current!.value = "";
    const remainingDocs = [...uploadDocs!.filter((item, idx) => idx !== index)];
    setUploadDocs(remainingDocs);
    onRemove && onRemove(index, file);
  };

  const onDownloadDeclarationLetter = async () => {
    const responseData = await downloadDeclarationLetter();
    const blob = new Blob([responseData], {
      type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    });
    const downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(blob);
    const filename = "declaration-letter.docx";
    downloadLink.download = filename;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    URL.revokeObjectURL(downloadLink.href);
  };

  const handleModalOpen = (errortype, e) => {
    e.target.value = "";
    setErrorType(errortype);
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  return (
    <MainContainer className="card-shadow mt-0">
      <Typography
        textAlign="left"
        component="header"
        style={{ fontFamily: "roboto-medium", fontSize: "14px" }}
        fontWeight="bold"
      >
        <Dialog
          open={openModal}
          onClose={handleModalClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {errorType == "Size" ? "File Size Exceeded" : "File type mismatch"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {errorType == "Size"
                ? "The file size exceeds the limit of 2MB. Please upload a file belowor equal to 2MB."
                : "File type not accepted. Please convert the file to accepted file type"}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <StyledButton color="" title="Close" onClick={handleModalClose} />
          </DialogActions>
        </Dialog>
        <StyledLabel required>
          {title}{" "}
          <Tooltip
            title="Not mandatory for undergraduate students"
            placement="top"
          >
            <span>
              {isOptional && documentType === "detailCV" && (
                <span>(Optional)</span>
              )}
            </span>
          </Tooltip>
        </StyledLabel>
        <Status
          className="doc-status"
          style={{ marginLeft: "2rem" }}
          status={status}
        >
          {status}
        </Status>
      </Typography>
      {id == "DECLARATIONFORM" && (
        <InnerContainer className="mobile-block">
          <div>
            <Typography
              textAlign="left"
              className="mr-2 document-infotext"
              variant="body1"
            >
              Please download the declaration form, print, fill it out and
              upload it here
            </Typography>
          </div>
          <div>
            <StyledButton
              title={"Download Declaration form"}
              isGreenWhiteCombination
              isDownloadBtn
              onClick={onDownloadDeclarationLetter}
            />
          </div>
        </InnerContainer>
      )}
      {status?.toLowerCase()?.includes("rejected") && (
        <>
          <AlertBox
            style={{ width: "100%", maxWidth: "unset", margin: "10px 0" }}
            severity={AlertEnums.DANGER}
          >
            {reasonText}
          </AlertBox>
        </>
      )}
      {id == "IDPASSPORT" ? (
        <div className="row mt-4">
          <div className="col-md-6 mt-4">
            <div className="mb-4">
              <Autocomplete
                sx={{
                  [`& .${autocompleteClasses.inputRoot}`]: {
                    border: "2px solid #ced4da",
                    borderRadius: 1.5,
                  },
                  "& .MuiIconButton-root": { padding: "3px !important" },
                }}
                {...register(`document.identificationDocumentType${id}`, {
                  required: true,
                })}
                onChange={(e, v) =>
                  setValue(`document.identificationDocumentType${id}`, v?.code)
                }
                fullWidth
                style={{ width: "100%" }}
                options={documentTypeList}
                value={
                  watch(`document.identificationDocumentType${id}`)
                    ? documentTypeList.find((item) => {
                        return (
                          item.code ==
                          documentFormFields.identificationDocumentTypeIDPASSPORT
                        );
                      })
                    : null
                }
                getOptionLabel={(option: { name: string }) => option.name}
                renderInput={(params) => (
                  <TextField
                    sx={{
                      "& .MuiOutlinedInput-notchedOutline": {
                        border: "none !important",
                      },
                      "& .MuiAutocomplete-input": {
                        padding: "2px 4px 2px 3px !important",
                        fontSize: "14px !important",
                      },
                      "& .MuiOutlinedInput-root": {
                        padding: "0.375rem 0.75rem",
                      },
                    }}
                    {...params}
                    fullWidth
                  />
                )}
              />

              {documentFieldErrors?.identificationDocumentTypeIDPASSPORT && (
                <div className="invalid-feedback">
                  Please select Identification Document Type
                </div>
              )}
            </div>
          </div>

          {watch(`document.identificationDocumentType${id}`) == "OTHERS" && (
            <div className="col-md-4">
              <div className="mb-4">
                <StyledLabel required>Others ( Please Specify )</StyledLabel>
                <input
                  value={documentFormFields?.other}
                  defaultValue={documentFormFields?.other}
                  {...register(`document.other${id}`, {
                    required: true,
                  })}
                  onChange={(e) => {
                    setValue(`document.other${id}`, e.target.value);
                  }}
                  type="text"
                  className="form-control"
                  id="otherText"
                />

                {documentFieldErrors?.identificationDocumentTypeIDPASSPORT && (
                  <div className="invalid-feedback">
                    Please select Identification Document Type
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      ) : null}

      {isBursarry && id == "BURSARYLETTER" && (
        <div className="row">
          <div className="col-md-4">
            <div className="mb-4">
              <StyledLabel required>Bursary Name</StyledLabel>
              <input
                className="form-control"
                // value={fullNameVal}
                // defaultValue={fullNameVal}
                // {...register(`${fullName}`, { required: isKinNeed })}
                // onChange={(e) => {
                //   const value = e.target.value;
                //   const name = e.target.name;
                //   if (onlyAlphabets(value)) {
                //     setValue(name, capitalizeFirstLetter(value), formOptions);
                //   }
                // }}
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="mb-4">
              <StyledLabel required>Bursary Email Address</StyledLabel>
              <input
                className="form-control"
                // value={fullNameVal}
                // defaultValue={fullNameVal}
                // {...register(`${fullName}`, { required: isKinNeed })}
                // onChange={(e) => {
                //   const value = e.target.value;
                //   const name = e.target.name;
                //   if (onlyAlphabets(value)) {
                //     setValue(name, capitalizeFirstLetter(value), formOptions);
                //   }
                // }}
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="mb-4">
              <StyledLabel required>Bursary Phone Number</StyledLabel>
              <PhoneInput
                id="2"
                international
                countryCallingCodeEditable={false}
                // defaultCountry={countryCodeRef}
                placeholder="Select Country Code*"
                onCountryChange={(value: any) => {
                  // setCountryCode(value);
                }}
                onBlur={() => {
                  // uppdateMobNumber();
                }}
                onChange={(value) => {}}
                // value={value}
              />
            </div>
          </div>
        </div>
      )}

      <FileUploadContainer className="upload-box">
        <div className="d-flex align-items-center">
          <input
            id={`fileInput_${documentType}`}
            className="d-none"
            ref={fileUploadRef}
            accept="image/jpeg, application/pdf"
            type="file"
            onChange={(e) => {
              if (e?.target) {
                const file = e.target?.files![0] as any;
                if (file != undefined) {
                  if (file?.size > 2 * 1024 * 1024) {
                    handleModalOpen("Size", e);
                  } else {
                    if (
                      file?.type == "application/pdf" ||
                      file?.type == "image/jpeg" ||
                      file?.type == "image/png"
                    ) {
                      file.typeCode = documentType;
                      const files = [...uploadDocs!, file];
                      uploadDocuments(files);
                    } else {
                      handleModalOpen("Type", e);
                    }
                  }
                }
              }
            }}
          />
          <div className="mr-2">
            <StyledButton
              title={fileUploadButtonText}
              style={{ width: "100px" }}
              onClick={onDocUploadClick}
              disabled={isApproved || isSubmitted}
            />
          </div>
          <Typography className="doc-upload-text">
            Drop files here or click browse through your machine
          </Typography>
        </div>
      </FileUploadContainer>
      {uploadDocs &&
        uploadDocs?.length > 0 &&
        uploadDocs?.map((file, index) => (
          <UploadedFileViewContainer
            className="pr-0"
            key={`file_${file?.name}_${index}_uploaded`}
          >
            <div className="row w-100">
              <div className="col-md-8">
                <GreenText>{file?.name}</GreenText>
              </div>
              <div className="col-md-4 upload-button-section">
                <ActionContainer className="upload-file-name">
                  <CircleIconContainer onClick={(e) => showPdf(e, file)}>
                    {" "}
                    <VisibilityOutlined />
                  </CircleIconContainer>
                  <CircleIconContainer
                    onClick={() => onRemoveDoc(index, file)}
                    style={{ borderColor: "red", color: "red" }}
                    disabled={isApproved || isSubmitted}
                  >
                    <CloseOutlined />
                  </CircleIconContainer>
                </ActionContainer>
              </div>
            </div>
          </UploadedFileViewContainer>
        ))}
    </MainContainer>
  );
};

export default DocumentUploadContainer;

const useStyles = makeStyles({
  root: {
    display: "flex",
    alignItems: "center",
    margin: "10px 0",
  },
  icon: {
    color: "#00C853",
  },
  text: {
    fontSize: 14,
  },
  roundBackground: {
    backgroundColor: "#dfefe9",
    borderRadius: "50%",
    marginRight: "5px",
    height: "20px",
    width: "20px",
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center",
  },
  labelContainer: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
  },
});

export const TickWithText = ({
  text,
  status = "",
  icon,
  isInnerText = false,
  required = true,
}: any) => {
  const classes = useStyles();
  const labelId = `list-secondary-label-${text}`;
  const title = () => (
    <StyledLabel className="sidebar-label" required={required}>
      {isInnerText ? (
        <div dangerouslySetInnerHTML={{ __html: text }}></div>
      ) : (
        text
      )}
    </StyledLabel>
  );
  return (
    <ListItem
      key={text}
      secondaryAction={
        <>
          {status && (
            <Status
              className="sidebar-status"
              noBg
              status={status}
            >{`${status}`}</Status>
          )}
        </>
      }
      disablePadding
      dense
      sx={{
        width: "100%",
        bgcolor: "background.paper",
        marginRight: "5px",
      }}
    >
      {icon || (
        <div className={classes.roundBackground}>
          <CheckOutlined className={classes.icon} />
        </div>
      )}
      <ListItemText id={labelId} primary={title()} />
    </ListItem>
  );
};

const Status = styled.span<{ status: string; noBg?: boolean }>`
  ${({ status }) => {
    const statusType = status?.toLowerCase();
    if (statusType === "approved") {
      return `
      background:#eefbe5;
      color:${Green}
      `;
    }
    if (statusType === "rejected") {
      return `
      background:#ffe9e9;
      color:#ff281b
      `;
    }
    if (statusType === "submitted") {
      return `
      background:#c6fbff;
      color:#31a0b7
      `;
    }
    if (
      statusType === "upload pending" ||
      statusType === "pending" ||
      statusType === "uploaded"
    ) {
      return `
      background:#fcefd0;
      color:#af7300
      `;
    }
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
  margin-left: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;
const CircleIconContainer = styled("div")<{ disabled?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 2px solid green;
  margin-right: 10px;
  cursor: pointer;
  ${({ disabled }) =>
    disabled &&
    `
  pointer-events:none!important;
  color:#a8b2b5!important;
  border-color:#a8b2b5!important
  `}
`;
export const MainContainer = styled(Container)`
  background-color: #ffffff;
  padding: 24px;
  margin: 1rem 0;
  border-radius: 5px;
`;

const InnerContainer = styled(Container)`
  background-color: #faeeda;
  padding: 16px;
  margin-top: 16px;
  display: flex !important;
  justify-content: space-between;
  align-items: center;
`;

const UploadedFileViewContainer = styled(Container)`
  background-color: #f5f5f5;
  padding: 1px 16px;
  display: flex !important;
  align-items: center;
  justify-content: space-between;
  margin-top: 1.5rem;
  border-left: 5px solid ${Green};
  & > span {
    word-break: break-all;
  }
`;

const ActionContainer = styled(Container)`
  padding: 10px;
  text-align: right;
  color: ${Green};
  display: flex !important;
  align-items: flex-end;
  margin-left: auto;
  justify-content: end;
`;

const FileUploadContainer = styled(Container)<{ disabled?: boolean }>`
  display: flex;
  align-items: center;
  margin-top: 16px;
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
