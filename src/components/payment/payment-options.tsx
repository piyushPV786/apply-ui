import React from "react";
import styled from "styled-components";
import { DefaultGrey, Green, GreenFormHeading } from "../common/common";
import { useFormContext } from "react-hook-form";
import StyledButton from "../button/button";
import { PaymentTypes } from "../common/constant";
import { GetPaymentImage } from "../../Util/Util";
const imgUrl = "/assets/images";
const PaymentCard = (props: any) => {
  return (
    <StyledImgCard
      paymentType={props?.paymentType}
      color={props?.color}
      img={props?.img}
    >
      {props?.children}
    </StyledImgCard>
  );
};
const PaymentOption = (props: any) => {
  const { watch, register } = useFormContext();
  const allFields = watch();

  return (
    <>
      <MainContainer>
        {" "}
        <PaymentHeading>
          <div className="col-md-12">
            <StyleHeading>
              <GreenFormHeading style={{ fontSize: "20px" }}>
                Payment Options
              </GreenFormHeading>
            </StyleHeading>
          </div>
        </PaymentHeading>
        <PaymentContainer>
          <div className="row">
            {PaymentTypes.map(({ name, value }) => (
              <div className="col-md-4 mb-2">
                <PaymentCardContainer>
                  <PaymentCard
                    paymentType={name}
                    color={name === "Payu" ? Green : DefaultGrey}
                    img={GetPaymentImage(name)}
                  >
                    <div className="form-check form-check-inline m-0 mt-2">
                      <input
                        className="form-check-input "
                        type="radio"
                        {...register(`payment.paymentType`, { required: true })}
                        value={value}
                        checked={allFields?.payment?.paymentType === value}
                      />
                    </div>
                  </PaymentCard>
                </PaymentCardContainer>
              </div>
            ))}
          </div>
        </PaymentContainer>
        <div className="container">
          <div className="row">
            <div className="col align-self-center text-center ">
              <StyledButton
                disabled={!allFields?.payment?.paymentType}
                onClick={() => {}}
                title="Pay Now"
              />
            </div>
          </div>
        </div>
      </MainContainer>
    </>
  );
};

export default PaymentOption;

const MainContainer = styled.div`
  background: #fff;
  width: 100%;
  height: 100%;
  margin: 1rem 0;
`;

const PaymentContainer = styled.div<any>`
  width: 100%;
  padding: 1rem 10px;
  
  .form-check .form-check-input {
    margin-left: -0.8em!important;

  }
}
`;

const PaymentCardContainer = styled.div<any>``;

const PaymentHeading = styled(PaymentContainer)`
  border-bottom: 2px solid ${Green};
  padding: 1rem 10px;
`;
const StyleHeading = styled.div``;

const StyledImgCard = styled.div<any>`
  background: ${({ color }) => {
    return color && `${color}`;
  }};
  text-align: center;
  width: 100%;
  height: 90px;
  cursor: pointer;
  background-image: ${({ img }) => {
    return img && `url(${img})`;
  }};
  ${({ paymentType }) => {
    if (paymentType === "RazorPay") {
      return `
        background-position: 35px 50px;
    background-repeat: no-repeat;
    background-size: 115px;
        `;
    }
    if (paymentType === "Payu") {
      return `
      background-position: 41px 31px;
      background-repeat: no-repeat;
      background-size: 104px;
        `;
    }
    if (paymentType === "Stripe") {
      return `
      background-position: 42px 40px;
      background-repeat: no-repeat;
      background-size: 90px;
        `;
    }
  }}
  @media (max-width: 590px) {
    background-position: center;
  }
`;
