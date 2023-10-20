import PaymentServices from "../../services/payment";
import { Toaster } from "../common/common";
import { IPaymentPayload } from "./commonDataType";

const CustomHookPayment = () => {
  const paymentDiscount = async (payload: IPaymentPayload) => {
    await PaymentServices.applicationDiscount(payload);
  };

  return { paymentDiscount };
};
export default CustomHookPayment;
