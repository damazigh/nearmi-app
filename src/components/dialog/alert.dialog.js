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
export function AlertDialog(props) {
  const { t } = useTranslation();

  const onCloseHandler = () => {
    if (props.onClose) {
      props.onClose();
    }
  };

  useEffect(() => console.log('je suis: ' + props.isOpen));
  const defaultTitle = () => {
    return props.titleKey
      ? t(props.titleKey)
      : t('components.alertDialog.defaultTitle');
  };
  const handleContinue = () => {
    if (props.isOpen) {
      if (props.onContinue) {
        props.onContinue();
      }
      onCloseHandler();
    }
  };

  const handleCancel = () => {
    if (props.onCancel) {
      props.onCancel();
      console.info('canceled');
    }
    console.info(props.isOpen);
    onCloseHandler();
  };

  return (
    <Dialog
      open={props.isOpen}
      onClose={onCloseHandler()}
      aria-labelled-by="alert"
      TransitionComponent={transition}
      keepMounted
    >
      <DialogTitle id="alert">{defaultTitle()}</DialogTitle>
      <DialogContent>
        <DialogContentText>{t(props.textContentKey)}</DialogContentText>
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
