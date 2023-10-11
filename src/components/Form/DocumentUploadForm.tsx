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
import { List } from "@material-ui/core";

import { ILeadFormValues, IOption } from "../common/types";
import DocumentUploadContainer, {
  MainContainer,
  TickWithText,
} from "../document/DocumentUploadContainer";
import { Typography } from "@mui/material";

import { GraduationType } from "../common/constant";

const documentCriteria = [
  {
    text: `File accepted: <strong>JPEG/JPG/PNG, PDF (Max size: 2MB)</strong>`,
    isInnerText: true,
  },
  {
    text: `ID should be at least valid for <strong>6 months.</strong>`,
    isInnerText: true,
  },
  { text: "Upload a color scan of the original document." },
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
  documentData: {
    id: string;
    name: string;
    disabled: boolean;
    status: string;
  }[];
}

const mapStatusToFormData = (response, formData) => {
  if (response && response?.length > 0) {
    for (const item of response) {
      const matchingFormData = formData?.find((formDataItem) => {
        if (
          formDataItem.id === "IDPASSPORT" &&
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
  "DECLARATIONFORM",
  "IDPASSPORT",
  "HIGHESTQUALIFICATION",
  "MATRIC",
  "RESUMECV",
];
const mbaDocs = ["MOTIVATIONLETTER", "INTERVIEWNOTES"];
const DocumentUploadForm = ({
  allFields,
  documentType,
  leadId,
  isApplicationEnrolled,
  onSaveDraft,
  onSubmit,
  selectedPrograms,
  documentData,
}: IDocumentUploadProps) => {
  const {
    register,
    setValue,
    trigger,
    watch,
    formState: { errors },
  } = useFormContext();
  const [documentFormDataDetail, setDocumentFormDataDetail] =
    useState<typeof documentData>(documentData);
  const [uploadDocs, setUploadDocs] = useState<
    (File & { error: boolean; typeCode: string; id: string })[]
  >([]);
  const [remainingDocs, setRemainingDocs] = useState<string[]>(requiredDocs);
  const documentDetails = allFields?.document?.documentDetails || [];
  const isMBAProgram =
    allFields?.education?.programCode === "MBA-Prog" ||
    allFields?.education?.programCode === "MBA";
  const isPostGraduation = selectedPrograms?.category === GraduationType.PG; /// upload CV in the upload document section mandatory for Post Graduate Programs and Non mandatory for Under Graduate Programs.
  useEffect(() => {
    if (documentDetails?.length > 0) {
      const mappedDocs = mapStatusToFormData(documentDetails, documentData);
      if (mappedDocs?.length > 0) {
        const existedDocuments = mappedDocs
          ?.filter((docs) => Boolean(docs?.draftSaveDoc))
          .map(({ documentTypeCode, fileExtension, ...rest }) => ({
            ...rest,
            type: rest?.draftSaveDoc?.fileExtension,
            typeCode: rest?.draftSaveDoc?.documentTypeCode,
            name: rest?.draftSaveDoc?.name,
            status: "Uploaded",
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
        mapStatusToFormData(documentDetails, documentData)
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
      item.isUploadedNow = true;
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
    const remainingDocuments = !isPostGraduation
      ? remainingDocs?.filter((doc) => !doc?.includes("detailCV"))
      : remainingDocs;
    const remainDocs = remainingDocuments?.filter(
      (doc) => !allFiles?.find((document) => document?.typeCode === doc)
    );
    setRemainingDocs(remainDocs?.filter(Boolean));
    setValue("document.uploadedDocs", allFiles);
  };

  const documentFormData = isMBAProgram
    ? documentFormDataDetail
    : documentFormDataDetail.filter((item) => {
        return !mbaDocs.includes(item.id);
      });

  const uploadedDocuments = mergeDraftSaveDoc(
    mapStatusToFormData(documentDetails, documentFormData),
    deepClone(uploadDocs)
  );
  const allRequiredDocuments = isMBAProgram
    ? [...remainingDocs, ...mbaDocs]?.filter(
        (remainDoc) =>
          !uploadDocs?.find((doc) =>
            doc?.name?.toLowerCase()?.includes(remainDoc?.toLowerCase())
          )
      )
    : [...remainingDocs]?.filter((remainDoc) => {
        !uploadDocs?.find((doc) =>
          doc?.name?.toLowerCase()?.includes(remainDoc?.toLowerCase())
        );
      });
  const documentsNeedTOBeUpload = allRequiredDocuments
    ?.filter(Boolean)
    ?.filter((doc) => uploadDocs?.find((item) => item?.name?.includes(doc)));

  const requireDocs = !isPostGraduation
    ? [...documentsNeedTOBeUpload, ...remainingDocs]?.filter(
        (doc) => !doc?.includes("detailCV")
      )
    : [...documentsNeedTOBeUpload, ...remainingDocs];

  return (
    <div className="row document-container">
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
            const newDocumentAdded: any = [...(uploadDocs as any)]?.find(
              (doc) => {
                if (doc?.isUploadedNow && doc?.typeCode === id) return doc;
                else return null;
              }
            );

            const newDocStatus =
              newDocumentAdded?.isUploadedNow || draftSaveDoc
                ? "Uploaded"
                : false;

            return (
              <DocumentUploadContainer
                key={`${name}_${id}`}
                title={name}
                selectedDocuments={
                  draftSaveDoc ? [draftSaveDoc] : (null as any)
                }
                status={newDocStatus || status}
                isDeclaration={isDeclaration}
                disabled={disabled}
                onUpload={uploadDocuments}
                onRemove={deleteDocs as any}
                documentType={id}
                isOptional={!isPostGraduation}
                documentFormFields={documentFormFields}
                register={register}
                setValue={setValue}
                documentTypeList={documentTypeList}
                id={id}
                watch={watch}
                documentFieldErrors={documentFieldErrors}
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
                disabled={requireDocs?.length > 0}
                onClick={async () => {
                  trigger();

                  if (await trigger()) {
                    setUploadDocs([]);
                    setDocumentFormDataDetail([]);
                    onSubmit();
                  }
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
                {mapStatusDocument(documentStatusDetail).map(
                  ({ name, status, id, draftSaveDoc }) => {
                    const newDocumentAdded: any = [
                      ...(uploadDocs as any),
                    ]?.find((doc) => {
                      if (doc?.isUploadedNow && doc?.typeCode === id)
                        return doc;
                      else return null;
                    });
                    const newDocStatus =
                      newDocumentAdded?.isUploadedNow || draftSaveDoc
                        ? "Uploaded"
                        : false;
                    const docListStatus = newDocStatus || status;
                    return (
                      <TickWithText
                        key={name}
                        status={docListStatus?.toLowerCase()}
                        text={name}
                      />
                    );
                  }
                )}
              </List>
            </div>
          </MainContainer>
          <MainContainer className="sidebar-widget doc-criteria card-shadow">
            <div className="d-flex flex-column py-1">
              <Typography textAlign="left" component="header" fontWeight="bold">
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
