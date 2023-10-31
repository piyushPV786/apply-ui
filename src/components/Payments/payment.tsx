import React from "react";
import { Grid } from "@mui/material";
import PaymentOptionCard from "./paymentOptionCard";
import PaymentProofCard from "./paymentProofCard";
import { usePaymentDetailsHook } from "./customHook";

const PaymentOption = (props) => {
  const { masterData } = props;

  return (
    <>
      <Grid container>
        <Grid item xs={6}>
          <PaymentOptionCard masterData={masterData} />
        </Grid>
        <Grid
          item
          xs={1}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Grid>Or</Grid>
        </Grid>

        <Grid item xs={5} md={5}></Grid>
      </Grid>
    </>
  );
};

export default PaymentOption;
