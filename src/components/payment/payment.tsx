import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import {
  DefaultGrey,
  Green,
  GreenFormHeading,
  StyledLabel,
} from "../common/common";
import { useFormContext } from "react-hook-form";
import { IFee, IOption } from "../common/types";
import PaymentOption from "./payment-options";
import StyledButton from "../button/button";
import {
  applyDiscountCode,
  getApplicationCode,
  getQualificationStudyModeData,
  getUploadDocumentUrl,
  isInvalidFileType,
  uploadDocuments,
} from "../../Util/Util";
import FIleUploadImg from "../../../public/assets/images/file-upload-svgrepo-com.svg";
import Image from "next/image";
import DeleteIcon from "@material-ui/icons/DeleteOutline";
import { GreenText } from "../student/style";
import { CommonEnums } from "../common/constant";
import CircleTick from "../../../public/assets/images/circle-tick.svg";
const Currency = [
  {
    countryId: 1,
    label: "South Africa",
    value: "sa",
    currency: "sa",
    symbol: "R",
  },
  {
    countryId: 2,
    label: "India",
    value: "ind",
    currency: "inr",
    symbol: "₹",
  },
  {
    countryId: 3,
    label: "Nigeria",
    value: "ng",
    currency: "ng",
    symbol: "₦",
  },
];
const Payment = (props: any) => {
  const fileUploadRef = useRef<any>(null);
  const { watch, register, setValue } = useFormContext();
  const [paymentDocs, setPaymentDocs] = useState<(File & { error: boolean })[]>(
    []
  );
  const [feeOptions, setFeeOptions] = useState<IFee[]>([]);
  const [promoCode, setPromoCode] = useState<string>("");
  const [isManagementPromoCode, setManagementPromoCode] =
    useState<boolean>(false);
  const [showPromoCode, setShowPromoCOde] = useState<boolean>(false);
  const [isPaymentDocSubmit, setPaymentDocSubmit] = useState<boolean>(false);
  const allFields = watch();
  const selectedProgram =
    props?.programs &&
    props.programs?.find(
      (item: IOption) => item?.code == allFields?.education?.programCode
    );
  const selectedStudyMode: string = allFields?.education?.studyModeCode;
  const programFee: string = allFields?.education?.applicationFees || "0";

  const isInvalidFiles = paymentDocs.some((file: any) => file.error) as any;
  const onDocUploadClick = () => {
    const fileElement = fileUploadRef.current?.childNodes[1] as any;
    fileElement.click() as any;
  };
  const discountAmount = allFields?.payment?.discountAmount
    ? parseInt(allFields?.payment?.discountAmount)
    : 0;

  useEffect(() => {
    const programDetails =
      JSON.parse(sessionStorage.getItem("activeLeadDetail")!)
        ?.educationDetail || null;
    if (selectedProgram && programDetails) {
      (async () => {
        const selectedProgramCode = await getQualificationStudyModeData(
          programDetails?.programCode
        );
        setFeeOptions(
          selectedProgramCode[0]?.studyModes.find(
            (item) => item.studyModeCode === selectedStudyMode
          )?.fees
        );
        const applicationDetail = selectedProgramCode[0]?.studyModes?.find(
          (item) => item?.studyModeCode === "APPLICATION"
        );
        setValue("education.applicationFees", applicationDetail?.fees[0]?.fee);
      })();
    }
  }, [selectedProgram]);

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
  const submitPaymentDocs = async () => {
    let count = 0;
    setPaymentDocSubmit(true);
    await Promise.all(
      paymentDocs.map((file) => {
        const payload = {
          documentTypeCode: "PAYMENTPROOF",
          fileName: file.name,
          fileType: file.type,
          amount:
            parseInt(programFee) -
            parseInt(allFields?.payment?.discountAmount || 0),
          paymentModeCode: "OFFLINE",
          discountCode: allFields?.payment?.discountCode,
          discountAmount: allFields?.payment?.discountAmount,
          studentTypeCode: allFields?.education?.studentTypeCode,
        };
        return getUploadDocumentUrl(payload).then((res) => {
          if (res?.statusCode === 201) {
            count = count + 1;
            uploadPaymentDocument(res?.data, file);
          } else {
            props.showToast(false, res?.response?.data?.message);
            setPaymentDocSubmit(false);
          }
        });
      })
    )
      .then(() => {
        if (count === paymentDocs.length) {
          setPaymentDocSubmit(false);
          props?.navigateNext();
        }
      })
      .catch((err) => {
        setPaymentDocSubmit(false);
        props.showToast(false, "Something went wrong");
        console.log(err);
      });
  };
  const onPaymentDocumentUpload = (files: any) => {
    const uploadedFiles = files;
    uploadedFiles.forEach((item: any) => {
      item.error = isInvalidFileType(item.type);
    });
    setPaymentDocs(uploadedFiles);
    setValue("payment.paymentProof", uploadedFiles);
  };
  const applyDiscount = async () => {
    const appCode = getApplicationCode();
    const result: any = await applyDiscountCode(
      appCode,
      promoCode,
      allFields?.education?.studentTypeCode
    );
    if (
      result?.statusCode === 200 &&
      (result?.data?.status === "APP-ENROLED" ||
        result?.data?.status === CommonEnums.APP_ENROLLED_STATUS) &&
      allFields?.education?.studentTypeCode?.toLowerCase() ===
        CommonEnums.MANAGEMENT
    ) {
      setManagementPromoCode(true);
      setValue("payment.discountCode", promoCode);
      setValue("payment.discountAmount", (+programFee * 100) / 100);
      setValue("payment.discountedFee", "0.00");
      props.showToast(true, "Management Code Applied");
    } else if (result?.statusCode === 200 && result?.data?.percent) {
      const { agentCode, percent, discountCode } = result?.data;
      setValue("payment.agentCode", agentCode);
      setValue("payment.discountCode", discountCode);
      setValue("payment.percent", percent);
      setValue("payment.discountAmount", (+programFee * percent) / 100);
      props.showToast(true, result?.message);
    } else {
      props.showToast(false, "Invalid Code");
    }
  };

  const deleteFile = (index: number) => {
    setPaymentDocs([...paymentDocs.filter((_, idx) => idx !== index)]);
  };

  return (
    <>
      <div className="payment-conatiner">
        <div className="row">
          <div className="col-12 col-md-12 mb-5">
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
                <div className="row p-4">
                  <div className="col-md-8">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-4">
                          <StyledLabel style={{ fontSize: "16px" }}>
                            Proposal Qualification
                          </StyledLabel>
                          <div>
                            <strong>{selectedProgram?.name}</strong>
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

                      <div className="col-md-6">
                        <div className="mb-4 ">
                          {feeOptions.length > 0 &&
                            feeOptions.map(({ fee, feeMode }, index) => (
                              <div className="form-check form-check-inline">
                                <>
                                  <input
                                    key={index}
                                    className="form-check-input me-2"
                                    type="radio"
                                    {...(register(`payment.selectedFeeMode`, {
                                      required: true,
                                    }) as any)}
                                    onChange={() => {
                                      setValue(
                                        "payment.selectedFeeMode",
                                        feeMode
                                      );
                                      setValue(
                                        "payment.selectedFeeModeFee",
                                        fee
                                      );
                                    }}
                                    value={feeMode}
                                    checked={
                                      feeMode ==
                                      allFields?.payment?.selectedFeeMode
                                    }
                                  />
                                  <label className="form-check-label">
                                    {feeMode}
                                    <br />
                                    <GreenText>{fee}</GreenText>
                                  </label>
                                </>
                              </div>
                            ))}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-4 w-75">
                          <StyledLabel required style={{ fontSize: "16px" }}>
                            Currency Selection
                          </StyledLabel>
                          <select
                            className="form-select"
                            {...register(`payment.currency`, {
                              required: true,
                            })}
                          >
                            {Currency &&
                              Currency.map(
                                ({ currency, label, symbol, value }) => (
                                  <option
                                    selected={
                                      symbol === allFields?.payment?.currency
                                    }
                                    key={symbol}
                                    value={symbol}
                                  >
                                    {symbol}
                                  </option>
                                )
                              )}
                          </select>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-4">
                          <StyledLabel style={{ fontSize: "16px" }}>
                            Programme Fee
                          </StyledLabel>
                          <div>
                            <strong>
                              {allFields?.payment?.currency || "INR"}{" "}
                              {programFee}
                            </strong>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="w-100 p-4 promo-card">
                      <div className="mb-4 d-flex justify-content-between">
                        <div>
                          <h6>
                            Subtotal ({allFields?.payment?.currency || "INR"})
                          </h6>
                        </div>
                        <div>
                          {" "}
                          <h6>
                            Total Application{" "}
                            {allFields?.payment?.currency || "INR"} -{" "}
                            {isManagementPromoCode
                              ? allFields?.payment?.discountedFee
                              : programFee}
                          </h6>
                          {!isManagementPromoCode && (
                            <>
                              <h6>
                                Discount {allFields?.payment?.currency || "INR"}{" "}
                                - {allFields?.payment?.discountAmount}
                              </h6>
                              <h6>
                                Total Amount -
                                {parseInt(programFee) - discountAmount}
                              </h6>
                            </>
                          )}
                        </div>
                      </div>
                      {!isManagementPromoCode && (
                        <>
                          <div className="text-center show-promo-code">
                            <a
                              onClick={() => setShowPromoCOde(!showPromoCode)}
                              href="#"
                              className="w-100 text-dark"
                            >
                              Have a promo code?
                            </a>
                          </div>

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
                                  onClick={applyDiscount}
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
                            </div>
                          </div>
                        </>
                      )}
                      {isManagementPromoCode && (
                        <div className="w-100 text-center ps-4 pe-4">
                          <div>
                            <p className="fw-bold">
                              Promo Code: <strong>{promoCode} </strong>
                              <GreenText className="cursor-pointer">
                                {" "}
                                <DeleteIcon
                                  onClick={() => {
                                    setManagementPromoCode(false);
                                    setPromoCode("");
                                    setValue("payment.discountedFee", "0.00");
                                    setValue("payment.discountAmount", "0.00");
                                  }}
                                />
                              </GreenText>
                            </p>
                          </div>
                          <GreenText>
                            <Image
                              className="me-2"
                              src={CircleTick}
                              alt="circle"
                            />
                            You have saved {discountAmount} on this application
                          </GreenText>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </PaymentContainer>
            </MainContainer>
          </div>
          {!props?.isManagementStudentType && (
            <>
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
                          Upload Payment Proof
                        </GreenFormHeading>
                      </StyleHeading>
                    </div>
                  </PaymentHeading>
                  <PaymentContainer>
                    <div className="d-flex justify-content-center w-100">
                      <div className="">
                        <UploadPaymentDocsContainer
                          onClick={onDocUploadClick}
                          className="w-100"
                        >
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
                                  const files = [
                                    ...paymentDocs,
                                    e.target?.files![0],
                                  ];
                                  onPaymentDocumentUpload(files);
                                }
                              }}
                            />
                            <GreenFormHeading>
                              Drag and drop, or browse your files
                            </GreenFormHeading>
                            <p className="grey-text">
                              Only PNG, JPEG and PDF files with max size of 2MB
                            </p>
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
                                    <DeleteIcon
                                      onClick={() => deleteFile(idx)}
                                    />
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
            </>
          )}
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
  padding: 1.5rem;
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
  background: #f5f5f5;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  min-width: 400px;
  min-height: 150px;
  padding: 1rem;
  width: 100%;
  overflow: hidden;
  border: 2px dashed #008554;
  @media (max-width: 900px) {
    padding: 1rem 4.7rem;
  }
`;
