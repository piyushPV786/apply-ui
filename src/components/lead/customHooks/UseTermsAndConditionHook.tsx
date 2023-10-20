import { useState } from "react";

const UseTermsAndConditionHook = () => {
  const [showTerms, setShowTerms] = useState(false);

  const onClickShowTerms = () => {
    setShowTerms(!showTerms);
  };

  return { showTerms, onClickShowTerms };
};

export default UseTermsAndConditionHook;
