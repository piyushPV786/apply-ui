import { useState, useEffect } from "react";
import { PaymentContainer } from "../payment/payment";
import { useFormContext } from "react-hook-form";
import styled from "styled-components";
import { Green, StyledLabel } from "../common/common";
import StyledButton from "../button/button";
import {
  formDirtyState,
  formOptions,
  isInvalidFileType,
  uniqueArrayOfObject,
} from "../../Util/Util";

import { ILeadFormValues, IOption } from "../common/types";
import DocumentUploadContainer, {
  MainContainer,
  TickWithText,
} from "../document/DocumentUploadContainer";
import { Typography } from "@mui/material";
import AdvanceDropDown from "../dropdown/Dropdown";
import { identificationDocumentTypeKey } from "./personalInfoForm";
import { CloseOutlined } from "@material-ui/icons";

const documentUploadFormData = [
  {
    name: "Declaration form",
    id: "declarationForm",
    disabled: false,
    status: "Upload Pending",
    isDeclaration: true,
  },
  {
    name: "National ID/Passport",
    id: "nationalIdPassport",
    disabled: false,
    status: "Upload Pending",
  },
  {
    name: "Highest Qualification",
    id: "highestQualification",
    disabled: false,
    status: "Upload Pending",
  },
  {
    name: "Matric Certificate or Equivalent",
    id: "matricCertificate",
    disabled: false,
    status: "Upload Pending",
  },
  {
    name: "Detailed CV",
    id: "detailCV",
    disabled: false,
    status: "Upload Pending",
  },
];
const mbaProgramDocuments = [
  {
    name: "Motivation Letter",
    id: "motivationLetter",
    disabled: false,
    status: "upload pending",
  },
  {
    name: "Interview Notes",
    id: "interviewNotes",
    disabled: false,
    status: "upload pending",
  },
];

const documentCriteria = [
  {
    text: `File accepted: <strong>JPEG/JPG/PNG, PDF (Max size: 2MB)</stroong>`,
    isInnerText: true,
  },
  {
    text: `ID should be at least valid for <strong>6 months.</strong>`,
    isInnerText: true,
  },
  { text: "Document must be clear visible" },
  { text: "Upload a color scan of the original document." },
  {
    text: "Do not upload black & white scans",
    icon: (
      <div
        style={{
          backgroundColor: "#ffe9e9",
          borderRadius: "50%",
          padding: "1px",
          marginRight: "3px",
        }}
      >
        <CloseOutlined color="error" />
      </div>
    ),
  },
];

interface IDocumentUploadProps {
  allFields: any;
  isValidDocument: boolean;
  isApplicationEnrolled: boolean;
  isLoading?: boolean;
  documentType: IOption[];
  leadId: string;
  onUpload?: (file: File | File[]) => void;
  onRemove?: (index: number) => void;
  onSubmit: (formValue: ILeadFormValues) => void;
  onSaveDraft: (formValue: ILeadFormValues, isDraft?: boolean) => void;
}
function mapStatusToFormData(response, formData) {
  if (response?.length > 0) {
    for (const item of response) {
      const matchingFormData = formData.find(
        (formDataItem) => formDataItem.id === item.documentTypeCode
      );
      if (matchingFormData) {
        const status = item?.status?.replace("SALES_", "");

        if (status === "PENDING") {
          return;
        }
        if (status === "REJECT") {
          matchingFormData.status = "Rejected";
        }
        if (status === "APPROVED") {
          matchingFormData.status = "Approved";
        }
      }
    }
    return formData;
  } else return formData;
}

