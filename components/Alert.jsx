"use client";

import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function AlertDialog({ deleteHandler, type, btnName }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    await deleteHandler();
    setOpen(false);
  };

  return (
    <React.Fragment>
      <button
        onClick={handleClickOpen}
        className={
          btnName === "Delete Order" ||
          btnName === "Delete User" ||
          btnName === "Delete Product"
            ? "bg-red-500 mt-5 text-sm font-semibold text-white px-10 py-2 rounded-lg cursor-pointer"
            : ""
        }
      >
        {btnName}
      </button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{""}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {` Are you sure you want to delete this ${type} ?`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDelete}>
            <strong>Yes</strong>
          </Button>
          <Button onClick={handleClose} autoFocus>
            <strong>No</strong>
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
