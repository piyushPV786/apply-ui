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
  borderRadius: "50px 20px",
  boxShadow: "10px 10px 10px #f0eded",
  width: "100%",
  padding: 5,
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
    height: "90px",
    cursor: "pointer",
    border: "2px solid #008554",
    margin: "0.2rem",
    borderRadius: "4px",
    display: "flex",
    justifyContent: "center",
    input: {
      marginTop: "8px",
    },
    "&:hover": {
      backgroundColor: "#dbe7e3",
    },
  };
});
