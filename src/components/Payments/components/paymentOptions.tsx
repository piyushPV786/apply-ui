import { Box, Card, CardContent, Grid } from "@material-ui/core";
import { styled } from "@mui/material";

import { Green } from "../../common/common";
import PaymentOptionCard from "../paymentOptionCard";

const PaymentOptions = ({
  getPayuDetails,
  payuDetails,
  getPaymentRedirectURL,
  uploadPaymentProof,
}) => {
  return (
    <FullWidthCard>
      <CardHeaderStyled>Payment Options</CardHeaderStyled>
      <CardContent>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={12}>
              <PaymentOptionCard
                getPayuDetails={getPayuDetails}
                payuDetails={payuDetails}
                getPaymentRedirectURL={getPaymentRedirectURL}
                uploadPaymentProof={uploadPaymentProof}
              />
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </FullWidthCard>
  );
};

export default PaymentOptions;

const FullWidthCard = styled(Card)(() => ({
  width: "100%",
}));

const CardHeaderStyled = styled(Box)(() => ({
  width: "100%",
  borderBottom: `2px solid ${Green}`,
  fontSize: "1.25rem",
  padding: "15px",
  color: `${Green}`,
}));
