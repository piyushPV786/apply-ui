import { Grid, Typography } from "@mui/material";
import { Green } from "../../common/common";

const PaymentDetails = () => {
  return (
    <Grid container spacing={2}>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Typography variant="h5" color={Green}>
          Bank Account Details
        </Typography>
      </Grid>
      <Grid></Grid>
    </Grid>
  );
};

export default PaymentDetails;
