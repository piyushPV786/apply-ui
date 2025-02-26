import StyledButton from "../../components/button/button";
import {
  useOfflinePaymentHook,
  usePaymentHook,
  usePayuHook,
  useUkhesheHook,
} from "../../components/Payments/customHook";
import OrderSummary from "../../components/Payments/orderSummary";
import StepperComponent from "../../components/stepper/stepper";
import { Box, Grid, Stack } from "@mui/material";
import { MainContainer } from "../../components/login/style";
import { usePaymentDetailsHook } from "./customHook";
import Header from "../common/header";
import { useRouter } from "next/router";
import PaymentOptions from "./components/paymentOptions";
import { Spinner } from "../Loader";
import PaymentTimer from "../dialog/PaymentTimer";

const PaymentPage = ({ applicationCode }) => {
  const router = useRouter();
  const { masterData } = usePaymentHook(applicationCode);

  const { studyModes, fees, updateFeeMode } = usePaymentDetailsHook(masterData);

  const { getPayuDetails, payuDetails } = usePayuHook(masterData, fees);
  const {
    getPaymentRedirectURL,
    closePaymentDialog,
    setOpenPopup,
    openPopup,
    paymentStatusCheck,
  } = useUkhesheHook(masterData, fees);

  const {
    uploadPaymentProof,
    disabled,
    updatePayment,
    uploadProgress,
    removeDocument,
  } = useOfflinePaymentHook(masterData, fees);

  if (!masterData && !studyModes && !fees) {
    return (
      <>
        <Stack alignItems="center">
          <Spinner />
        </Stack>
      </>
    );
  }

  return (
    <MainContainer>
      <Header />
      <Box
        sx={{
          backgroundColor: "#e3e3e3",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid container spacing={2} xs={10} sm={10} md={10}>
          <Grid item xs={12}>
            <StepperComponent active={2} />
          </Grid>
          <Grid item xs={12}>
            <OrderSummary
              studyModes={studyModes}
              fees={fees}
              masterData={masterData}
              updateFeeMode={updateFeeMode}
            />
          </Grid>
          <Grid item xs={12}>
            <PaymentOptions
              masterData={masterData}
              getPayuDetails={getPayuDetails}
              payuDetails={payuDetails}
              fees={fees}
              getPaymentRedirectURL={getPaymentRedirectURL}
              uploadPaymentProof={uploadPaymentProof}
              setOpenPopup={setOpenPopup}
              disabled={disabled}
              updatePayment={updatePayment}
              uploadProgress={uploadProgress}
              paymentStatusCheck={paymentStatusCheck}
              removeDocument={removeDocument}
            />
          </Grid>

          <Grid item xs={12} display="flex" justifyContent="center">
            <Grid item xs={2} display="flex" justifyContent="center">
              <StyledButton
                title="Back To Dashboard"
                onClick={() => {
                  router.replace(`/dashboard`);
                }}
              />
            </Grid>
            <Grid item xs={1} display="flex" justifyContent="center">
              <StyledButton
                isGreenWhiteCombination
                title="Back"
                onClick={() => {
                  router.replace(`/uploads/${applicationCode}`);
                }}
              />
            </Grid>
          </Grid>
        </Grid>
      </Box>

      <PaymentTimer
        open={openPopup}
        closePaymentDialog={closePaymentDialog}
        getPaymentRedirectURL={getPaymentRedirectURL}
      />
    </MainContainer>
  );
};

export default PaymentPage;
