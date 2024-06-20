import { useRouter } from "next/router";
import { toast } from "react-toastify";

const UkhesheInput = ({ value, setOpenPopup, paymentStatusCheck }) => {
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const allowPayment = await paymentStatusCheck();
    if (allowPayment) {
      setOpenPopup(true);
    } else {
      toast.error("Invalid Payment Processing");
      router.push("/dashboard");
    }
  };
  return (
    <>
      <form method="post" id={value} onSubmit={handleSubmit}></form>
    </>
  );
};

export default UkhesheInput;
