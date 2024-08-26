import { useEffect, useState } from "react";
import ApplicationFormServices from "../../../services/applicationForm";

export const useEducationHook = (programCode: string) => {
  const [studentProgramData, setStudentProgramData] = useState(null);
  const getStudentProgramData = async () => {
    const data = await ApplicationFormServices?.getStudentProgram(programCode);
    if (data) {
      const programData = data.find(
        (item) => item?.programCode === programCode,
      );
      if (programData) {
        const feeModesOrder = [
          "MONTHLY",
          "SEMESTER",
          "APPLICATION",
          "ANNUALLY",
          "TOTAL",
        ];
        programData.studyModes = programData.studyModes.map((obj) => ({
          ...obj,
          fees: obj.fees.sort(
            (a, b) =>
              feeModesOrder.indexOf(a.feeMode) -
              feeModesOrder.indexOf(b.feeMode),
          ),
        }));
        setStudentProgramData(programData);
      } else {
        setStudentProgramData(null);
      }
    }
  };

  useEffect(() => {
    if (programCode) {
      getStudentProgramData();
    }
  }, [programCode]);

  return studentProgramData;
};
