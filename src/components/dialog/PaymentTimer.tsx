import {
  Box,
  CircularProgress,
  CircularProgressProps,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Typography,
} from "@mui/material";
import React, { Fragment, useState } from "react";
import { Green } from "../common/common";
import StyledButton from "../button/button";
import { useCustomizeHook } from "../Payments/customHook";

const CircularProgressWithLabel = (
  props: CircularProgressProps & { label: string }
) => {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h4" color="text.primary">
          {props.label}
        </Typography>
      </Box>
    </Box>
  );
};
interface IPaymentTimerPropTypes {
  open: boolean;
  closePaymentDialog: (isCounter?: boolean) => void;
  getPaymentRedirectURL;
}

const PaymentTimer = ({
  open,
  closePaymentDialog,
  getPaymentRedirectURL,
}: IPaymentTimerPropTypes) => {
  const [proceed, setProceed] = useState(false);
  const { counter } = useCustomizeHook(open, closePaymentDialog, proceed);
  const timer = new Date(counter * 1000).toISOString().slice(14, 19);
  const percentage = counter / 3;

  const onProceed = () => {
    setProceed(true);
    getPaymentRedirectURL();
  };

  return (
    <Fragment>
      <Dialog open={open} maxWidth="sm">
        {proceed ? (
          <DialogContent sx={{ px: 10, py: 5, textAlign: "center" }}>
            <DialogContentText>
              Open the next tab to approve the payment request on Ukheshe from
              Regenesys
            </DialogContentText>
            <Box display="flex" justifyContent="center" py={5}>
              <CircularProgressWithLabel
                variant="determinate"
                value={percentage}
                label={timer}
                size="10em"
                sx={{
                  boxShadow: `inset 0 0 0 14px lightgray`,
                  borderRadius: "50%",
                  "& .MuiCircularProgress-circle": {
                    strokeLinecap: "round",
                    color: Green,
                  },
                }}
              />
            </Box>
            <DialogContentText>
              Please approve the payment request before it times out
            </DialogContentText>
            <DialogContentText variant="caption" color="GrayText">
              Do not hit the back button until the transaction is completed
            </DialogContentText>
          </DialogContent>
        ) : (
          <DialogContent sx={{ px: 10, py: 5, textAlign: "center" }}>
            <DialogContentText>
              You will be redirected to payment gateway. Click OK to proceed.
            </DialogContentText>
          </DialogContent>
        )}
        <DialogActions sx={{ justifyContent: "center" }}>
          <StyledButton
            isError={proceed}
            title={proceed ? "Cancel" : "Ok"}
            onClick={() => (proceed ? closePaymentDialog() : onProceed())}
          />
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default PaymentTimer;
