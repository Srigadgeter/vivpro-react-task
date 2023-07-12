// external imports
import React from "react";
import { Alert, Snackbar } from "@mui/material";

/**
 *
 * @param {boolean} open - State of the toaster
 * @param {string} message - Message of the toaster
 * @param {string} variant - variant of the toaster
 * @param {function} handleClose - Handler helps to close the toaster
 *
 */

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
