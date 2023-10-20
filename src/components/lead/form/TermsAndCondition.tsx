import { useFormContext } from "react-hook-form";
import TermAndCondition from "../../dialog/Terms&ConditionDialog";
import UseTermsAndConditionHook from "../customHooks/UseTermsAndConditionHook";

const TermsAndCondition = (props: any) => {
  const { register, watch } = useFormContext();
  const { masterData } = props;
  const { showTerms, onClickShowTerms } = UseTermsAndConditionHook();
  const updateTermsConditions = (data) => {};

  return (
    <div className="mt-4 text-center">
      <div className="form-check text-center d-flex flex-row text-center">
        <input
          className="form-check-input me-2"
          type="checkbox"
          {...register("isAgreedTermsAndConditions", {
            required: true,
          })}
        />
        <TermAndCondition
          showTerms={showTerms}
          onClickShowTerms={onClickShowTerms}
          updateTermsConditions={updateTermsConditions}
        />
      </div>
    </div>
  );
};

export default TermsAndCondition;
