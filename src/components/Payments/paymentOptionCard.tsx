import React, { useEffect, useState } from "react";
import Image from "next/image";

import PayuInput from "./payuInput";
import {
  Grid,
  Button,
  Card,
  CardContent,
  CardActions,
  CardHeader,
} from "@mui/material";
import { PaymentTypes } from "../common/constant";
import { GetPaymentImage } from "../../Util/Util";
import { PaymentCardDetail } from "../../styles/styled";
import { feeMode } from "../common/constant";

const PaymentOptionCard = ({
  getPayuDetails,
  paymentPayload,
  paymentDetailsJson,
  isProgamFee,
  selectedCode,
  getConvertedAmount,
  discountDetails,
  conversionRateDetails,
}) => {
  const [selectedPayment, setSelectedPaymentOption] = useState<string>("");

  const getPayuPaymentUrl = () => {
    const payload = {
      amount: isProgamFee
        ? Number(
            getConvertedAmount(
              conversionRateDetails?.rate,
              Number(paymentDetailsJson[selectedCode]?.fee) +
                Number(paymentDetailsJson[selectedCode]?.rmatFee) -
                discountDetails?.discountAmount
            )
          )
        : Number(
            getConvertedAmount(
              conversionRateDetails?.rate,
              Number(paymentDetailsJson[feeMode.APPLICATION]?.fee) +
                Number(paymentDetailsJson[feeMode.APPLICATION]?.rmatFee) -
                discountDetails?.discountAmount
            )
          ),
      discountAmount: discountDetails?.discountAmount
        ? getConvertedAmount(
            conversionRateDetails?.rate,
            discountDetails?.discountAmount
          )
        : 0,
      discountCode: discountDetails?.discountCode
        ? discountDetails?.discountCode
        : discountDetails?.discountCode,
    };
    getPayuDetails(payload);
  };

  return (
    <>
      <Card>
        <CardHeader
          title="Payment Options"
          sx={{ borderBottom: " 2px solid green" }}
        />
        <CardContent>
          <Grid container display="flex" justifyContent="center">
            <Grid item xs={10} md={10}>
              <div className="d-flex justify-content-around ">
                {PaymentTypes.map(({ name, value }) => (
                  <PaymentCardDetail
                    className="mt-4"
                    onClick={() => {
                      setSelectedPaymentOption(value);
                      if (name == "Payu") {
                        getPayuPaymentUrl();
                      }
                    }}
                    key={value}
                    image={GetPaymentImage(value)}
                  >
                    {name === "Payu" ? (
                      <PayuInput
                        selectedPayment={selectedPayment}
                        paymentPayload={paymentPayload}
                        setSelectedPaymentOption={setSelectedPaymentOption}
                      />
                    ) : (
                      <form
                        id={value}
                        onSubmit={(data) => {
                          console.log("formsubmit", data);
                        }}
                      >
                        <input
                          onClick={() => undefined}
                          className="form-check-input "
                          type="radio"
                          value={value}
                          onChange={() => setSelectedPaymentOption(value)}
                          checked={selectedPayment === value}
                        />
                      </form>
                    )}
                    <Image
                      width={100}
                      height={80}
                      src={GetPaymentImage(value) as any}
                      alt={GetPaymentImage(value) as string}
                    />
                  </PaymentCardDetail>
                ))}
              </div>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Grid container display="flex" justifyContent="center" sx={{ p: 2 }}>
            <Button
              form={selectedPayment}
              type="submit"
              size="small"
              variant="contained"
              disabled={!selectedPayment}
            >
              Pay Now
            </Button>
          </Grid>
        </CardActions>
      </Card>
    </>
  );
};

export default PaymentOptionCard;
