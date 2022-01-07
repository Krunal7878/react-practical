import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

export default function DeleteDialog(props) {
  return (
      <Dialog
        open={props.isDeleteOpen}
        onClose={props.handleDeleteClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
           Are you sure you want to delete this product?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleDeleteClose}>Cancel</Button>
          <Button onClick={props.handleDelete} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
  );
}