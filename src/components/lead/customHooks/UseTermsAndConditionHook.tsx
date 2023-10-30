import { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";

const UseTermsAndConditionHook = () => {
  const [showTerms, setShowTerms] = useState(false);

  const onClickShowTerms = () => {
    setShowTerms(!showTerms);
  };

  const onChangeTerms = (value) => {
    if (value) {
      setShowTerms(true);
    } else {
      setShowTerms(false);
    }
  };

  return { showTerms, onClickShowTerms, onChangeTerms };
};

export default UseTermsAndConditionHook;
