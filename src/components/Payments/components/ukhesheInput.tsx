const UkhesheInput = ({ value, setOpenPopup }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    setOpenPopup(true);
  };
  return (
    <>
      <form method="post" id={value} onSubmit={handleSubmit}></form>
    </>
  );
};

export default UkhesheInput;
