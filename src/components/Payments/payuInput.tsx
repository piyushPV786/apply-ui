const PayuInput = ({
  selectedPayment,
  paymentPayload,
  setSelectedPaymentOption,
}) => {
  return (
    <>
      <input
        className="form-check-input "
        type="radio"
        value={"payuForm"}
        onChange={() => setSelectedPaymentOption("payuForm")}
        checked={selectedPayment === "payuForm"}
      />
      <form method="post" id={"payuForm"} action={paymentPayload?.paymenturl}>
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
  );
};
export default PayuInput;
