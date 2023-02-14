import { Alert } from "@mui/material";

const AlertBox = ({ children }) => {
  return (
    <Alert
      severity="info"
      sx={{
        maxWidth: "400px",
        alignItems: "center",
        backgroundColor: "#d9f3f6 !important",
        borderLeft: "#28a4fb solid 5px",
      }}
    >
      {children}
    </Alert>
  );
};

export default AlertBox;
