import React, { useState, useRef } from "react";
import styled from "styled-components";
import {
  DefaultGrey,
  Green,
  GreenFormHeading,
  GreenText,
  StyledLabel,
} from "../common/common";
import CloseIcon from "@material-ui/icons/CloseOutlined";
import { useFormContext } from "react-hook-form";
import { IOption } from "../common/types";
import PaymentOption from "./payment-options";
import StyledButton from "../button/button";
import {
  getUploadDocumentUrl,
  isInvalidFileType,
  uploadDocuments,
} from "../../Util/Util";
import FIleUploadImg from "../../../public/assets/images/file-upload-svgrepo-com.svg";
import Image from "next/image";
import DeleteIcon from "@material-ui/icons/DeleteOutline";

const Payment = (props: any) => {
  const fileUploadRef = useRef<any>(null);
  const { watch, register, setValue } = useFormContext();
  const [paymentDocs, setPaymentDocs] = useState<(File & { error: boolean })[]>(
    []
  );
  const [promoCode, setPromoCode] = useState<string>("");
  const [showPromoCode, setShowPromoCOde] = useState<boolean>(false);
  const [isPaymentDocSubmit, setPaymentDocSubmit] = useState<boolean>(false);
  const allFields = watch();
  const selectedProgram: string =
    props?.programs &&
    props.programs?.find(
      (item: IOption) => item?.code == allFields?.education?.programCode
    )?.name;
  const selectedStudyMode: string = allFields?.education?.studyModeCode;
  const programFee: string = allFields?.education?.studyModeDetail?.fee;

  const isInvalidFiles = paymentDocs.some((file: any) => file.error) as any;
  const onDocUploadClick = () => {
    const fileElement = fileUploadRef.current?.childNodes[1] as any;
    fileElement.click() as any;
  };

  const uploadPaymentDocument = (fileUrl: string, file: File) => {
    return uploadDocuments(fileUrl, file)
      .then((res) => {
        props.showToast(true, "Document Upload Successfully");
        return res;
      })
      .catch((err) => {
        props.showToast(false, err.message);

        console.log(err.message);
      });
  };
  const submitPaymentDocs = () => {
    let count = 0;
    setPaymentDocSubmit(true);
    paymentDocs.forEach((file) => {
      const payload = {
        documentTypeCode: "PAYMENTPROOF",
        fileName: file.name,
        fileType: file.type,
        amount: 12,
        paymentModeCode: "OFFLINE",
      };
      getUploadDocumentUrl(payload).then((res) => {
        if (res.status === 200) {
          count = count + 1;
          // uploadPaymentDocument(res, file);
        } else {
          props.showToast(false, res.response.data.message);
          console.log(res.response.data.messag);
          setPaymentDocSubmit(false);
        }
      });
    });
    if (count === paymentDocs.length) {
      setPaymentDocSubmit(false);
      props?.navigateNext();
    }
  };
  const onPaymentDocumentUpload = (files: any) => {
    const uploadedFiles = files;
    uploadedFiles.forEach((item: any) => {
      item.error = isInvalidFileType(item.type);
    });
    setPaymentDocs(uploadedFiles);
    setValue("payment.paymentProof", uploadedFiles);
  };
  const deleteFile = (index: number) => {
    setPaymentDocs([...paymentDocs.filter((_, idx) => idx !== index)]);
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
                    Order Summary
                  </GreenFormHeading>
                </StyleHeading>
              </div>
            </PaymentHeading>
            <PaymentContainer>
              <div className="row">
                <div className="col-md-7">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-4">
                        <StyledLabel style={{ fontSize: "16px" }}>
                          Proposal Qualification
                        </StyledLabel>
                        <div>
                          <strong>{selectedProgram}</strong>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-4">
                        <StyledLabel style={{ fontSize: "16px" }}>
                          Study Mode
                        </StyledLabel>
                        <div>
                          <strong>{selectedStudyMode}</strong>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-4 w-75">
                        <StyledLabel required style={{ fontSize: "16px" }}>
                          Currency Selection
                        </StyledLabel>
                        <select
                          className="form-select"
                          {...register(`payment.currency`, { required: true })}
                        >
                          {[] &&
                            [{ id: 21, currency: "Rs" }].map(
                              ({ id, currency }) => (
                                <option
                                  selected={id === allFields?.payment?.currency}
                                  key={id}
                                  value={Number(id)}
                                >
                                  {currency}
                                </option>
                              )
                            )}
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-4">
                        <StyledLabel style={{ fontSize: "16px" }}>
                          Application Fee
                        </StyledLabel>
                        <div>
                          <strong>INR {programFee}</strong>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-5">
                  <div className="">
                    <div
                      style={{ background: "#f5f5f5", minHeight: "110px" }}
                      className="w-100 p-2"
                    >
                      <div className="mb-4 d-flex justify-content-between">
                        <div>
                          <h6>Subtotal (INR)</h6>
                        </div>
                        <div>
                          {" "}
                          <h6>INR {allFields?.studyModeDetail?.fees}</h6>
                        </div>
                      </div>
                      <div className="text-center">
                        <a
                          onClick={() => setShowPromoCOde(!showPromoCode)}
                          href="#"
                          className="w-100 text-dark"
                        >
                          Have a promo code?
                        </a>
                      </div>
                      {showPromoCode && (
                        <div className="w-100 text-center ps-4 pe-4">
                          <div className="input-group mb-2 mt-4">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter promo code"
                              onChange={(e) => setPromoCode(e?.target?.value)}
                            />
                            <div className="input-group-append cursor-pointer">
                              <span
                                style={{
                                  background:
                                    !promoCode || promoCode?.length === 0
                                      ? `${DefaultGrey}`
                                      : `${Green}`,
                                  padding: "0.47rem 0.75rem",
                                }}
                                className="input-group-text"
                                id="basic-addon2"
                              >
                                Apply
                              </span>
                            </div>
                            <GreenText
                              onClick={() => setShowPromoCOde(!showPromoCode)}
                              className="ms-2 fs-6 d-flex align-items-center justify-content-center"
                            >
                              <CloseIcon />
                            </GreenText>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </PaymentContainer>
          </MainContainer>
        </div>
        <div className="col-md-6">
          <PaymentOption navigateNext={props?.navigateNext} />
        </div>
        <div className="col-md-1">
          <StyledDiv>Or</StyledDiv>
        </div>
        <div className="col-md-5">
          <MainContainer>
            <PaymentHeading>
              <div className="col-md-12">
                <StyleHeading>
                  <GreenFormHeading style={{ fontSize: "20px" }}>
                    Upload Document
                  </GreenFormHeading>
                </StyleHeading>
              </div>
            </PaymentHeading>
            <PaymentContainer>
              <div className="d-flex justify-content-center">
                <div className="">
                  <UploadPaymentDocsContainer onClick={onDocUploadClick}>
                    <div ref={fileUploadRef} className="text-center">
                      <Image
                        src={FIleUploadImg}
                        width="35"
                        alt="file-upload-svgrepo"
                      />
                      <input
                        className="d-none"
                        accept="image/jpeg, application/pdf"
                        type="file"
                        {...(register("payment.paymentProof", {
                          required: true,
                        }) as any)}
                        onChange={(e) => {
                          if (e?.target) {
                            const files = [...paymentDocs, e.target?.files![0]];
                            onPaymentDocumentUpload(files);
                          }
                        }}
                      />
                      <GreenFormHeading>Upload Payment Proof</GreenFormHeading>
                      <div
                        onClick={(e) => e.stopPropagation()}
                        className="d-flex flex-wrap"
                      >
                        {paymentDocs &&
                          paymentDocs.map((file, idx) => (
                            <span
                              style={{
                                color: file?.error ? "red" : "#000",
                                wordBreak: "break-all",
                              }}
                              className="w-100"
                              key={file.lastModified}
                            >
                              {file?.name}{" "}
                              <DeleteIcon onClick={() => deleteFile(idx)} />
                            </span>
                          ))}
                      </div>
                      {paymentDocs.length > 0 && isInvalidFiles && (
                        <div className="invalid-feedback">
                          Only "PDF" or "JPEG" file can be upload.
                        </div>
                      )}
                    </div>
                  </UploadPaymentDocsContainer>
                </div>
              </div>
            </PaymentContainer>
            <div className="container">
              <div className="row">
                <div className="col align-self-center text-center ">
                  <StyledButton
                    disabled={
                      isInvalidFiles ||
                      paymentDocs.length === 0 ||
                      isPaymentDocSubmit
                    }
                    onClick={() => submitPaymentDocs()}
                    title="Submit"
                  />
                </div>
              </div>
            </div>
          </MainContainer>
        </div>
      </div>
    </>
  );
};

export default Payment;

export const MainContainer = styled.div`
  background: #fff;
  width: 100%;
  margin: 1rem 0;
  height: 100%;
`;

export const PaymentContainer = styled.div`
  width: 100%;
  padding: 1rem 10px;
`;

const PaymentHeading = styled(PaymentContainer)`
  border-bottom: 2px solid ${Green};
  padding: 1rem 10px;
`;
const StyleHeading = styled.div``;
const StyledDiv = styled.div`
  width: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  position: relative;
  top: 50%;
  color: ${Green};
  font-size: 18px;
  font-weight: bolder;
`;

const UploadPaymentDocsContainer = styled.div`
  background: ${DefaultGrey};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  min-width: 400px;
  min-height: 150px;
  padding: 1rem;
  max-width: 400px;
  overflow: hidden;
  @media (max-width: 900px) {
    padding: 1rem 4.7rem;
  }
`;
