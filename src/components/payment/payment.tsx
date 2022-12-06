import React, { useState, useEffect, useRef } from "react";
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
import { HighestQualificationElement, Mode } from "../common/types";
import PaymentOption from "./payment-options";
import StyledButton from "../button/button";
import { useRouter } from "next/router";
import { isInvalidFileType } from "../../Util/Util";
import FIleUploadImg from '../../../public/assets/images/file-upload-svgrepo-com.svg';
import Image from "next/image";

const Payment = (props: any) => {
  const fileUploadRef = useRef<any>(null);
  const { watch, register, setValue } = useFormContext();
  const [paymentDocs, setPaymentDocs] = useState<File>();
  const [promoCode, setPromoCode] = useState<string>("");
  const [showPromoCode, setShowPromoCOde] = useState<boolean>(false);
  const [fileError, setFileError] = useState<boolean>(false);
  const [isPaymentDocSubmit, setPaymentDocSubmit] = useState<boolean>(false);
  const allFields = watch();
  const selectedQualification: string =
    props?.qualifications &&
    props.qualifications?.find(
      (item: HighestQualificationElement) =>
        item?.id == allFields?.interestedQualificationId
    )?.qualification;
  const selectedStudyMode: string =
    props?.studyMode &&
    props.studyMode?.find((item: Mode) => item?.id == allFields?.studyMode)
      ?.qualification;

  const onDocUploadClick = () => {
    const fileElement = fileUploadRef.current?.childNodes[1] as any;
    fileElement.click() as any;
  };
  const submitPaymentDocs = () => {
    // router.push({
    //   pathname: "/student-registration-form/student-payment-docs-success",
    //   query: { success: false },
    // });
    props?.navigateNext();
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
                          <strong>{selectedQualification}</strong>
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
                          <strong>INR 2100.00</strong>
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
                          <h6>INR 2100.00</h6>
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
                            const files = e.target?.files![0];
                            if (isInvalidFileType(files.type)) {
                              setFileError(true);
                            } else {
                              setFileError(false);
                            }
                            setPaymentDocs(files);
                            setValue("payment.paymentProof", files);
                          }
                        }}
                      />
                      <GreenFormHeading>Upload Payment Proof</GreenFormHeading>
                      {paymentDocs && <span>{paymentDocs?.name}</span>}
                      {paymentDocs && fileError && (
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
                    disabled={fileError || !paymentDocs}
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
  width: 100%;
  height: 100%;
  background: ${DefaultGrey};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  padding: 1rem 7.7rem;
  @media (max-width: 900px) {
    padding: 1rem 4.7rem;
  }
`;
