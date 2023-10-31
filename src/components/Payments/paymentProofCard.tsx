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
import { usePaymentDetailsHook } from "./customHook";

export interface IFormValue {
  file: File | null;
}

const PaymentProofCard = (props) => {
  const { uploadPaymentProof, fees } = props;

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
      amount: fees.totalFee,
      discountAmount: fees?.discountFee,

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
