import React, { useRef, useState, SyntheticEvent } from "react";
import styled from "styled-components";
import { Container, Typography, Button } from "@mui/material";
import StyledButton from "../button/button";
import { Green } from "../common/common";
import { AlertEnums } from "../common/constant";
import AlertBox from "../alert/Alert";
import { isInvalidFileType } from "../../Util/Util";
import { GreenText } from "../student/style";
import { CloseOutlined, VisibilityOutlined } from "@material-ui/icons";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";

interface DocumentUploadContainerProps {
  title: string;
  status: string;
  declarationButtonText: string;
  fileUploadButtonText: string;
  reasonText?: string;
  isDeclaration?: boolean;
  customComponent?:
    | React.ReactComponentElement<any>
    | React.ReactNode
    | ReactJSXElement;
  onUpload?: (file: File | File[]) => void;
  onRemove?: (index: number) => void;
}
const showPdf = (e: SyntheticEvent, item: File) => {
  e.preventDefault();
  const file = new Blob([item], {
    type: item?.type.includes("pdf") ? "application/pdf" : "image/jpeg",
  });
  const fileURL = URL.createObjectURL(file);
  window.open(fileURL);
};
const DocumentUploadContainer: React.FC<DocumentUploadContainerProps> = ({
  title = "Declaration form",
  status = "Approved",
  declarationButtonText = "Download Declaration form",
  fileUploadButtonText = "Browse",
  isDeclaration = false,
  reasonText = "The document is not clear, Please reupload and submit the document again",
  onUpload,
  onRemove,
  customComponent,
}) => {
  const [uploadDocs, setUploadDocs] = useState<
    (File & { error: boolean; typeCode: string })[]
  >([]);
  const fileUploadRef = useRef<any>(null);
  const onDocUploadClick = () => {
    const fileElement = fileUploadRef.current?.childNodes[0] as any;
    fileElement?.click() as any;
  };

  const statusType = status?.toLowerCase();

  const isApproved = statusType?.includes("submitted");
  const isSubmitted = statusType?.includes("approved");

  const uploadDocuments = (files: any) => {
    const uploadedFiles = files;
    uploadedFiles.forEach((item: any) => {
      item.error = isInvalidFileType(item.type);
    });
    setUploadDocs(uploadedFiles as any);
    onUpload && onUpload(files);
  };
  const onRemoveDoc = (index: number) => {
    const remainingDocs = [...uploadDocs.filter((item, idx) => idx !== index)];
    setUploadDocs(remainingDocs);
    onRemove && onRemove(index);
  };
  return (
    <MainContainer>
      <Typography textAlign="left" component="header" fontWeight="bold">
        {title}
        <Status status={status}>{status}</Status>
      </Typography>

      {isDeclaration && (
        <InnerContainer>
          <Typography variant="body1">
            Please download the declaration form, print, fill it out and upload
            it here
          </Typography>
          <StyledButton
            title={declarationButtonText}
            isGreenWhiteCombination
            isDownloadBtn
          />
        </InnerContainer>
      )}
      {status?.toLowerCase()?.includes("rejected") && (
        <>
          <AlertBox
            style={{ width: "100%", maxWidth: "unset" }}
            severity={AlertEnums.DANGER}
          >
            {reasonText}
          </AlertBox>
        </>
      )}
      {customComponent || null}
      <FileUploadContainer style={{ border: "1px dotted" }}>
        <div className="d-flex align-items-center" ref={fileUploadRef}>
          <input
            className="d-none"
            accept="image/jpeg, application/pdf"
            type="file"
            onChange={(e) => {
              if (e?.target) {
                const files = [...uploadDocs, e.target?.files![0]];
                uploadDocuments(files);
              }
            }}
          />
          <div>
            <StyledButton
              title="Browse"
              style={{ width: "100px" }}
              onClick={onDocUploadClick}
            />
          </div>
        </div>
        <Typography variant="body1">
          Drop files here or click browse through your machine
        </Typography>
      </FileUploadContainer>
      {uploadDocs &&
        uploadDocs?.length > 0 &&
        uploadDocs?.map((file, index) => (
          <UploadedFileViewContainer>
            <GreenText>{file?.name}</GreenText>
            <ActionContainer>
              <CircleIconContainer onClick={(e) => showPdf(e, file)}>
                {" "}
                <VisibilityOutlined />
              </CircleIconContainer>
              <CircleIconContainer
                onClick={() => onRemoveDoc(index)}
                style={{ borderColor: "red", color: "red" }}
                disabled={isApproved || isSubmitted}
              >
                <CloseOutlined />
              </CircleIconContainer>
            </ActionContainer>
          </UploadedFileViewContainer>
        ))}
    </MainContainer>
  );
};

export default DocumentUploadContainer;

const ActionContainer = styled(Container)`
  padding: 10px;
  text-align: right;
  color: ${Green};
`;

const MainContainer = styled(Container)`
  background-color: #ffffff;
  padding: 24px;
  margin: 2rem 0;
  border-radius: 5px;
`;

const InnerContainer = styled(Container)`
  background-color: #faeeda;
  padding: 16px;
  margin-top: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const UploadedFileViewContainer = styled(Container)`
  background-color: #f5f5f5;
  padding: 1px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 1.5rem;
  border-left: 7px solid ${Green};
  align-items: center;
`;

const Status = styled.span<{ status: string }>`
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
    if (statusType === "upload pending") {
      return `
      background:#fcefd0;
      color:#d8a035
      `;
    }
  }};

  padding: 4px 10px;
  border-radius: 4px;
  margin-left: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;
const CircleIconContainer = styled("div")<{ disabled?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
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
