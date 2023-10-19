import { useRouter } from "next/router";
import Index from ".";

const CheckoutResponse = () => {
  const router = useRouter();
  const { slugs } = router.query as any;

  return (
    <Index
      applicationCode={slugs && slugs[0]}
      studentType={slugs && slugs[1]}
    />
  );
};

export default CheckoutResponse;
