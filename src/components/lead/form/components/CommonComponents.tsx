import { Green } from "../../../common/common";
import { StyleFeeCards } from "../../../login/style";

export const FeeCard = ({ item }: any) => {
  return (
    <>
      <StyleFeeCards
        className="col-md-3"
        style={{
          marginRight: "5px",
          border: "2px solid green",
          marginBottom: "10px",
        }}
      >
        <div className="fee-details">R {item?.fee}</div>
        <div className="fee-mode" style={{ color: `${Green}` }}>
          {item?.feeMode}
        </div>
      </StyleFeeCards>
    </>
  );
};
