import React from "react";
import { useForm } from "react-hook-form";

import { Grid } from "@mui/material";
import UploadPaymentProof from "../uploadDocument/uploadPaymentProof";
import StyledButton from "../button/button";

export interface IFormValue {
  file: File | null;
}

const PaymentProofCard = (props) => {
  const { uploadPaymentProof } = props;

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
      files: [
        {
          documentTypeCode: "PAYMENTPROOF",
          fileName: data?.file?.name,
          fileType: data?.file?.type,
          files: data?.file,
        },
      ],
    };
    uploadPaymentProof(payload);
  };

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      mt={5}
      rowGap={5}
      component="form"
    >
      <Grid item xs={8}>
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
      <Grid item display="flex" justifyContent="center">
        <StyledButton
          onClick={handleSubmit(submitFile)}
          disabled={!watch("file" as any)}
          title="Submit"
          style={{ width: "120px" }}
        />
      </Grid>
    </Grid>
  );
};

export default PaymentProofCard;
