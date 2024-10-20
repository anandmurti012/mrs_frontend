import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import AdminForm from './AdminForm';

const AdminBooking = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <button style={{fontSize:'17px',padding:'7px'}} className='btn btn-primary' onClick={handleClickOpen}>
        <strong>Book an Appointment</strong>
      </button>
      
      {/* Modal/Dialog for UserForm */}
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>Admin Booking Form</DialogTitle>
        <DialogContent>
          {/* UserForm in the modal */}
          <AdminForm />
        </DialogContent>
        <DialogActions>
          <button style={{fontSize:'17px', marginRight:'10px'}} onClick={handleClose}>Close</button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AdminBooking;