const mapStatusDocument = (documentData) => {
  if (documentData?.length > 0) {
    for (const item of documentData) {
      const { status = "" } = { ...item };
      const documentStatus = status?.toLowerCase();
      if (documentStatus?.includes("pending")) {
        item.status = "Pending";
      }
      if (documentStatus?.includes("sales_rejected")) {
        item.status = "Rejected";
      }
      if (documentStatus?.includes("approved")) {
        item.status = "Approved";
      }
    }
    return documentData;
  } else return documentData;
};
const DocumentUploadForm = ({
  allFields,
  documentType,
  leadId,
  isApplicationEnrolled,
  onSaveDraft,
  onSubmit,
}: IDocumentUploadProps) => {
  const [documentFormDataDetail, setDocumentFormDataDetail] = useState<
    typeof documentUploadFormData
  >(documentUploadFormData);
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext();
  const documentDetails = allFields?.document?.documentDetails || [];
  const isMBAProgram = allFields?.education?.programCode === "MBA-PROG";
  useEffect(() => {
    if (documentDetails?.length > 0) {
      setDocumentFormDataDetail(
        mapStatusToFormData(documentDetails, documentUploadFormData)
      );
    }
    if (isMBAProgram) {
      setDocumentFormDataDetail((prevState) => [
        ...prevState,
        ...mbaProgramDocuments,
      ]);
    }
  }, [isMBAProgram]);
  const documentFormFields = allFields?.document;
  const documentFieldErrors = errors?.document as any;
  const [uploadDocs, setUploadDocs] = useState<
    (File & { error: boolean; typeCode: string })[]
  >([]);
  const isDocumentRequired = allFields?.document?.documentDetails?.length === 0;

  // const documentTypeList = isApplicationEnrolled
  //   ? [...(documentType || [])]?.filter((doc) => doc.code === "PAYMENTPROOF")
  //   : [...(documentType || []), ...[{ name: "Other", code: "other" }]]?.filter(
  //       (doc) => doc.code !== "PAYMENTPROOF"
  //     );
  const documentTypeList = documentType?.filter(
    (item) => item?.code !== "PAYMENTPROOF"
  );
  const documentIds = documentUploadFormData?.map((document) => document.id);
  const areAllDocumentsUploaded = documentIds.every((id) =>
    uploadDocs.some((doc) => doc.typeCode === id)
  );

  const documentStatusDetail = JSON.parse(
    JSON.stringify(documentFormDataDetail)
  );

  useEffect(() => {
    const existingPaymentProof = allFields?.payment?.paymentProof;
    if (existingPaymentProof && existingPaymentProof.length > 0) {
      existingPaymentProof?.forEach((element) => {
        element.typeCode = "PAYMENTPROOF";
      });

      const allUploadedFiles = uniqueArrayOfObject(
        [...uploadDocs, ...existingPaymentProof],
        "size"
      );
      setValue("document.uploadedDocs", allUploadedFiles, formOptions);
      setUploadDocs(allUploadedFiles);
    }
  }, [leadId]);

  useEffect(() => {
    if (isDocumentRequired) {
      setDocumentFormDataDetail(
        documentUploadFormData.map(({ status, ...rest }) => ({
          ...rest,
          status: "Upload Pending",
        }))
      );
    }
  }, []);

  const deleteDocs = (index: number, file: File & { typeCode: string }) => {
    const remainingDocs = [
      ...uploadDocs.filter((item, idx) => item?.typeCode !== file?.typeCode),
    ];
    setValue("document.uploadedDocs", remainingDocs, formOptions);
    setUploadDocs(remainingDocs);
  };

  const uploadDocuments = (files: any) => {
    const uploadedFiles = files;

    uploadedFiles.forEach((item: any) => {
      item.error = isInvalidFileType(item.type);
      if (!item?.typeCode && isApplicationEnrolled) {
        item.typeCode = "BURSARYLETTER";
      }
      if (!item?.typeCode && !isApplicationEnrolled) {
        item.typeCode = "other";
      }
    });
    setUploadDocs((prevState) => [...prevState, ...(uploadedFiles as any)]);
    const allFiles = [...uploadDocs, ...uploadedFiles];
    setValue("document.uploadedDocs", allFiles);
  };

  const NationalityPassportFields = () => {
    return (
      <div className="row mt-2">
        <div className="col-md-6">
          <div className="mb-4">
            <AdvanceDropDown
              onChange={(e) =>
                setValue(
                  "document.identificationDocumentType",
                  e?.target?.value,
                  formDirtyState
                )
              }
              value={documentFormFields?.identificationDocumentType}
              required
              options={documentTypeList}
              name={identificationDocumentTypeKey}
              register={register}
              label="Identification Document Type"
            />
            {documentFieldErrors?.identificationDocumentType && (
              <div className="invalid-feedback">
                Please select Identification Document Type
              </div>
            )}
          </div>
        </div>
        <div className="col-md-4">
          <div className="mb-4">
            <StyledLabel required>Others ( Please Specify )</StyledLabel>
            <input
              value={documentFormFields?.other}
              defaultValue={documentFormFields?.other}
              {...register("document.other", {
                required: true,
              })}
              type="text"
              className="form-control"
              id="otherText"
            />

            {documentFieldErrors?.identificationDocumentType && (
              <div className="invalid-feedback">
                Please select Identification Document Type
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="row mx-3 document-container">
      <div className="col-md-8">
        {documentFormDataDetail?.map(
          ({ name, disabled, status, id, isDeclaration = false }) => {
            const customFileds = id?.includes("nationalIdPassport") ? (
              <NationalityPassportFields />
            ) : null;
            return (
              <DocumentUploadContainer
                key={`${name}_${id}`}
                title={name}
                status={status}
                isDeclaration={isDeclaration}
                disabled={disabled}
                onUpload={uploadDocuments}
                onRemove={deleteDocs as any}
                documentType={id}
                customComponent={customFileds}
              />
            );
          }
        )}
      </div>
      <div className="col-md-4">
        <MainContainer>
          <div className="d-flex flex-column">
            <StyledButton
              isGreenWhiteCombination
              className="my-2"
              title="Save as Draft"
              onClick={onSaveDraft}
            />
            <StyledButton
              disabled={!areAllDocumentsUploaded}
              onClick={onSubmit}
              title="Submit Documents"
            />
          </div>
        </MainContainer>

        <MainContainer className="px-1">
          <div className="d-flex flex-column">
            <Typography textAlign="left" component="header" fontWeight="bold">
              Document Status
            </Typography>
            {mapStatusDocument(documentStatusDetail).map(({ name, status }) => (
              <TickWithText
                key={name}
                status={status?.toLowerCase()}
                text={name}
              />
            ))}
          </div>
        </MainContainer>
        <MainContainer className="px-1">
          <div className="d-flex flex-column py-1">
            <Typography textAlign="left" component="header" fontWeight="bold">
              Document Criteria
            </Typography>
            <Typography color="black" textAlign="left" component="caption">
              Documents not following the below guidelines will not be accepted
              and you will be asked to submit the documents again
            </Typography>
            {documentCriteria.map(({ text, icon, isInnerText }: any) => (
              <TickWithText
                key={text}
                text={text}
                icon={icon}
                isInnerText={isInnerText}
                required={false}
              />
            ))}
          </div>
        </MainContainer>
      </div>
    </div>
  );
};

export default DocumentUploadForm;
const DocumentCriteriaContainer = styled.div`
  background: #dde1e3;
  padding: 1rem;
`;
const StyleHeading = styled.div``;
const PaymentHeading = styled(PaymentContainer)`
  border-bottom: 2px solid ${Green};
  padding: 1rem 10px;
`;

const StyledUploadDocumentContainer = styled.div`
  text-align: center;
`;
const CustomContainer = styled.div`
  padding: 1.5rem;
  max-width: 350px;
  cursor: pointer;
  background-color: #f5f5f5;
  width: 100%;
  background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='green' stroke-width='4' stroke-dasharray='6%2c 14' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e");
`;

const UploadedFilesContainer = styled.div``;

const ImageContainer = styled.div`
  background: white;
  display: flex;
  padding: 0.5rem;
  max-width: 160px;
  width: 100%;
  text-align: center;
  justify-content: center;
  align-items: center;
  max-width: 160px;
  border: 2px solid ${Green};
`;
