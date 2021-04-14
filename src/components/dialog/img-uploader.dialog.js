import React, { useState, useEffect, useCallback } from 'react';
import {
  CUSTOM_EVT_DIALOG_UPLOADER_DISPLAY,
  CUSTOM_EVT_IMG_UPLOADER_UPLOAD,
} from '../../utils/events-custom.constants';
import {
  attachEvtListener,
  attachEvtListener2Document,
  dispatchCustomEvent,
  removeEvtListener,
  removeEvtListenerFromDocument,
} from '../../utils/utils';
import ImgUploader from '../images/img-uploader/img-uploader';
import ContentDialog from './content.dialog';
import Logger from 'js-logger';
import { useTranslation } from 'react-i18next';
import useSnackBars from '../snackbar/use-snackbar';

export default function ImgUploaderDialog({ uploadHandler }) {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();
  const { showSnack } = useSnackBars();
  const dispalyPopup = useCallback(() => setIsOpen(true));

  useEffect(() => {
    attachEvtListener2Document(
      CUSTOM_EVT_DIALOG_UPLOADER_DISPLAY,
      dispalyPopup,
      true
    );
    return () => {
      removeEvtListenerFromDocument(
        CUSTOM_EVT_DIALOG_UPLOADER_DISPLAY,
        dispalyPopup,
        true
      );
    };
  }, []);

  return (
    <ContentDialog
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      proceed={() => {
        dispatchCustomEvent(null, CUSTOM_EVT_IMG_UPLOADER_UPLOAD);
        setIsOpen(false);
      }}
      title={t('components.dialogUploader.uploadNewImage')}
    >
      <ImgUploader uploadImageHandler={uploadHandler} />
    </ContentDialog>
  );
}
