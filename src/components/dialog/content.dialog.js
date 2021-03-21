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
export default function ContentDialog(props) {
  const { t } = useTranslation();

  const handleClose = () => {
    if (props.onClose) {
      props.onClose();
    }
  };

  return (
    <Dialog
      title={props.title}
      open={props.isOpen}
      TransitionComponent={transition}
      keepMounted
    >
      <DialogTitle>{props.title}</DialogTitle>
      <DialogContent>{props.children}</DialogContent>
      <DialogActions>
        <Button onClick={(e) => handleClose()} color="primary">
          {t('actions.cancel')}
        </Button>
        <Button onClick={(e) => props.proceed()} color="primary" autoFocus>
          {t('actions.save')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
