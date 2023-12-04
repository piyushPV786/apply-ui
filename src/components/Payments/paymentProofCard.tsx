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
    <>
      <form>
        <Grid container display="flex" justifyContent="center" mt={5}>
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
        <Grid container display="flex" justifyContent="center" sx={{ p: 1 }}>
          <StyledButton
            onClick={handleSubmit(submitFile)}
            disabled={!watch("file" as any)}
            title="Submit"
            style={{ width: "120px" }}
          />
        </Grid>
      </form>
    </>
  );
};

export default PaymentProofCard;
