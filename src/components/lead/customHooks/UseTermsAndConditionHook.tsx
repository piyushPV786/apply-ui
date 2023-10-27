import { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";

const UseTermsAndConditionHook = () => {
  const { watch } = useFormContext();
  const termAndConditionWatch = watch("isAgreedTermsAndConditions");
  const [showTerms, setShowTerms] = useState(false);

  console.log("termAndConditionWatch =========>", termAndConditionWatch);

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
