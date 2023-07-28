import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import {
  DefaultGrey,
  Green,
  GreenFormHeading,
  LoaderComponent,
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
  isInvalidFileType,
  sortAscending,
  uploadDocuments,
} from "../../Util/Util";
import FIleUploadImg from "../../../public/assets/images/file-upload-svgrepo-com.svg";
import Image from "next/image";
import DeleteIcon from "@material-ui/icons/DeleteOutline";
import { GreenText } from "../student/style";
import { CommonApi, CommonEnums, FeemodeCode } from "../common/constant";
import CircleTick from "../../../public/assets/images/circle-tick.svg";
import { FinanceApi } from "../../service/Axios";
import { Button } from "@material-ui/core";

const getConvertedProgramFees = (conversionRate: number | null, programFee) => {
  return conversionRate ? programFee * conversionRate : programFee;
};

const Payment = (props: any) => {
  const fileUploadRef = useRef<any>(null);
  const { watch, register, setValue } = useFormContext();
  const [paymentDocs, setPaymentDocs] = useState<(File & { error: boolean })[]>(
    []
  );
  const [loadng, setLoading] = useState(false);
  const [feeOptions, setFeeOptions] = useState<IFee[]>([]);
  const [promoCode, setPromoCode] = useState<string>("");
  const [isManagementPromoCode, setManagementPromoCode] =
    useState<boolean>(false);
  const [showPromoCode, setShowPromoCOde] = useState<boolean>(false);
  const [isCouponApplied, setCouponApplied] = useState<boolean>(false);
  const [isPaymentDocSubmit, setPaymentDocSubmit] = useState<boolean>(false);
  const allFields = watch();
  const selectedProgram =
    props?.programs?.length &&
    props.programs?.find(
      (item: IOption) => item?.code == allFields?.education?.programCode
    );
  const isApplicationEnrolled = props?.isApplicationEnrolled;
  const selectedStudyMode: string = allFields?.education?.studyModeCode;
  const programFee: string = isApplicationEnrolled
    ? allFields?.payment?.selectedFeeModeFee || 0
    : allFields?.education?.applicationFees || "0";
  const isInvalidFiles = paymentDocs.some(
    (file: any) => file.size < 2000000
  ) as boolean;

  const isInvalidFilesType = paymentDocs.some(
    (file: any) => file.error
  ) as Boolean;
  const onDocUploadClick = () => {
    const fileElement = fileUploadRef.current?.childNodes[1] as any;
    fileElement.click() as any;
  };

  const normalDiscountAmount = allFields?.payment?.discountAmount || 0;
  const discountAmount = allFields?.payment?.conversionRate
    ? Number(normalDiscountAmount) * (+allFields?.payment?.conversionRate || 0)
    : normalDiscountAmount;
  const selectedNationality = allFields?.address[0]?.country;
  const selectedCurrency = selectedNationality?.includes("SA")
    ? CommonEnums?.SOUTH_AFRICA_CURRENCY
    : allFields?.payment?.selectedCurrency;

  const conversionRate = allFields?.payment?.conversionRate;
  const discountPercentage = allFields?.payment?.percent || null;
  const convertedProgramFee =
    selectedNationality == "US" ||
    selectedNationality == "KY" ||
    selectedNationality == "IND" ||
    selectedNationality == "SA" ||
    selectedNationality == "NIG"
      ? String(
          +programFee * (+allFields?.payment?.conversionRate || 1) || programFee
        )
      : +programFee * (+allFields?.payment?.conversionRate || 1);
  const rmatFeeAmount =
    selectedNationality?.includes("SA") || selectedCurrency?.includes("RAND")
      ? 250
      : 250 * Number(allFields?.payment?.conversionRate);
  const rmatFee = !isApplicationEnrolled ? rmatFeeAmount : 0;
  const totalAmount = +convertedProgramFee - +discountAmount + rmatFee;

  useEffect(() => {
    (async () => {
      const selectedProgramCode = await getQualificationStudyModeData(
        allFields?.education?.programCode
      );

      setFeeOptions(
        selectedProgramCode[0]?.studyModes
          .find(
            (item) => item.studyModeCode === allFields?.education?.studyModeCode
          )
          ?.fees.filter((item) => {
            return item.feeMode != "APPLICATION";
          })
      );

      let applicationDetail = selectedProgramCode[0]?.studyModes?.find(
        (item) => item.studyModeCode === allFields?.education?.studyModeCode
      );
      applicationDetail = applicationDetail?.fees.find(
        (item) => item.feeMode == FeemodeCode.APPLICATION
      );

      setValue("education.applicationFees", applicationDetail?.fee);
    })();

    selectedNationality && getCurrencyConversion();
  }, [selectedProgram]);

  const getCurrencyConversion = () => {
    FinanceApi.get(`${CommonApi.GETCURRENCYCONVERSION}${selectedNationality}`)
      .then(({ data: res }) => {
        if (res.data) {
          setValue("payment.conversionRate", res?.data?.rate, {
            shouldDirty: true,
          });
          setValue("payment.selectedCurrency", res?.data?.currencySymbol, {
            shouldDirty: true,
          });
        } else {
          setValue(
            "payment.selectedCurrency",
            CommonEnums?.SOUTH_AFRICA_CURRENCY,
            { shouldDirty: true }
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
    const existingPromoCode = sessionStorage.getItem("lastPromoCode");
    if (existingPromoCode) {
      setPromoCode(existingPromoCode);
      applyDiscount();
    }
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
  const submitPaymentDocs = async () => {
    if (paymentDocs?.length) {
      setPaymentDocSubmit(false);
      const finalAmount =
        parseInt(programFee) -
        parseInt(allFields?.payment?.discountAmount || 0) +
        rmatFee;
      setValue("payment.finalFee", finalAmount);
      props?.onSubmit();
    }

    setPaymentDocSubmit(false);

    sessionStorage.removeItem("lastPromoCode");
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
      allFields?.education?.studentTypeCode,
      props?.isManagementStudentType
    );
    if (
      result?.statusCode === 200 &&
      (result?.data?.status === "APP-ENROLED" ||
        result?.data?.status === CommonEnums.APP_ENROLLED_STATUS) &&
      allFields?.education?.studentTypeCode?.toLowerCase() ===
        CommonEnums.MANAGEMENT
    ) {
      setCouponApplied(true);
      setManagementPromoCode(true);
      setValue("payment.discountCode", promoCode);
      setValue("payment.discountAmount", (+programFee * 100) / 100);
      setValue("payment.discountedFee", "0.00");
      props.showToast(true, "Management Code Applied");
    } else if (result?.statusCode === 200 && result?.data?.percent) {
      setManagementPromoCode(false);
      setCouponApplied(true);
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

  const totalPayuAmount = isApplicationEnrolled
    ? totalAmount
    : isNaN(totalAmount)
    ? +rmatFee + +convertedProgramFee
    : totalAmount;

  return (
    <>
      {loadng ? (
        <LoaderComponent />
      ) : (
        <div className="payment-conatiner">
          <div className="row">
            <div className="col-md-12 mb-4">
              <MainContainer className="card-shadow">
                {" "}
                <PaymentHeading>
                  <div className="col-md-12">
                    <StyleHeading>
                      <GreenFormHeading>
                        Order Summary
                      </GreenFormHeading>
                    </StyleHeading>
                  </div>
                </PaymentHeading>
                <PaymentContainer>
                  <div className="row">
                    <div className="col-md-8">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="mb-4">
                            <StyledLabel>
                              Proposal Qualification
                            </StyledLabel>
                            <div className="fields">
                             {selectedProgram?.name}
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-4">
                            <StyledLabel>
                              Study Mode
                            </StyledLabel>
                            <div className="fields">
                                {selectedStudyMode}
                            </div>
                          </div>
                        </div>

                        {isApplicationEnrolled && (
                          <div className="col-md-6">
                            <div className="mb-4 ">
                              {feeOptions?.length > 0 &&
                                feeOptions
                                  .sort((a, b) =>
                                    sortAscending(a, b, "feeMode")
                                  )
                                  .map(({ fee, feeMode }, index) => (
                                    <div className="form-check form-check-inline">
                                      <>
                                        <input
                                          key={index}
                                          className="form-check-input me-2"
                                          type="radio"
                                          {...(register(
                                            `payment.selectedFeeMode`,
                                            {
                                              required: true,
                                            }
                                          ) as any)}
                                          onChange={() => {
                                            getCurrencyConversion();
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
                                          <GreenText>
                                            {selectedCurrency}&nbsp;
                                            {getConvertedProgramFees(
                                              conversionRate,
                                              Number(fee)
                                            )}
                                          </GreenText>
                                        </label>
                                      </>
                                    </div>
                                  ))}
                            </div>
                          </div>
                        )}
                        <div className="col-md-6">
                          <div className="mb-4">
                            <StyledLabel>
                              {isApplicationEnrolled
                                ? "Program Fee"
                                : "Application Fee"}{" "}
                              <strong>
                                ({`R ${Math.trunc(+programFee)}`})
                              </strong>
                            </StyledLabel>
                            <div className="fields">                           
                                {selectedCurrency}{" "}
                                {isApplicationEnrolled
                                  ? getConvertedProgramFees(
                                      conversionRate,
                                      programFee
                                    )
                                  : convertedProgramFee}
                                &nbsp;
                                <span className="fw-normal fs-6">
                                  ( Non-refundable )
                                </span>
                             
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="w-100 p-4 promo-card">
                        <div className="mb-4 d-flex justify-content-between flex-column">
                          <div>
                            <h6>Subtotal <div className="payment-values"> ({selectedCurrency})</div></h6>
                          </div>
                          <div>
                            {" "}
                            {isApplicationEnrolled ? (
                              <h6>
                                Total Program Fees<div className="payment-values">{selectedCurrency} &nbsp;{""}
                                {isManagementPromoCode
                                  ? getConvertedProgramFees(
                                      conversionRate,
                                      allFields?.payment?.discountedFee
                                    )
                                  : getConvertedProgramFees(
                                      conversionRate,
                                      programFee
                                    )}
                                    </div> 
                              </h6>
                            ) : (
                              <h6>
                                Total Application<div className="payment-values">{selectedCurrency} &nbsp;
                                {isManagementPromoCode
                                  ? getConvertedProgramFees(
                                      conversionRate,
                                      allFields?.payment?.discountedFee
                                    )
                                  : convertedProgramFee}
                                  </div>
                              </h6>
                            )}
                            {!isApplicationEnrolled && (
                              <h6>
                                RMAT Fee <div className="payment-values">{selectedCurrency} &nbsp;
                                {isNaN(rmatFee) ? 0 : rmatFee}
                                </div> 
                              </h6>
                            )}
                            {!isManagementPromoCode && (
                              <>
                                <h6>
                                  Discount <div className="payment-values"> {selectedCurrency} &nbsp;
                                  {isNaN(discountAmount) ? 0 : discountAmount}
                                  {discountPercentage && (
                                    <span className="ms-2">
                                      ({discountPercentage}%)
                                    </span>
                                  )}
                                  </div>
                                </h6>

                                {props?.isApplicationEnrolled ? (
                                 <h4 className="subtotal">
                                    Total Amount  <div className="payment-values"> {selectedCurrency} 
                                    &nbsp;
                                    {isNaN(totalAmount)
                                      ? getConvertedProgramFees(
                                          conversionRate,
                                          programFee
                                        )
                                      : totalAmount}
                                      </div>
                                  </h4>
                                ) : (
                                  <h4 className="subtotal">
                                    Total Amount <div className="payment-values"> &nbsp;{selectedCurrency}{" "}
                                    {isNaN(totalAmount)
                                      ? +rmatFee + +convertedProgramFee
                                      : totalAmount}
                                      </div>
                                  </h4>
                                )}
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
                              <div className="input-group mb-2 mt-2">
                                <input
                                  type="text"
                                  className="form-control"
                                  value={promoCode}
                                  placeholder="Enter promo code"
                                  onChange={(e) => {
                                    setPromoCode(e?.target?.value);
                                    setValue(
                                      "payment.managementDiscountCode",
                                      e.target.value
                                    );
                                  }}
                                />
                                <div className="input-group-append cursor-pointer">
                                  <Button
                                    onClick={applyDiscount}
                                    style={{
                                      background:
                                        !promoCode || promoCode?.length === 0
                                          ? `${DefaultGrey}`
                                          : `${Green}`,
                                      padding: "0.50rem 0.75rem",
                                    }}
                                    id="basic-addon2"
                                    disabled={!promoCode}
                                  >
                                    Apply
                                  </Button>
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
                                      setCouponApplied(false);
                                      setValue("payment.discountedFee", "0.00");
                                      setValue(
                                        "payment.discountAmount",
                                        "0.00"
                                      );
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
                              You have saved {selectedCurrency}
                              {discountAmount} on this application
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
                  <PaymentOption 
                    totalAmount={totalPayuAmount}
                    navigateNext={props?.navigateNext}
                    setLoading={(loading) => setLoading(loading)}
                    isApplicationEnrolled={isApplicationEnrolled}
                  />
                </div>
                <div className="col-md-1">
                  <StyledDiv>Or</StyledDiv>
                </div>
                <div className="col-md-5">
                  <MainContainer className="card-shadow">
                    <PaymentHeading>
                      <div className="col-md-12">
                        <StyleHeading>
                          <GreenFormHeading style={{ fontSize: "16px" }}>
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
                              className="upload-icon"
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
                              <p className="offline-text">
                                Only PNG, JPEG and PDF files with max size of
                                2MB
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
                                      className="w-100 offline-filename"
                                      key={file.lastModified}
                                    >
                                      {file?.name}{" "}
                                      <DeleteIcon
                                        onClick={() => deleteFile(idx)}
                                      />
                                    </span>
                                  ))}
                              </div>
                              {paymentDocs?.length > 0 && !isInvalidFiles && (
                                <div className="invalid-feedback">
                                  Max file size is 2 MB
                                </div>
                              )}
                              {isInvalidFilesType && (
                                <div className="invalid-feedback">
                                  Only PDF and JPGE File Allowed
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
                              !isInvalidFiles ||
                              paymentDocs?.length === 0 ||
                              isPaymentDocSubmit ||
                              !totalPayuAmount
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
      )}
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
  padding: 10px;
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
  font-family: roboto-bold;
`;

const UploadPaymentDocsContainer = styled.div`
  background: #f5f5f5;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  min-width: 400px;
  min-height: 100px;
  padding: 1rem;
  width: 100%;
  overflow: hidden;
  border: 1px dashed #008554;
  border-radius: 5px;
  @media (max-width: 900px) {
    padding: 1rem 4.7rem;
  }
`;
