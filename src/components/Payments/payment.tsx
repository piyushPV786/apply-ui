import React from "react";
import { Grid } from "@mui/material";
import PaymentOptionCard from "./paymentOptionCard";
import PaymentProofCard from "./paymentProofCard";

const PaymentOption = ({ getPayuDetails, paymentPayload }) => {
  return (
    <>
      <Grid container>
        <Grid item xs={6}>
          <PaymentOptionCard
            getPayuDetails={getPayuDetails}
            paymentPayload={paymentPayload}
          />
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

        <Grid item xs={5} md={5}>
          <PaymentProofCard />
        </Grid>
      </Grid>
    </>
  );
};

export default PaymentOption;
