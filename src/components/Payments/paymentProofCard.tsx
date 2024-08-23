import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

import { Grid } from "@mui/material";
import UploadPaymentProof from "../uploadDocument/uploadPaymentProof";
import StyledButton from "../button/button";
import PaymentDetails from "./components/paymentDetails";

export interface IFormValue {
  file: File | null;
}

const PaymentProofCard = (props) => {
  const {
    uploadPaymentProof,
    disabled,
    updatePayment,
    masterData,
    paymentStatusCheck,
    handleFileExist,
    removeDocument,
  } = props;

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
        },
      ],
    };
    updatePayment(payload);
  };

  useEffect(() => {
    handleFileExist(watch("file"));
  }, [watch("file")]);

  return (
    <Grid container mt={5} rowGap={5} component="form" justifyContent="center">
      <PaymentDetails masterData={masterData} />
      <Grid item xs={12} lg={6}>
        <UploadPaymentProof
          register={register}
          setValue={setValue}
          clearErrors={clearErrors}
          watch={watch}
          unregister={unregister}
          errors={errors}
          name="file"
          uploadPaymentProof={uploadPaymentProof}
          paymentStatusCheck={paymentStatusCheck}
          removeDocument={removeDocument}
        />
      </Grid>
      <Grid item xs={12} display="flex" justifyContent="center">
        <StyledButton
          onClick={handleSubmit(submitFile)}
          disabled={!watch("file" as any) || disabled}
          title="Submit"
          style={{ width: "120px" }}
        />
      </Grid>
    </Grid>
  );
};

export default PaymentProofCard;
