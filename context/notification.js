import * as React from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
export const NotificationContext = React.createContext(null);

export default function NotificationProvider({ children }) {
  const [message, setMessage] = React.useState(undefined);

  const handleClick = () => {
    setMessage(undefined);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setMessage(undefined);
  };
  function HandleNotify(message, callback) {
    setMessage(message);

    if (callback) {
      callback();
    }
  }

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        OK
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <NotificationContext.Provider value={{ onNotify: HandleNotify }}>
      {/* <Button onClick={handleClick}>Open simple snackbar</Button> */}
      <Snackbar
        open={Boolean(message)}
        autoHideDuration={6000}
        onClose={handleClose}
        message={message}
        action={action}
        style={{ zIndex: "9999" }}
      />
      {children}
    </NotificationContext.Provider>
  );
}
