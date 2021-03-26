import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grow,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';

function transition(p) {
  return <Grow {...p} />;
}
export default function ContentDialog({
  onClose,
  title,
  isOpen,
  children,
  proceed,
  hasDialogTitle = true,
}) {
  const { t } = useTranslation();

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <Dialog
      title={title}
      open={isOpen}
      TransitionComponent={transition}
      keepMounted
    >
      {hasDialogTitle ? <DialogTitle>{title}</DialogTitle> : null}{' '}
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button onClick={(e) => handleClose()} color="primary">
          {t('actions.cancel')}
        </Button>
        <Button onClick={(e) => proceed()} color="primary" autoFocus>
          {t('actions.save')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
