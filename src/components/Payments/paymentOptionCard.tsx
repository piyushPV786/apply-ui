import React, { useEffect, useState } from "react";
import Image from "next/image";

import PayuInput from "./components/payuInput";
import { Grid } from "@mui/material";
import { PaymentTypes } from "../common/constant";
import { GetPaymentImage } from "../../Util/Util";
import { PaymentCardDetail } from "../../styles/styled";
import { useForm } from "react-hook-form";
import UkhesheInput from "./components/ukhesheInput";
import { Box } from "@material-ui/core";
import PaymentProofCard from "./paymentProofCard";
import StyledButton from "../button/button";

const PaymentOptionCard = (props) => {
  const {
    getPayuDetails,
    payuDetails,
    getPaymentRedirectURL,
    uploadPaymentProof,
    fees,
    setOpenPopup,
    disabled,
    updatePayment,
    masterData,
    paymentStatusCheck,
    removeDocument,
  } = props;
  const [check, setCheck] = useState<boolean>(false);
  const methods = useForm();
  const { register, watch, setValue } = methods;
  const onlinePaymentWatch = watch(PaymentTypes[0].registerName);
  useEffect(() => {
    setValue(PaymentTypes[0].registerName, "ukheshe");
  }, []);
  useEffect(() => {
    const payu = PaymentTypes.find((item) => item?.name === "Payu");
    if (onlinePaymentWatch && payu?.value === onlinePaymentWatch) {
      getPayuDetails();
    }
  }, [onlinePaymentWatch]);

  const handleFileExist = (file: any) => {
    if (file === undefined || file === null) setCheck(false);
    else setCheck(true);
  };

  return (
    <>
      <Grid
        container
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        {PaymentTypes.map(({ name, value, registerName, label }, index) => (
          <Grid item sm={4} md={4}>
            {name === "Ukheshe" ? (
              <UkhesheInput
                value={value}
                setOpenPopup={setOpenPopup}
                paymentStatusCheck={paymentStatusCheck}
              />
            ) : null}

            <Grid container>
              <Grid
                item
                sm={12}
                md={12}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <input
                  {...register(registerName)}
                  className="form-check-input"
                  type="radio"
                  value={value}
                  disabled={fees?.feeMode === "" || check}
                />
                <span style={{ marginLeft: "5px", marginTop: "3px" }}>
                  {label}
                </span>
              </Grid>
              <Grid
                item
                sm={12}
                md={12}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {name === "Ukheshe" ? (
                  <Image
                    width={150}
                    height={30}
                    style={{
                      position: "relative",
                      bottom: "4px",
                      marginLeft: "2px",
                    }}
                    src={GetPaymentImage(value) as any}
                    alt={GetPaymentImage(value) as string}
                  />
                ) : (
                  <Box sx={{ height: "25px" }}></Box>
                )}
              </Grid>
            </Grid>
          </Grid>
        ))}

        {onlinePaymentWatch === "offline" && (
          <PaymentProofCard
            masterData={masterData}
            uploadPaymentProof={uploadPaymentProof}
            disabled={disabled}
            updatePayment={updatePayment}
            paymentStatusCheck={paymentStatusCheck}
            handleFileExist={handleFileExist}
            removeDocument={removeDocument}
          />
        )}
      </Grid>

      {onlinePaymentWatch !== "offline" && (
        <Grid container display="flex" justifyContent="center" sx={{ p: 2 }}>
          <StyledButton
            form={onlinePaymentWatch}
            type="submit"
            disabled={!onlinePaymentWatch || fees?.feeMode == ""}
            title="Pay Now"
            style={{ width: "120px" }}
          />
        </Grid>
      )}
    </>
  );
};

export default PaymentOptionCard;
