// external imports
import React from "react";
import { Alert, Snackbar } from "@mui/material";

// Toaster
const Toaster = ({ open = false, message = "", type = "success", handleClose }) => (
  <Snackbar
    open={open}
    onClose={handleClose}
    autoHideDuration={6000}
    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}>
    <Alert onClose={handleClose} severity={type} sx={{ width: "100%" }}>
      {message}
    </Alert>
  </Snackbar>
);

export default Toaster;
