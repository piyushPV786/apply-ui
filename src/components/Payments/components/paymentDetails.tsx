import { Grid, Typography } from "@mui/material";
import { Green, accountDetails } from "../../common/common";

const PaymentDetails = ({ masterData }) => {
  return (
    <Grid container rowGap={2}>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Typography variant="h6" color={Green}>
          Bank Account Details
        </Typography>
      </Grid>

      <Grid container justifyContent="center" alignItems="center">
        <Grid container sm={12}>
          <Grid container sm={12} columnSpacing={2}>
            <Grid item sm={4}>
              <Grid container direction="row">
                <Typography variant="caption" color="#a9a9a9">
                  Account Name :
                </Typography>
                <Typography variant="caption">
                  {accountDetails?.AccountName}
                </Typography>
              </Grid>
            </Grid>
            <Grid item sm={4}>
              <Grid container direction="row">
                <Typography variant="caption" color="#a9a9a9">
                  Account Number:{" "}
                </Typography>
                <Typography variant="caption">
                  {accountDetails?.AccountNumber}
                </Typography>
              </Grid>
            </Grid>
            <Grid item sm={4}>
              <Grid container direction="row">
                <Typography variant="caption" color="#a9a9a9">
                  Branch Code:
                </Typography>
                <Typography variant="caption">
                  {" "}
                  {accountDetails?.BranchCode}{" "}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid container sm={12}>
            <Grid item sm={4}>
              <Grid container direction="row">
                <Typography variant="caption" color="#a9a9a9">
                  Bank Name:
                </Typography>

                <Typography variant="caption">
                  {" "}
                  {accountDetails?.BankName}{" "}
                </Typography>
              </Grid>
            </Grid>
            <Grid item sm={4}>
              <Grid container direction="row">
                <Typography variant="caption" color="#a9a9a9">
                  Account Type:
                </Typography>
                <Typography variant="caption">
                  {" "}
                  {accountDetails?.AccountType}{" "}
                </Typography>
              </Grid>
            </Grid>
            <Grid item sm={4}>
              <Grid container direction="row">
                <Typography variant="caption" color="#a9a9a9">
                  Reference:
                </Typography>
                <Typography variant="caption">
                  {masterData?.applicationData?.lead?.studentCode}{" "}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default PaymentDetails;
