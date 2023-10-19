import StyledButton from "../../components/button/button";
import CustomHookPayment from "../../components/Payments/customHook";
import OrderSummary from "../../components/Payments/orderSummary";
import PaymentOption from "../../components/Payments/payment";
import StepperComponent from "../../components/stepper/stepper";
import { Box, Button, Grid } from "@mui/material";
interface IPaymentPageProps {
  applicationCode: string;
  studentType: string;
}

const PaymentPage = ({ applicationCode, studentType }: IPaymentPageProps) => {
  const { paymentDiscount } = CustomHookPayment();

  console.log("url", studentType, applicationCode);
  return (
    <>
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
              applicationCode={applicationCode}
              studentType={studentType}
              paymentDiscount={paymentDiscount}
            />
          </Grid>
          <Grid item xs={12}>
            <PaymentOption />
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
