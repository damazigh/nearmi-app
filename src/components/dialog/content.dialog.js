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
import Logger from 'js-logger';

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
  fullWidth,
  disableMainAction,
}) {
  const { t } = useTranslation();

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  const isMainActionDisabled = () => {
    if (disableMainAction) {
      return disableMainAction();
    }
    return false;
  };

  return (
    <Dialog
      title={title}
      open={isOpen}
      TransitionComponent={transition}
      keepMounted
      fullWidth={fullWidth}
    >
      {hasDialogTitle ? <DialogTitle>{title}</DialogTitle> : null}
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button onClick={(e) => handleClose()} color="primary">
          {t('actions.cancel')}
        </Button>
        <Button
          onClick={(e) => proceed()}
          color="primary"
          autoFocus
          disabled={isMainActionDisabled()}
        >
          {t('actions.save')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
