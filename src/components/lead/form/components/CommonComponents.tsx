import { Green } from "../../../common/common";
import { StyleFeeCards } from "../../../login/style";

export const FeeCard = () => {
  return (
    <>
      <StyleFeeCards
        style={{
          border: "2px solid green",
        }}
      >
        <div className="fee-details">R 2000</div>
        <div className="fee-mode" style={{ color: `${Green}` }}>
          Online
        </div>
      </StyleFeeCards>
    </>
  );
};
