import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Grid,
  Box,
  Paper,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  CardHeader,
} from "@mui/material";
import { PaymentTypes } from "../common/constant";
import { GetPaymentImage } from "../../Util/Util";
import { PaymentCardDetail } from "../../styles/styled";

const PaymentOptionCard = () => {
  const [paymentPayload] = useState<any>(null);
  const [selectedPayment, setSelectedPaymentOption] = useState<string>("");
  console.log("selectedPayment", selectedPayment);

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
                {PaymentTypes.map(({ value }) => (
                  <>
                    <PaymentCardDetail
                      className="mt-4"
                      onClick={() => setSelectedPaymentOption(value)}
                      key={value}
                      image={GetPaymentImage(value)}
                    >
                      <input
                        onClick={() => undefined}
                        className="form-check-input "
                        type="radio"
                        value={value}
                        onChange={() => setSelectedPaymentOption(value)}
                        checked={selectedPayment === value}
                      />

                      <Image
                        width={100}
                        height={80}
                        src={GetPaymentImage(value) as any}
                        alt={GetPaymentImage(value) as string}
                      />
                    </PaymentCardDetail>
                    <>
                      <form
                        method="post"
                        id={value}
                        action={paymentPayload?.paymenturl}
                      >
                        {paymentPayload &&
                          Object.keys(paymentPayload).map((item) => (
                            <input
                              key={item}
                              type="hidden"
                              name={item}
                              value={paymentPayload[item]}
                            />
                          ))}
                      </form>
                    </>
                  </>
                ))}
              </div>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Grid container display="flex" justifyContent="center" sx={{ p: 2 }}>
            <Button
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
