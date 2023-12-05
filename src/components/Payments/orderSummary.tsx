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
import React, { useEffect, useState } from "react";
import { CommonEnums, feeMode } from "../common/constant";
import { useDiscountHook, usePaymentDetailsHook } from "./customHook";
import { FormProvider, useForm } from "react-hook-form";
import StyledButton from "../button/button";
import { DeleteOutline, CheckCircle } from "@material-ui/icons";
import { Green } from "../common/common";

const OrderSummary = (props) => {
  const { studyModes, fees, masterData, updateFeeMode } = props;
  return (
    <Card>
      <Grid container spacing={2}>
        <Grid item md={12} xs={12} sx={{ borderBottom: " 2px solid green" }}>
          <Typography variant="h6" color="primary" sx={{ p: 2, pt: 2 }}>
            Order Summary
          </Typography>
        </Grid>
        <Grid item md={8} xs={8}>
          <ProgramFees
            masterData={masterData}
            studyModes={studyModes}
            fees={fees}
            updateFeeMode={updateFeeMode}
          />
        </Grid>
        <Grid item md={4} xs={4}>
          <FinalFees
            masterData={masterData}
            studyModes={studyModes}
            fees={fees}
          />
        </Grid>
      </Grid>
    </Card>
  );
};

const ProgramFees = (props) => {
  const { masterData, studyModes, fees, updateFeeMode } = props;
  const methods = useForm();
  const { register, watch } = methods;
  const data = watch("feeModeCode");
  useEffect(() => {
    updateFeeMode(data);
  }, [data]);
  return (
    <Grid container spacing={4} sx={{ p: 3 }}>
      <Grid item md={6} xs={12}>
        <label>Proposal Qualification</label>
        <Typography variant="body1">
          <strong>{masterData?.feeData?.programName}</strong>
        </Typography>
      </Grid>
      <Grid item md={7} xs={12}>
        <Grid>
          <Grid>
            <label>Study Mode</label>
            <Typography variant="body1">
              <strong>{studyModes?.studyModeCode}</strong>(
              {studyModes?.helpText} )
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item md={7} xs={12}>
        {masterData?.applicationData?.status !==
          CommonEnums.FEES_PENDING_STATUS && (
          <Grid>
            <label>Fee Mode</label>
            <Grid>
              {studyModes?.fees?.map((item, index) => {
                if (
                  item?.feeMode !== feeMode.APPLICATION &&
                  item?.feeMode !== feeMode.TOTAL
                ) {
                  return (
                    <div className="form-check form-check-inline">
                      <input
                        {...register("feeModeCode", {
                          required: {
                            value: true,
                            message: "Please select Fee mode",
                          },
                        })}
                        key={index}
                        className="form-check-input me-2"
                        type="radio"
                        value={item?.feeMode}
                      />
                      <label className="form-check-label">
                        {item?.feeMode}
                        <br />
                        <Typography>R{item?.fee}</Typography>
                      </label>
                    </div>
                  );
                }
              })}
            </Grid>
          </Grid>
        )}
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
  );
};

const FinalFees = (props) => {
  const { masterData, studyModes, fees } = props;

  const {
    showDiscount,
    toggleDiscount,
    applyDiscount,
    resetDiscount,
    discount,
  } = useDiscountHook(masterData, fees);
  const methods = useForm();
  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  useEffect(() => {
    methods.setValue("discountCode", "");
  }, [fees.discountAmount]);

  return (
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
            {fees?.rmatAmount && (
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
            )}
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

          {fees.feeMode != "" && (
            <Grid
              container
              spacing={5}
              className="pb-2 pt-2"
              display="flex"
              justifyContent="center"
            >
              <Grid
                item
                xs={12}
                display="flex"
                justifyContent="center"
                className="cursor-pointer"
              >
                <StyledLink onClick={toggleDiscount}>
                  Have a promo code?
                </StyledLink>
              </Grid>

              {showDiscount && (
                <FormProvider {...methods}>
                  <form>
                    {discount?.max == 0 ? (
                      <Grid xs={12} spacing={1} container>
                        <Grid xs={9} item>
                          <TextField
                            placeholder="Enter Promo Code"
                            fullWidth
                            {...methods?.register("discountCode", {
                              required: {
                                value: true,
                                message: "This field is required",
                              },
                            })}
                          />
                        </Grid>
                        <Grid xs={3} item>
                          <StyledButton
                            onClick={handleSubmit((d) => {
                              applyDiscount(d);
                            })}
                            title="Apply"
                            className="p-3"
                          />
                        </Grid>
                      </Grid>
                    ) : (
                      <Grid container spacing={2}>
                        <Grid xs={12} item>
                          <Grid
                            item
                            xs={12}
                            display="flex"
                            justifyContent="center"
                          >
                            <Typography>
                              Promo Code : {`      `}
                              <strong>{discount.code}</strong>
                            </Typography>
                            <Typography
                              color={"red"}
                              className="cursor-pointer"
                              onClick={() => {
                                resetDiscount();
                              }}
                            >
                              <DeleteOutline />
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid
                          xs={12}
                          item
                          display="flex"
                          justifyContent="center"
                        >
                          <Typography color={Green}>
                            <CheckCircle />
                            <strong>
                              {`You have saved ${fees.discountAmount} on this application`}
                            </strong>
                          </Typography>
                        </Grid>
                      </Grid>
                    )}
                  </form>
                </FormProvider>
              )}
            </Grid>
          )}
        </CardContent>
      </PaymentCard>
    </Grid>
  );
};

export default OrderSummary;
