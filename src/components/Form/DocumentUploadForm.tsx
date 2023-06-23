import { useState, useRef, useEffect, SyntheticEvent } from "react";
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

const documentUploadFormData = [
  {
    name: "Declaration form",
    id: "declarationForm",
    disabled: false,
    status: "upload pending",
    isDeclaration: true,
  },
  {
    name: "National ID/Passport",
    id: "nationalIdPassport",
    disabled: false,
    status: "upload pending",
  },
  {
    name: "Highest Qualification",
    id: "highestQualification",
    disabled: false,
    status: "upload pending",
  },
  {
    name: "Matric Certificate or Equivalent",
    id: "matricCertificate",
    disabled: false,
    status: "upload pending",
  },
  {
    name: "Detailed CV",
    id: "detailCV",
    disabled: false,
    status: "upload pending",
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
const imgUrl = "/assets/images";

const DocumentUploadForm = ({
  allFields,
  isValidDocument,
  documentType,
  leadId,
  isApplicationEnrolled,
  onSaveDraft,
  onSubmit,
}: IDocumentUploadProps) => {
  const [documentFormDataDetail, setDocumentFormDataDetail] = useState<
    typeof documentUploadFormData
  >(documentUploadFormData);
  const fileUploadRef = useRef<any>(null);
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext();
  const documentFormFields = allFields?.document;
  const documentFieldErrors = errors?.document as any;
  const [uploadDocs, setUploadDocs] = useState<
    (File & { error: boolean; typeCode: string })[]
  >([]);
  const isDocumentRequired = allFields?.document?.documentDetails?.length === 0;

  const documentTypeList = isApplicationEnrolled
    ? [...(documentType || [])]?.filter((doc) => doc.code === "PAYMENTPROOF")
    : [...(documentType || []), ...[{ name: "Other", code: "other" }]]?.filter(
        (doc) => doc.code !== "PAYMENTPROOF"
      );
  const documentIds = documentUploadFormData?.map((document) => document.id);
  const areAllDocumentsUploaded = documentIds.every((id) =>
    uploadDocs.some((doc) => doc.typeCode === id)
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

  const onDocUploadClick = () => {
    const fileElement = fileUploadRef.current?.childNodes[1] as any;
    fileElement?.click() as any;
  };
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

  const showPdf = (e: SyntheticEvent, item: File) => {
    e.preventDefault();
    const file = new Blob([item], {
      type: item?.type.includes("pdf") ? "application/pdf" : "image/jpeg",
    });
    const fileURL = URL.createObjectURL(file);
    window.open(fileURL);
  };

  const imageType = (type: string) => {
    let data = "png-svgrepo-com.svg";
    if (type?.toLowerCase().includes("pdf")) {
      data = "pdf-svgrepo-com.svg";
    }
    return data;
  };
  const onFileTypeSelect = (value: string, index: number) => {
    const allFiles: any = [...uploadDocs];
    allFiles[index].typeCode = value;
    setValue("document.uploadedDocs", allFiles, formOptions);
  };

  const NationalityPassportFields = () => {
    return (
      <div className="row mt-2">
        <div className="col-md-6">
          <div className="mb-4">
            <AdvanceDropDown
              onChange={(e) =>
                setValue(
                  identificationDocumentTypeKey,
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
        {documentFormDataDetail.map(
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
            {documentFormDataDetail.map(({ name, status }) => (
              <TickWithText
                key={name}
                status={status?.toLowerCase()}
                text={name}
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
