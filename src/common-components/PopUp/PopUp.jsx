import React, { useEffect, useState } from 'react';
import { Snackbar, Alert } from '@mui/material';

const PopUp = ({ status, message }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Reopen Snackbar when status or message changes
    if (status && message) {
      setOpen(true);
      const timer = setTimeout(() => {
        setOpen(false);
      }, 3000); // Auto-hide after 3 seconds

      return () => clearTimeout(timer); // Cleanup timer

    }
  }, [status, message]);  // Trigger effect when status or message changes

  const getBackgroundColor = () => {
    switch (status) {
      case 'success':
        return '#4caf50'; // Green for success
      case 'error':
        return '#f44336'; // Red for error
      case 'info':
        return '#2196f3'; // Blue for info
      case 'warning':
        return '#ff9800'; // Orange for warning
      default:
        return '#2196f3'; // Default to blue (info)
    }
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert
        severity={status}
        sx={{
          width: '100%',
          minWidth: '300px',
          marginTop: '55px',
          color: 'white',
          backgroundColor: getBackgroundColor(),
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default PopUp;
