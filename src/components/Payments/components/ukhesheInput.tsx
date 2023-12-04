const UkhesheInput = ({ value, getPaymentRedirectURL }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    getPaymentRedirectURL();
  };
  return (
    <>
      <form method="post" id={value} onSubmit={handleSubmit}></form>
    </>
  );
};

export default UkhesheInput;
