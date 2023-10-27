import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Grid,
  Button,
  Card,
  CardContent,
  CardActions,
  CardHeader,
} from "@mui/material";
import UploadPaymentProof from "../uploadDocument/uploadPaymentProof";
import StyledButton from "../button/button";

const schema = yup.object().shape({
  file: yup
    .mixed()
    .test("fileType", "File type must be .pdf,.png or jpeg", (value) => {
      if (!value) return true; // Allow empty values
      return ["image/jpeg", "image/png", "application/pdf"].includes(
        value.type
      );
    })
    .test("fileSize", "File size is too large", (value) => {
      if (!value) return true; // Allow empty values
      return value.size <= 1024 * 1024 * 2; // 5 MB
    }),
});
export interface IFormValue {
  file: File | null;
}

const PaymentProofCard = ({ uploadPaymentProof, paymentDetails }) => {
  const {
    watch,
    handleSubmit,
    unregister,
    setValue,
    clearErrors,
    register,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const submitFile = (data: any) => {
    const payload = {
      amount: paymentDetails?.feeDetails?.totaAmount,
      discountAmount: paymentDetails?.feeDetails?.discountAmount,
      discountCode: paymentDetails?.feeDetails?.discountCode,
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
