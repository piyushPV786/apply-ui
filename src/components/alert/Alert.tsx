import {
  Info,
  ErrorOutline,
  Warning,
  CheckCircleOutline,
} from "@material-ui/icons/";

type alertProps = {
  children: string;
  severity?: "info" | "danger" | "warning" | "success";
};
const alertStyle = {
  maxWidth: "400px",
};

const AlertBox = ({ children, severity = "info" }: alertProps) => {
  return (
    <div
      className={`p-2 d-flex shadow border-start border-primary border-4 rounded-end align-items-center bg-${severity}`}
      style={alertStyle}
    >
      {severity === "info" && (
        <Info
          fontSize="large"
          color="primary"
          style={{ paddingRight: "10px" }}
        />
      )}
      {severity === "danger" && (
        <ErrorOutline
          fontSize="large"
          color="secondary"
          style={{ paddingRight: "10px" }}
        />
      )}
      {severity === "warning" && (
        <Warning
          fontSize="large"
          color="error"
          style={{ paddingRight: "10px" }}
        />
      )}
      {severity === "success" && (
        <CheckCircleOutline
          fontSize="large"
          color="inherit"
          style={{ paddingRight: "10px" }}
        />
      )}

      {children}
    </div>
  );
};

export default AlertBox;
