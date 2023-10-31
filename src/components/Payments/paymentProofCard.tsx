import React from "react";
import { useForm } from "react-hook-form";

import {
  Grid,
  Button,
  Card,
  CardContent,
  CardActions,
  CardHeader,
} from "@mui/material";
import UploadPaymentProof from "../uploadDocument/uploadPaymentProof";
import { feeMode } from "../common/constant";

export interface IFormValue {
  file: File | null;
}

const PaymentProofCard = ({
  uploadPaymentProof,
  isProgamFee,
  paymentDetailsJson,
  selectedCode,
  getConvertedAmount,
  discountDetails,
  conversionRateDetails,
}) => {
  const {
    watch,
    handleSubmit,
    unregister,
    setValue,
    clearErrors,
    register,
    formState: { errors },
  } = useForm();

  const submitFile = (data: any) => {
    const payload = {
      amount: isProgamFee
        ? Number(
            getConvertedAmount(
              conversionRateDetails?.rate,
              Number(paymentDetailsJson[selectedCode]?.fee) +
                Number(paymentDetailsJson[selectedCode]?.rmatFee) -
                discountDetails?.discountAmount
            )
          )
        : Number(
            getConvertedAmount(
              conversionRateDetails?.rate,
              Number(paymentDetailsJson[feeMode.APPLICATION]?.fee) +
                Number(paymentDetailsJson[feeMode.APPLICATION]?.rmatFee) -
                discountDetails?.discountAmount
            )
          ),
      discountAmount: discountDetails?.discountAmount
        ? getConvertedAmount(
            conversionRateDetails?.rate,
            discountDetails?.discountAmount
          )
        : 0,
      discountCode: discountDetails?.discountCode,
      files: [
        {
          documentTypeCode: "PAYMENTPROOF",
          fileName: data?.file?.name,
          fileType: data?.file?.type,
        },
      ],
    };
    uploadPaymentProof(payload);
  };

  return (
    <>
      <form onSubmit={handleSubmit(submitFile)}>
        <Card>
          <CardHeader
            title="Upload Payment Proof"
            sx={{ borderBottom: " 2px solid green" }}
          />
          <CardContent>
            <Grid container display="flex" justifyContent="center">
              <Grid item xs={10} md={10}>
                <UploadPaymentProof
                  register={register}
                  setValue={setValue}
                  clearErrors={clearErrors}
                  watch={watch}
                  unregister={unregister}
                  errors={errors}
                  name="file"
                />
              </Grid>
            </Grid>
          </CardContent>
          <CardActions>
            <Grid
              container
              display="flex"
              justifyContent="center"
              sx={{ p: 1 }}
            >
              <Button
                type="submit"
                variant="contained"
                disabled={!watch("file" as any)}
              >
                Submit
              </Button>
            </Grid>
          </CardActions>
        </Card>
      </form>
    </>
  );
};

export default PaymentProofCard;
