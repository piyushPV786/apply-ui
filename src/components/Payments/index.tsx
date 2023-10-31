import StyledButton from "../../components/button/button";
import CustomHookPayment from "../../components/Payments/customHook";
import OrderSummary from "../../components/Payments/orderSummary";
import PaymentOption from "../../components/Payments/payment";
import StepperComponent from "../../components/stepper/stepper";
import { Box, Button, Grid } from "@mui/material";
import Header from "../common/header";

const PaymentPage = ({ applicationCode }) => {
  const {
    paymentDiscount,
    userDetails,
    getPayuDetails,
    paymentPayload,
    uploadPaymentProof,
    conversionRateDetails,
    isProgamFee,
    paymentDetailsJson,
    selectedCode,
    studyModes,
    setSelectedCode,
    getConvertedAmount,
    discountDetails,
    updateDiscount,
  } = CustomHookPayment(applicationCode);

  return paymentDetailsJson ? (
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
              conversionRateDetails={conversionRateDetails}
              paymentDiscount={paymentDiscount}
              paymentDetailsJson={paymentDetailsJson}
              selectedCode={selectedCode}
              setSelectedCode={setSelectedCode}
              isProgamFee={isProgamFee}
              studyModes={studyModes}
              getConvertedAmount={getConvertedAmount}
              discountDetails={discountDetails}
              userDetails={userDetails}
              updateDiscount={updateDiscount}
            />
          </Grid>
          <Grid item xs={12}>
            <PaymentOption
              getPayuDetails={getPayuDetails}
              paymentPayload={paymentPayload}
              uploadPaymentProof={uploadPaymentProof}
              conversionRateDetails={conversionRateDetails}
              paymentDetailsJson={paymentDetailsJson}
              selectedCode={selectedCode}
              isProgamFee={isProgamFee}
              getConvertedAmount={getConvertedAmount}
              discountDetails={discountDetails}
            />
          </Grid>
          <Grid item xs={12} display="flex" justifyContent="center">
            <Grid item xs={6} display="flex" justifyContent="center">
              <StyledButton isGreenWhiteCombination title="Back" />
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  ) : null;
};

export default PaymentPage;
