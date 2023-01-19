import { useRouter } from "next/router";
import PaymentSuccessFull from "../../components/payment/payment-successfull";
const PaymentResponse = () => {
  const router = useRouter();
  const pageType = router.query.response;
  return <PaymentSuccessFull pageType={pageType?.toLowerCase()} />;
};

export default PaymentResponse;
