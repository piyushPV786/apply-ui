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
import { CommonEnums, feeMode } from "../common/constant";
import { usePaymentDetailsHook } from "./customHook";

const OrderSummary2 = (props) => {
  const {
    studyModes,
    fees,
    setSelectedFeeMode,
    selectedFeeMode,
    paymentDiscount,
    masterData,
  } = props;

  const [showPromoCode, setShowPromoCode] = useState<boolean>(false);
  const [promoCode, setPromoCode] = useState<string>("");

  const OnSubmit = async () => {
    paymentDiscount(promoCode);
    setShowPromoCode(false);
    // setPromoCode("");
  };

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
                <strong>{masterData?.feeData?.programName}</strong>
              </Typography>
            </Grid>
            <Grid item md={7} xs={12}>
              <Grid>
                {masterData?.applicationData?.status ===
                CommonEnums.FEES_PENDING_STATUS ? (
                  <Grid>
                    <label>Study Mode</label>
                    <Typography variant="body1">
                      <strong>{studyModes?.studyModeCode}</strong>(
                      {studyModes?.helpText} )
                    </Typography>
                  </Grid>
                ) : (
                  <Grid>
                    <label>Fee Mode</label>
                    <Grid>
                      {studyModes?.fees?.map((item, index) => {
                        if (item?.feeMode != feeMode.APPLICATION) {
                          return (
                            <div className="form-check form-check-inline">
                              <input
                                key={index}
                                className="form-check-input me-2"
                                type="radio"
                                onChange={() => {
                                  setSelectedFeeMode(item?.feeMode);
                                }}
                                value={item?.feeMode}
                                checked={item?.feeMode == selectedFeeMode}
                              />
                              <label className="form-check-label">
                                {item?.feeMode}
                                <br />
                                <Typography>{item.fee}</Typography>
                              </label>
                            </div>
                          );
                        }
                      })}
                    </Grid>
                  </Grid>
                )}
              </Grid>
            </Grid>
            <Grid item md={7} xs={12}>
              <Grid>
                <label>
                  {fees?.label}( {fees?.amount} )
                </label>
                <Typography variant="body1">
                  <strong>
                    {fees?.amount} {fees?.helpText}
                  </strong>
                </Typography>
              </Grid>
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
                    <label>{fees?.label}</label>
                    <Typography variant="body1">
                      <strong>{fees?.amount}</strong>
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
                      <strong> {fees?.rmatAmount}</strong>
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
                      <strong>{fees?.discountAmount}</strong>
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
                      <strong>{fees?.totalAmount}</strong>
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container spacing={2} sx={{ pb: 2, pt: 2 }}>
                  <Grid item xs={12} display="flex" justifyContent="center">
                    <StyledLink
                      onClick={() => {
                        setShowPromoCode(true);
                      }}
                    >
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

export default OrderSummary2;
