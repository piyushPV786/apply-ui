import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { PaymentCard, StyledLink } from "../../styles/styled";
import React, { useState } from "react";
import { IPaymentPayload } from "./commonDataType";

interface IPaymentPageProps {
  paymentDiscount: (arg0: IPaymentPayload) => void;
  paymentDetails: any;
}
const OrderSummary = ({
  paymentDiscount,
  paymentDetails,
}: IPaymentPageProps) => {
  const [showPromoCode, setShowPromoCode] = useState<boolean>(false);
  const [promoCode, setPromoCode] = useState<string>("");

  const OnSubmit = async () => {
    // To Be used after StudentCode api
    // const payload = {
    //   applicationCode: applicationCode,
    //   studentType: studentType,
    //   discountCode: promoCode,
    // };
    // await paymentDiscount(payload);
    // setShowPromoCode(false);
    // setPromoCode("");
  };

  console.log(paymentDetails);
  return (
    <Card>
      <Grid container spacing={2}>
        <Grid item md={12} xs={12} sx={{ borderBottom: " 2px solid green" }}>
          <Typography variant="h6" color="primary" sx={{ p: 2, pt: 2 }}>
            Order Summary
          </Typography>
        </Grid>
        <Grid item md={8} xs={8}>
          <Grid container spacing={4} sx={{ p: 3 }}>
            <Grid item md={6} xs={12}>
              <label>Proposal Qualification</label>
              <Typography variant="body1">
                <strong>{paymentDetails?.programName}</strong>
              </Typography>
            </Grid>
            <Grid item md={6} xs={12}>
              <label>Study Mode</label>
              <Typography variant="body1">
                <strong>DAY</strong> (These classes will be conducted during the
                week)
              </Typography>
            </Grid>
            <Grid item md={6} xs={12}>
              <label>Application Fee (R 1100)</label>
              <Typography variant="body1">
                <strong>{paymentDetails?.feeDetails[0]?.fee}</strong> (
                Non-refundable )
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={4} xs={4}>
          <Grid container spacing={2} sx={{ p: 3 }}>
            <PaymentCard>
              <CardContent>
                <Grid container spacing={1} sx={{ pb: 2 }}>
                  <Grid
                    item
                    md={12}
                    xs={12}
                    display="flex"
                    justifyContent="space-between"
                  >
                    <label>Total Application</label>
                    <Typography variant="body1">
                      <strong>$ 20097</strong>
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    md={12}
                    xs={12}
                    display="flex"
                    justifyContent="space-between"
                  >
                    <label>RMAT Fee</label>
                    <Typography variant="body1">
                      <strong>$ 913.5</strong>
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    md={12}
                    xs={12}
                    display="flex"
                    justifyContent="space-between"
                  >
                    <label>Discount</label>
                    <Typography variant="body1">
                      <strong>$ 20097</strong>
                    </Typography>
                  </Grid>
                </Grid>
                <Divider color="#b0aeae" sx={{ height: 2 }} />
                <Grid container spacing={2} sx={{ pb: 2 }}>
                  <Grid
                    item
                    md={12}
                    xs={12}
                    display="flex"
                    justifyContent="space-between"
                  >
                    <strong>Total Amount</strong>
                    <Typography variant="body1">
                      <strong>$ 20097</strong>
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container spacing={2} sx={{ pb: 2, pt: 2 }}>
                  <Grid item xs={12} display="flex" justifyContent="center">
                    <StyledLink onClick={() => setShowPromoCode(true)}>
                      Have a promo code?
                    </StyledLink>
                  </Grid>
                  {showPromoCode && (
                    <Grid item xs={12} display="flex">
                      <TextField
                        placeholder="Enter Proper Code"
                        fullWidth
                        value={promoCode}
                        onChange={(
                          event: React.ChangeEvent<HTMLInputElement>
                        ) => {
                          setPromoCode(event.target.value);
                        }}
                      />
                      <Button
                        variant="contained"
                        size="small"
                        onClick={OnSubmit}
                      >
                        Apply
                      </Button>
                    </Grid>
                  )}
                </Grid>
              </CardContent>
            </PaymentCard>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
};
export default OrderSummary;
