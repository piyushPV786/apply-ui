import { styled, Card, Theme } from "@mui/material";
export const DragDropContainer = styled<any>("div")(() => ({
  background: "#dbe7e3",
  maxHeight: "300px",
  display: "flex",
  padding: "1rem",
  cursor: "pointer",
}));

export const PaymentCard = styled(Card)(({}: { theme: Theme }) => ({
  background: "#f2f2f2 !important",
  borderRadius: "20px 20px",
  boxShadow: "10px 10px 10px #f0eded",
  width: "100%",
  marginBottom: "20px",
}));

export const StyledLink = styled("a")(({}) => ({
  fontSize: "14px",
  color: "#008554",
  textDecoration: "underline",
}));
export const PaymentCardDetail = styled<any>("div")(() => {
  return {
    textAlign: "center",
    width: "100%",
    cursor: "pointer",
    borderRadius: "4px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
});
