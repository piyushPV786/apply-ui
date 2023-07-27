import { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { StyledLabel } from "../common/common";
import StyledButton from "../button/button";
import {
  deepClone,
  formDirtyState,
  formOptions,
  isInvalidFileType,
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
import { List } from "@material-ui/core";

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
const mbaProgramDocuments: any = [
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
  { text: "Upload a color scan of the original document." },
  //{ text: "Document must be clear visible" },  
  // {
  //   text: "Do not upload black & white scans",
  //   icon: (
  //     <div
  //       style={{
  //         backgroundColor: "#ffe9e9",
  //         borderRadius: "50%",
  //         padding: "1px",
  //         marginRight: "3px",
  //       }}
  //     >
  //       <CloseOutlined color="error" />
  //     </div>
  //   ),
  // },
];

interface IDocumentUploadProps {
  allFields: any;
  isValidDocument: boolean;
  isApplicationEnrolled: boolean;
  selectedPrograms: IOption;
  isLoading?: boolean;
  documentType: IOption[];
  leadId: string;
  onUpload?: (file: File | File[]) => void;
  onRemove?: (index: number) => void;
  onSubmit: () => void;
  onSaveDraft: (formValue: ILeadFormValues, isDraft?: boolean) => void;
}

const mapStatusToFormData = (response, formData) => {
  if (response && response?.length > 0) {
    for (const item of response) {
      const matchingFormData = formData?.find((formDataItem) => {
        if (
          formDataItem.id === "nationalIdPassport" &&
          item.documentTypeCode === "IDPASSPORT"
        ) {
          return formDataItem;
        } else return formDataItem.id === item.documentTypeCode;
      });

      if (matchingFormData) {
        const status = item?.status?.replace("SALES_", "");

        if (status === "PENDING") {
          matchingFormData.draftSaveDoc = item;
          continue;
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
};

const mergeDraftSaveDoc = (newDocs, existedDocs) => {
  const mergedDocs = newDocs.map((newDoc) => {
    const matchedDoc = existedDocs.find(
      (existedDoc) => existedDoc.id === newDoc.id
    );
    if (matchedDoc) {
      return {
        ...newDoc,
        draftSaveDoc: matchedDoc.draftSaveDoc,
      };
    }
    return newDoc;
  });

  return mergedDocs;
};

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
const requiredDocs = [
  "declarationForm",
  "nationalIdPassport",
  "highestQualification",
  "matricCertificate",
  "detailCV",
];
const mbaDocs = ["motivationLetter", "interviewNotes"];
const DocumentUploadForm = ({
  allFields,
  documentType,
  leadId,
  isApplicationEnrolled,
  onSaveDraft,
  onSubmit,
  selectedPrograms,
}: IDocumentUploadProps) => {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext();
  const [documentFormDataDetail, setDocumentFormDataDetail] = useState<
    typeof documentUploadFormData
  >(documentUploadFormData);
  const [uploadDocs, setUploadDocs] = useState<
    (File & { error: boolean; typeCode: string; id: string })[]
  >([]);
  const [remainingDocs, setRemainingDocs] = useState<string[]>(requiredDocs);
  const documentDetails = allFields?.document?.documentDetails || [];
  const isMBAProgram =
    allFields?.education?.programCode === "MBA-PROG" ||
    allFields?.education?.programCode === "MBA";

  const isPostGraduation = selectedPrograms?.category; 

  useEffect(() => {
    if (documentDetails?.length > 0) {
      const mappedDocs = mapStatusToFormData(
        documentDetails,
        documentUploadFormData
      );
      if (mappedDocs?.length > 0) {
        const existedDocuments = mappedDocs
          ?.filter((docs) => Boolean(docs?.draftSaveDoc))
          .map(({ documentTypeCode, fileExtension, ...rest }) => ({
            ...rest,
            type: rest?.draftSaveDoc?.fileExtension,
            typeCode: rest?.draftSaveDoc?.documentTypeCode,
            name: rest?.draftSaveDoc?.name,
          }));
        const remainDocs = remainingDocs?.filter(
          (doc) =>
            !existedDocuments?.find((document) => document?.typeCode === doc)
        );
        setRemainingDocs(remainDocs?.filter(Boolean));
        setUploadDocs([...existedDocuments]);
        setValue("document.uploadedDocs", existedDocuments);
      }
      setDocumentFormDataDetail(
        mapStatusToFormData(documentDetails, documentUploadFormData)
      );
    }
  }, [isMBAProgram]);

  const documentFormFields = allFields?.document;
  const documentFieldErrors = errors?.document as any;

  const documentTypeList = documentType?.filter(
    (item) => item?.code !== "PAYMENTPROOF"
  );

  const documentStatusDetail = deepClone(documentFormDataDetail);

  const deleteDocs = (index: number, file: File & { typeCode: string }) => {
    const remainingDocs = [
      ...uploadDocs.filter((item, idx) => item?.typeCode !== file?.typeCode),
    ];
    setRemainingDocs((prevState) => [...prevState, file?.typeCode]);
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
    const remainingDocuments = isPostGraduation
      ? remainingDocs?.filter((doc) => !doc?.includes("detailCV"))
      : remainingDocs;
    const remainDocs = remainingDocuments?.filter(
      (doc) => !allFiles?.find((document) => document?.typeCode === doc)
    );
    setRemainingDocs(remainDocs?.filter(Boolean));
    setValue("document.uploadedDocs", allFiles);
  };
  const NationalityPassportFields = () => {
    return (
      <div className="row mt-4">
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
  const documentFormData = isMBAProgram
    ? [...(documentFormDataDetail || []), ...mbaProgramDocuments]
    : documentFormDataDetail;

  const uploadedDocuments = mergeDraftSaveDoc(
    mapStatusToFormData(documentDetails, documentFormData),
    uploadDocs
  );
  const allRequiredDocuments = isMBAProgram
    ? [...remainingDocs, ...mbaDocs]?.filter(
        (remainDoc) =>
          !uploadDocs?.find((doc) =>
            doc?.name?.toLowerCase()?.includes(remainDoc?.toLowerCase())
          )
      )
    : [...remainingDocs]?.filter(
        (remainDoc) =>
          !uploadDocs?.find((doc) =>
            doc?.name?.toLowerCase()?.includes(remainDoc?.toLowerCase())
          )
      );
  const documentsNeedTOBeUpload = isPostGraduation
    ? allRequiredDocuments
        ?.filter(Boolean)
        ?.filter((item) => !item?.includes("detailCV"))
        ?.filter((doc) => uploadDocs?.find((item) => item?.name?.includes(doc)))
    : allRequiredDocuments
        ?.filter(Boolean)
        ?.filter((doc) =>
          uploadDocs?.find((item) => item?.name?.includes(doc))
        );

  // console.log({
  //   remainingDocs,
  //   uploadDocs,
  //   allRequiredDocuments,
  //   documentsNeedTOBeUpload,
  //   isPostGraduation,
  // });

  return (
    <div className="row mx-3 document-container">
      <div className="col-md-9">
        {uploadedDocuments?.map(
          ({
            name,
            disabled,
            status,
            id,
            isDeclaration = false,
            draftSaveDoc = null,
          }) => {
            const customFileds = id?.includes("nationalIdPassport") ? (
              <NationalityPassportFields />
            ) : null;
            return (
              <DocumentUploadContainer
                key={`${name}_${id}`}
                title={name}
                selectedDocuments={
                  draftSaveDoc ? [draftSaveDoc] : (null as any)
                }
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
      <div className="col-md-3">
        <div className="sticky-wrapper">

        <MainContainer className="mt-0 card-shadow">
          <div className="d-flex justify-content-center flex-column">
            <StyledButton
              isGreenWhiteCombination
              className="mb-2"   
              title="Save as Draft"
              onClick={onSaveDraft}
            />
            <StyledButton
              disabled={remainingDocs?.length > 0}
              onClick={() => {
                setUploadDocs([]);
                setDocumentFormDataDetail([]);
                onSubmit();
              }}
              title="Submit Documents"
            />
          </div>
        </MainContainer>

        <MainContainer className="sidebar-widget card-shadow">
          <div className="d-flex flex-column">
            <Typography textAlign="left" component="header">
              Document Status
            </Typography>

            <List>
            {mapStatusDocument(documentStatusDetail).map(({ name, status }) => (
              <TickWithText 
              className=""
                key={name}
                status={status?.toLowerCase()}
                text={name}
              />
            ))}
            </List>
          </div>
        </MainContainer>
        <MainContainer className="sidebar-widget doc-criteria card-shadow">
          <div className="d-flex flex-column py-1">
            <Typography textAlign="left" component="header">
              Document Acceptance Criteria
            </Typography>
          
            <List>
            {documentCriteria.map(({ text, icon, isInnerText }: any) => (
              <TickWithText
                key={text}
                text={text}
                icon={icon}
                isInnerText={isInnerText}
                required={false}
              />
            ))}
              </List>
          </div>
        </MainContainer>
        </div>
      </div>
    </div>
  );
};

export default DocumentUploadForm;
