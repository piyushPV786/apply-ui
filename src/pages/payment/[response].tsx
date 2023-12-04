import { useRouter } from "next/router";
import PaymentSuccessFull from "../../components/Payments/payment-successfull";
const PaymentResponse = () => {
  const router = useRouter();
  const pageType: any = router.query.response;
  return <PaymentSuccessFull pageType={pageType?.toLowerCase()} />;
};

export default PaymentResponse;
