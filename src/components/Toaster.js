// external imports
import React from "react";
import { Alert, Snackbar } from "@mui/material";

// Toaster Component
const Toaster = ({ open = false, message = "", variant = "success", handleClose }) => (
  <Snackbar
    open={open}
    onClose={handleClose}
    autoHideDuration={6000}
    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}>
    <Alert onClose={handleClose} severity={variant} sx={{ width: "100%" }}>
      {message}
    </Alert>
  </Snackbar>
);

export default Toaster;
