import { useFormContext } from "react-hook-form";

const TermsAndCondition = (props: any) => {
  const { register, watch } = useFormContext();
  const { masterData } = props;

  return (
    <div className="container-fluid form-padding">
      <div className="col-lg-4 mb-4"></div>
      <div className="col-lg-4 mb-4"></div>
      <div className="col-lg-4 mb-4"></div>
    </div>
  );
};

export default TermsAndCondition;
