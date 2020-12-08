import React from 'react';
import { Snackbar } from '@material-ui/core';
import { createContext, useState } from 'react';
import { Alert } from '@material-ui/lab';

export const SnackBarContext = createContext();

const AUTO_DISMISS = 5000;

export function SnackBarProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('');

  const showSnack = (message, severity) => {
    setOpen(true);
    setMessage(message);
    setSeverity(severity);
    setTimeout(() => {
      setOpen(false);
      setMessage('');
      setSeverity('');
    }, AUTO_DISMISS + 100);
  };
  const value = { showSnack };

  return (
    <SnackBarContext.Provider value={value}>
      {children}
      <Snackbar autoHideDuration={AUTO_DISMISS} open={open}>
        <Alert severity={severity}>{message}</Alert>
      </Snackbar>
    </SnackBarContext.Provider>
  );
}
