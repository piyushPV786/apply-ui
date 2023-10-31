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
import { useFormContext } from "react-hook-form";
import { feeMode } from "../common/constant";

interface IPaymentPageProps {
  paymentDiscount: any;
  paymentDetailsJson: any;
  conversionRateDetails: any;
  selectedCode: any;
  setSelectedCode: any;
  isProgamFee: any;
  studyModes: any;
  getConvertedAmount: any;
  discountDetails: any;
  userDetails: any;
  updateDiscount: any;
}
const OrderSummary = ({
  paymentDiscount,
  paymentDetailsJson,
  conversionRateDetails,
  selectedCode,
  setSelectedCode,
  isProgamFee,
  studyModes,
  getConvertedAmount,
  discountDetails,
  userDetails,
  updateDiscount,
}: IPaymentPageProps) => {
  const [showPromoCode, setShowPromoCode] = useState<boolean>(false);
  const [promoCode, setPromoCode] = useState<string>("");

  const OnSubmit = async () => {
    paymentDiscount(promoCode, false);
    setShowPromoCode(false);
    // setPromoCode("");
  };
  console.log("sel", paymentDetailsJson[selectedCode]);
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
                <strong>{userDetails?.education?.programName}</strong>
              </Typography>
            </Grid>
            <Grid item md={7} xs={12}>
              <Grid>
                <label>Study Mode</label>
              </Grid>
              {isProgamFee ? (
                <Grid>
                  {studyModes &&
                    studyModes?.studyModes?.map((item, index) => {
                      return (
                        <div className="form-check form-check-inline">
                          <>
                            <input
                              key={index}
                              className="form-check-input me-2"
                              type="radio"
                              onChange={() => {
                                if (promoCode) {
                                  updateDiscount(
                                    paymentDetailsJson[selectedCode]?.fee
                                  );
                                }
                                setSelectedCode(item?.feeMode);
                              }}
                              value={item?.feeMode}
                              checked={item?.feeMode == selectedCode}
                            />
                            <label className="form-check-label">
                              {item?.feeMode}
                              <br />
                              <Typography>
                                {getConvertedAmount(
                                  conversionRateDetails?.rate,
                                  item?.fee
                                )}
                              </Typography>
                            </label>
                          </>
                        </div>
                      );
                    })}
                </Grid>
              ) : (
                <Typography variant="body1">
                  <strong>DAY</strong> (These classes will be conducted during
                  the week)
                </Typography>
              )}
            </Grid>
            <Grid item md={6} xs={12}>
              <label>
                APPLICATION Fee (
                {isProgamFee
                  ? isNaN(
                      getConvertedAmount(
                        conversionRateDetails?.rate,
                        paymentDetailsJson[selectedCode]?.fee
                      )
                    )
                    ? 0
                    : getConvertedAmount(
                        conversionRateDetails?.rate,
                        paymentDetailsJson[selectedCode]?.fee
                      )
                  : isNaN(
                      getConvertedAmount(
                        conversionRateDetails?.rate,
                        paymentDetailsJson[feeMode.APPLICATION]?.fee
                      )
                    )
                  ? 0
                  : getConvertedAmount(
                      conversionRateDetails?.rate,
                      paymentDetailsJson[feeMode.APPLICATION]?.fee
                    )}
                )
              </label>
              <Typography variant="body1">
                <strong>
                  {isProgamFee
                    ? isNaN(
                        getConvertedAmount(
                          conversionRateDetails?.rate,
                          paymentDetailsJson[selectedCode]?.fee
                        )
                      )
                      ? 0
                      : getConvertedAmount(
                          conversionRateDetails?.rate,
                          paymentDetailsJson[selectedCode]?.fee
                        )
                    : isNaN(
                        getConvertedAmount(
                          conversionRateDetails?.rate,
                          paymentDetailsJson[feeMode.APPLICATION]?.fee
                        )
                      )
                    ? 0
                    : getConvertedAmount(
                        conversionRateDetails?.rate,
                        paymentDetailsJson[feeMode.APPLICATION]?.fee
                      )}
                </strong>
                ( Non-refundable )
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
                    <label>Total APPLICATION</label>
                    <Typography variant="body1">
                      <strong>
                        {isProgamFee
                          ? isNaN(
                              getConvertedAmount(
                                conversionRateDetails?.rate,
                                paymentDetailsJson[selectedCode]?.fee
                              )
                            )
                            ? 0
                            : getConvertedAmount(
                                conversionRateDetails?.rate,
                                paymentDetailsJson[selectedCode]?.fee
                              )
                          : isNaN(
                              getConvertedAmount(
                                conversionRateDetails?.rate,
                                paymentDetailsJson[feeMode.APPLICATION]?.fee
                              )
                            )
                          ? 0
                          : getConvertedAmount(
                              conversionRateDetails?.rate,
                              paymentDetailsJson[feeMode.APPLICATION]?.fee
                            )}
                      </strong>
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
                      <strong>
                        {isProgamFee
                          ? isNaN(
                              getConvertedAmount(
                                conversionRateDetails?.rate,
                                paymentDetailsJson[selectedCode]?.rmatFee
                              )
                            )
                            ? 0
                            : getConvertedAmount(
                                conversionRateDetails?.rate,
                                paymentDetailsJson[selectedCode]?.rmatFee
                              )
                          : isNaN(
                              getConvertedAmount(
                                conversionRateDetails?.rate,
                                paymentDetailsJson[feeMode.APPLICATION]?.rmatFee
                              )
                            )
                          ? 0
                          : getConvertedAmount(
                              conversionRateDetails?.rate,
                              paymentDetailsJson[feeMode.APPLICATION]?.rmatFee
                            )}
                      </strong>
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
                      <strong>
                        {discountDetails?.discountAmount
                          ? getConvertedAmount(
                              conversionRateDetails?.rate,
                              discountDetails?.discountAmount
                            )
                          : 0}
                      </strong>
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
                      <strong>
                        {isProgamFee
                          ? `${
                              isNaN(
                                getConvertedAmount(
                                  conversionRateDetails?.rate,
                                  paymentDetailsJson[selectedCode]?.fee +
                                    paymentDetailsJson[selectedCode]?.rmatFee -
                                    discountDetails?.discountAmount
                                )
                              )
                                ? 0
                                : isNaN(
                                    getConvertedAmount(
                                      conversionRateDetails?.rate,
                                      paymentDetailsJson[selectedCode]?.fee +
                                        paymentDetailsJson[selectedCode]
                                          ?.rmatFee -
                                        discountDetails?.discountAmount
                                    )
                                  )
                                ? 0
                                : getConvertedAmount(
                                    conversionRateDetails?.rate,
                                    paymentDetailsJson[selectedCode]?.fee +
                                      paymentDetailsJson[selectedCode]
                                        ?.rmatFee -
                                      discountDetails?.discountAmount
                                  )
                            }`
                          : `${getConvertedAmount(
                              conversionRateDetails?.rate,
                              paymentDetailsJson[feeMode.APPLICATION]?.fee +
                                paymentDetailsJson[feeMode.APPLICATION]
                                  ?.rmatFee -
                                discountDetails?.discountAmount
                            )} 
                            `}
                      </strong>
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
