import { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";

const UseTermsAndConditionHook = () => {
  const { watch } = useFormContext();
  const termAndConditionWatch = watch("lead.isAgreedTermsAndConditions");
  const [showTerms, setShowTerms] = useState(false);

  const onClickShowTerms = () => {
    setShowTerms(!showTerms);
  };

  useEffect(() => {
    if (termAndConditionWatch) {
      setShowTerms(true);
    } else {
      setShowTerms(false);
    }
  }, [termAndConditionWatch]);

  return { showTerms, onClickShowTerms };
};

export default UseTermsAndConditionHook;
