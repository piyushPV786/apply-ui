import React, { useState, useRef, useEffect } from "react";
import { MainContainer, PaymentContainer } from "../payment/payment";
import { useFormContext } from "react-hook-form";
import DoneIcon from "@material-ui/icons/Done";
import styled from "styled-components";
import { DefaultGrey, Green, GreenFormHeading } from "../common/common";
import StyledButton from "../button/button";
import { useRouter } from "next/router";
import { isInvalidFileType, uniqueArrayOfObject } from "../../Util/Util";
interface IDocumentUploadProps {
  allFields: any;
  isValidDocument: boolean;
}
const imgUrl = "/assets/images";

const DocumentUploadForm = ({
  allFields,
  isValidDocument,
}: IDocumentUploadProps) => {
  const fileUploadRef = useRef<any>(null);

  const { register, setValue } = useFormContext();

  const [uploadDocs, setUploadDocs] = useState<(File & { error: boolean })[]>(
    []
  );

  useEffect(() => {
    const existingPaymentProof = allFields?.payment?.paymentProof;
    const allUploadedFiles = uniqueArrayOfObject(
      [...uploadDocs, existingPaymentProof],
      "size"
    );
    setValue("document.uploadedDocs", allUploadedFiles);
    setUploadDocs(allUploadedFiles);
  }, []);

  const onDocUploadClick = () => {
    const fileElement = fileUploadRef.current?.childNodes[1] as any;
    fileElement?.click() as any;
  };

  const deleteDocs = (index: number) => {
    const remainingDocs = [...uploadDocs.filter((item, idx) => idx !== index)];
    setValue("document.uploadedDocs", remainingDocs);
    setUploadDocs(remainingDocs);
  };

  const uploadDocuments = (files: any) => {
    const uploadedFiles = files;
    uploadedFiles.forEach((item: any) => {
      item.error = isInvalidFileType(item.type);
    });
    setUploadDocs(uploadedFiles);
    setValue("document.uploadedDocs", uploadedFiles);
  };
  return (
    <>
      <div className="row w-100">
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
                      <div className="mt-1">
                        <img
                          width="100px"
                          src={`${imgUrl}/upload-svgrepo-com.svg`}
                        />
                      </div>
                      <input
                        className="d-none"
                        accept="image/jpeg, application/pdf"
                        type="file"
                        {...(register("document.uploadedDocs", {
                          required: true,
                        }) as any)}
                        onChange={(e) => {
                          if (e?.target) {
                            const files = [...uploadDocs, e.target?.files![0]];
                            uploadDocuments(files);
                          }
                        }}
                      />
                      <GreenFormHeading className=" mt-1 fs-3 text">
                        Drag and Drop files to upload
                      </GreenFormHeading>
                      <strong className="mt-1 fs-4">or</strong>
                      <div>
                        <StyledButton
                          className="mt-2"
                          title="Browse"
                          roundBtn
                          onClick={onDocUploadClick}
                        />
                        <p className="fs-5" style={{ color: `#838383` }}>
                          Supported files, PDF, PNG, JPEG, JPG{" "}
                        </p>
                      </div>
                    </StyledUploadDocumentContainer>
                  </CustomContainer>
                </div>
                <div className="col-md-7">
                  <UploadedFilesContainer>
                    <h4 className="fw-bold">Uploaded Files</h4>
                    <div>
                      <ul className="list-group mt-2">
                        {uploadDocs &&
                          uploadDocs.length > 0 &&
                          uploadDocs.map((item, index) => {
                            const imgType = item?.type
                              ?.toLowerCase()
                              .includes("pdf")
                              ? "pdf-svgrepo-com.svg"
                              : "png-svgrepo-com.svg";
                            return (
                              <>
                                <li
                                  key={index}
                                  style={{
                                    color: item?.error ? "red" : "#212529",
                                  }}
                                  className=" d-flex justify-content-space-around list-group-item border-0 fw-bold p-0 mt-4"
                                >
                                  <div className="w-75">
                                    {" "}
                                    <img
                                      className="me-2"
                                      src={`${imgUrl}/${imgType}`}
                                    />{" "}
                                    {item?.name}{" "}
                                    {item?.error && "( Invalid file format )"}
                                    <a
                                      href={item?.name}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="cursor-pointer"
                                    ></a>
                                  </div>
                                  <div>
                                    {" "}
                                    {!item.error && (
                                      <img
                                        className="me-2 ms-2 "
                                        src={`${imgUrl}/view-svgrepo-com.svg`}
                                        width="25px"
                                      />
                                    )}
                                    <span
                                      onClick={() => deleteDocs(index)}
                                      className="cursor-pointer"
                                    >
                                      <img
                                        className="me-2 ms-2 "
                                        src={`${imgUrl}/trash-svgrepo-com.svg`}
                                        width="25px"
                                      />
                                    </span>
                                  </div>
                                </li>
                              </>
                            );
                          })}
                      </ul>
                    </div>
                  </UploadedFilesContainer>
                  {!isValidDocument && (
                    <h3 style={{ color: "red" }} className="fs-4  mt-5">
                      Please remove invalid files
                    </h3>
                  )}
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
                        <p>Document should be in good condition</p><br/>
                        <p>Face must clear visible</p>
                      </div>
                      <ImageContainer>
                        <div className="w-100">
                          <img
                            className="mb-2"
                            width={"40px"}
                            src={`${imgUrl}/file-upload-svgrepo-com.svg`}
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
  max-width: 400px;
  cursor: pointer;
  background-color: ${DefaultGrey};
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
