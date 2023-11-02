const PayuInput = ({ payuDetails, value }) => {
  console.log("payuDetails", payuDetails);
  return (
    <>
      <form method="post" id={value} action={payuDetails?.paymenturl}>
        {payuDetails &&
          Object.keys(payuDetails).map((item) => (
            <input
              key={item}
              type="hidden"
              name={item}
              value={payuDetails[item]}
            />
          ))}
      </form>
    </>
  );
};
export default PayuInput;
