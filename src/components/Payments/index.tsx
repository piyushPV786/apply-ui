import StyledButton from "../../components/button/button";
import {
  useOfflinePaymentHook,
  usePaymentHook,
  usePayuHook,
} from "../../components/Payments/customHook";
import OrderSummary from "../../components/Payments/orderSummary";
import StepperComponent from "../../components/stepper/stepper";
import { Box, Button, Grid } from "@mui/material";
import { usePaymentDetailsHook } from "./customHook";
import Header from "../common/header";
import PaymentOptionCard from "./paymentOptionCard";
import PaymentProofCard from "./paymentProofCard";
const PaymentPage = ({ applicationCode }) => {
  const { masterData } = usePaymentHook(applicationCode);

  const { studyModes, fees } = usePaymentDetailsHook(masterData);

  const { getPayuDetails, payuDetails } = usePayuHook(masterData, fees);

  const { uploadPaymentProof } = useOfflinePaymentHook(masterData, fees);
  return (
    <>
      <Header />
      <Box
        sx={{
          backgroundColor: "#e3e3e3",
          display: "flex",
          justifyContent: "center",
          p: 2,
        }}
      >
        <Grid container spacing={2} xs={10}>
          <Grid item xs={12}>
            <StepperComponent active={1} />
          </Grid>
          <Grid item xs={12}>
            <OrderSummary
              studyModes={studyModes}
              fees={fees}
              masterData={masterData}
            />
          </Grid>
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={6}>
                <PaymentOptionCard
                  getPayuDetails={getPayuDetails}
                  payuDetails={payuDetails}
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
                <PaymentProofCard uploadPaymentProof={uploadPaymentProof} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} display="flex" justifyContent="center">
            <Grid item xs={6} display="flex" justifyContent="center">
              <StyledButton isGreenWhiteCombination title="Back" />
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default PaymentPage;
