import { useFormContext } from "react-hook-form";
import TermAndCondition from "../../dialog/Terms&ConditionDialog";
import UseTermsAndConditionHook from "../customHooks/UseTermsAndConditionHook";

const TermsAndCondition = (props: any) => {
  const { register, watch, setValue } = useFormContext();
  const { masterData } = props;
  const { showTerms, onClickShowTerms, onChangeTerms } =
    UseTermsAndConditionHook();
  const updateTermsConditions = (data) => {
    setValue("lead.isAgreedTermsAndConditions", data);
  };

  return (
    <div className="mt-4 text-center">
      <div className="form-check text-center d-flex flex-row text-center">
        <input
          className="form-check-input me-2"
          type="checkbox"
          {...register("lead.isAgreedTermsAndConditions", {
            required: true,
          })}
          onChange={(e) => onChangeTerms(e.target.checked)}
        />
        <TermAndCondition
          showTerms={showTerms}
          onClickShowTerms={onClickShowTerms}
          updateTermsConditions={updateTermsConditions}
          name={`${watch("lead.firstName")} ${watch("lead.lastName")}`}
          email={watch("lead.email")}
        />
      </div>
    </div>
  );
};

export default TermsAndCondition;
