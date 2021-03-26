import React, { useEffect } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grow,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';

/**
 *@param props:  {
 *   isOpen: state boolean => true means dialog is shown
 *   setIsOpen: state function => to change show / hide state boolean
 *   onClose: function that add processing after closing (other than closing / hiding the dialog)
 *   onContinue: function that handle accept
 * }
 */
function transition(p) {
  return <Grow {...p} />;
}
export function AlertDialog({
  titleKey,
  onClose,
  onCancel,
  onContinue,
  isOpen,
  textContentKey,
  textContent,
}) {
  const { t } = useTranslation();

  const onCloseHandler = () => {
    if (onClose) {
      onClose();
    } else if (onCancel) {
      onCancel();
    }
  };

  const defaultTitle = () => {
    return titleKey ? t(titleKey) : t('components.alertDialog.defaultTitle');
  };
  const handleContinue = () => {
    if (isOpen) {
      if (onContinue) {
        onContinue();
      }
      onCloseHandler();
    }
  };
  const getContent = () => {
    if (textContent) {
      return textContent;
    }
    return t(textContentKey);
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
    onCloseHandler();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onCloseHandler}
      aria-labelledby="alert"
      TransitionComponent={transition}
      keepMounted
    >
      <DialogTitle id="alert">{defaultTitle()}</DialogTitle>
      <DialogContent>
        <DialogContentText>{getContent()}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={(e) => handleCancel()} color="primary">
          {t('actions.cancel')}
        </Button>
        <Button onClick={(e) => handleContinue()} color="primary" autoFocus>
          {t('actions.continue')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
