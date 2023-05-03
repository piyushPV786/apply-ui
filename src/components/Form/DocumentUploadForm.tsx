import React, { useState, useRef, useEffect, SyntheticEvent } from "react";
import { MainContainer, PaymentContainer } from "../payment/payment";
import { useFormContext } from "react-hook-form";
import DoneIcon from "@material-ui/icons/Done";
import styled from "styled-components";
import { Green, GreenFormHeading } from "../common/common";
import StyledButton from "../button/button";
import {
  formOptions,
  isInvalidFileType,
  uniqueArrayOfObject,
} from "../../Util/Util";
import Link from "next/link";
import Image from "next/image";
import UploadImg from "../../../public/assets/images/upload-svgrepo-com.svg";
import ViewIcon from "../../../public/assets/images/view-svgrepo-com.svg";
import TrashIcon from "../../../public/assets/images/trash-svgrepo-com.svg";
import FileUpload from "../../../public/assets/images/file-upload-svgrepo-com.svg";
import { IOption } from "../common/types";

interface IDocumentUploadProps {
  allFields: any;
  isValidDocument: boolean;
  isApplicationEnrolled: boolean;
  isLoading?: boolean;
  documentType: IOption[];
  leadId: string;
}
const imgUrl = "/assets/images";

const DocumentUploadForm = ({
  allFields,
  isValidDocument,
  documentType,
  leadId,
  isApplicationEnrolled,
}: IDocumentUploadProps) => {
  const fileUploadRef = useRef<any>(null);
  const { register, setValue } = useFormContext();
  const [uploadDocs, setUploadDocs] = useState<
    (File & { error: boolean; typeCode: string })[]
  >([]);
  const isDocumentRequired = allFields?.document?.uploadedDocs?.length === 0;
  const documentTypeList = !isApplicationEnrolled
    ? [...(documentType || []), ...[{ name: "Other", code: "other" }]]?.filter(
        (doc) => doc.code !== "BURSARYLETTER"
      )
    : [...(documentType || [])]?.filter((doc) => doc.code === "BURSARYLETTER");
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

  const onDocUploadClick = () => {
    const fileElement = fileUploadRef.current?.childNodes[1] as any;
    fileElement?.click() as any;
  };
  const deleteDocs = (index: number) => {
    const remainingDocs = [...uploadDocs.filter((item, idx) => idx !== index)];
    setValue("document.uploadedDocs", remainingDocs, formOptions);
    setUploadDocs(remainingDocs);
    allFields.document.uploadedDocs = remainingDocs;
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
    setUploadDocs(uploadedFiles as any);
    setValue("document.uploadedDocs", uploadedFiles);
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

  return (
    <>
      <div className="row document-container">
        <div className="col-12 col-md-12 mb-3">
          <MainContainer>
            {" "}
            <PaymentHeading>
              <div className="col-md-12">
                <StyleHeading>
                  <GreenFormHeading style={{ fontSize: "20px" }}>
                    Required Documents
                  </GreenFormHeading>
                </StyleHeading>
              </div>
            </PaymentHeading>
            <PaymentContainer>
              <div className="row">
                <div className="col-md-5">
                  <CustomContainer>
                    <StyledUploadDocumentContainer ref={fileUploadRef}>
                      <div className="mt-1 upload-icon">
                        <Image width="100" src={UploadImg} alt="uplopad-svg" />
                      </div>
                      <input
                        className="d-none"
                        accept="image/jpeg, application/pdf"
                        type="file"
                        {...(register("document.uploadedDocs", {
                          required: isDocumentRequired,
                        }) as any)}
                        onChange={(e) => {
                          if (e?.target) {
                            const files = [...uploadDocs, e.target?.files![0]];
                            uploadDocuments(files);
                          }
                        }}
                      />
                      <GreenFormHeading className="mt-1 text">
                        Drag and drop, or browse your files
                      </GreenFormHeading>
                      <strong className="mt-1 fs-6">or</strong>
                      <div>
                        <StyledButton
                          className="mt-2"
                          title="Browse"
                          roundBtn
                          onClick={onDocUploadClick}
                        />
                        <p
                          className="grey-text mt-2"
                          style={{ color: `#838383` }}
                        >
                          Only PNG, JPEG and PDF files with max size of 2MB{" "}
                        </p>
                      </div>
                    </StyledUploadDocumentContainer>
                  </CustomContainer>
                </div>
                <div className="col-md-7">
                  <UploadedFilesContainer>
                    <h5 className="fw-bold mb-3 font-roboto">Uploaded Files</h5>

                    <table className="table table-striped doc-table">
                      <thead>
                        <tr>
                          <th scope="col">File Name</th>
                          <th scope="col">File Type</th>
                          <th scope="col" className="text-center">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {uploadDocs?.map((item, index) => (
                          <tr>
                            <td>
                              <div className="w-75">
                                <img
                                  className="me-2"
                                  src={`${imgUrl}/${imageType(item?.type)}`}
                                />
                                {item?.name}{" "}
                                {item?.error && (
                                  <span style={{ color: "red" }}>
                                    ( Invalid file format )
                                  </span>
                                )}
                              </div>
                            </td>
                            <td
                              className={
                                item?.typeCode === "PAYMENTPROOF"
                                  ? "disabled"
                                  : ""
                              }
                            >
                              {" "}
                              <select
                                className="form-select"
                                onChange={(e) =>
                                  e?.target?.value &&
                                  onFileTypeSelect(e?.target?.value, index)
                                }
                              >
                                {documentTypeList?.map((item) => (
                                  <>
                                    <option value={""}>
                                      Select Document Type
                                    </option>
                                    <option
                                      selected={
                                        item?.code ===
                                        uploadDocs[index]?.typeCode
                                      }
                                      key={item.code}
                                      value={item?.code}
                                    >
                                      {item?.name}
                                    </option>
                                  </>
                                ))}
                              </select>
                            </td>
                            <td className="text-center">
                              <div>
                                {!item.error && (
                                  <Link
                                    passHref
                                    onClick={(e) => showPdf(e, item)}
                                    rel="noopener noreferrer"
                                    target="_blank"
                                    href={""}
                                  >
                                    <Image
                                      className="me-2 ms-2 "
                                      src={ViewIcon}
                                      alt={"ViewIcon"}
                                      width="25"
                                    />
                                  </Link>
                                )}
                                <span
                                  onClick={() => deleteDocs(index)}
                                  className={"cursor-pointer"}
                                >
                                  <Image
                                    className="me-2 ms-2"
                                    src={TrashIcon}
                                    alt={"TrashIcon"}
                                    width="20"
                                  />
                                </span>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </UploadedFilesContainer>
                </div>
              </div>
            </PaymentContainer>
            <div style={{ margin: "1rem" }}>
              <DocumentCriteriaContainer>
                <div className="row">
                  <GreenFormHeading className="fs-5 m-2">
                    Document Criteria
                  </GreenFormHeading>
                  <div className="col-md-5 col-lg-5">
                    <p>
                      <span className="me-2">
                        <DoneIcon />
                      </span>
                      File accepted JPEG/JPG/PNG,PDF <br />
                      <span style={{ marginLeft: "30px" }}>
                        (Max size :2MB)
                      </span>
                    </p>
                    <p>
                      <span className="me-2">
                        <DoneIcon />
                      </span>
                      ID should valid atleast for months
                    </p>
                  </div>

                  <div className="col-md-7 col-lg-7">
                    <div className="d-flex justify-content-around">
                      <div>
                        <p>Document should be in good condition</p>
                        <br />
                        <p>Face must clear visible</p>
                      </div>
                      <ImageContainer>
                        <div className="w-100">
                          <Image
                            className="mb-2"
                            width={"40"}
                            src={FileUpload}
                            alt={"file-upload"}
                          />
                          <p className="">Sample Document</p>
                          <GreenFormHeading>
                            <a style={{ color: `${Green}` }} href="#">
                              View
                            </a>
                          </GreenFormHeading>
                        </div>
                      </ImageContainer>
                    </div>
                  </div>
                </div>
              </DocumentCriteriaContainer>
            </div>
          </MainContainer>
        </div>
      </div>
    </>
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
