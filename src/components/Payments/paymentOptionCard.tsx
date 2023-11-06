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
import { useForm } from "react-hook-form";

const PaymentOptionCard = (props) => {
  const { getPayuDetails, payuDetails } = props;
  const methods = useForm();
  const { register, watch } = methods;
  const onlinePaymentWatch = watch(PaymentTypes[0].registerName);
  useEffect(() => {
    const payu = PaymentTypes.find((item) => item?.name === "Payu");
    if (onlinePaymentWatch && payu?.value === onlinePaymentWatch) {
      getPayuDetails();
    }
  }, [onlinePaymentWatch]);
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
                {PaymentTypes.map(({ name, value, registerName }) => (
                  <>
                    <PaymentCardDetail className="mt-4" key={value}>
                      {name === "Payu" ? (
                        <PayuInput value={value} payuDetails={payuDetails} />
                      ) : null}
                      <input
                        {...register(registerName)}
                        className="form-check-input "
                        type="radio"
                        value={value}
                        style={{ position: "relative" }}
                      />
                      <Image
                        width={100}
                        height={80}
                        src={GetPaymentImage(value) as any}
                        alt={GetPaymentImage(value) as string}
                      />
                    </PaymentCardDetail>
                  </>
                ))}
              </div>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Grid container display="flex" justifyContent="center" sx={{ p: 2 }}>
            <Button
              form={onlinePaymentWatch}
              type="submit"
              size="small"
              variant="contained"
              disabled={!onlinePaymentWatch}
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
