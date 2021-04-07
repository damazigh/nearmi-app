import 'cropperjs/dist/cropper.css';
import React, { useEffect, useState } from 'react';
import Cropper from 'react-cropper';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getAcceptedImgMimeSelector } from '../../../redux/selector/shop.selector';
import { CUSTOM_EVT_IMG_UPLOADER_UPLOAD } from '../../../utils/events-custom.constants';
import {
  attachEvtListener,
  checkIfMimeAccepted,
  format,
  removeEvtListener,
} from '../../../utils/utils';
import useSnackBars from '../../snackbar/use-snackbar';
import './img-uploader.css';
import Logger from 'js-logger';

/**
 * Cropper component for resizing image and pre-visualize them
 * base on library react-cropper
 * @param cleanup: cleanup function
 *
 */
export default function ImgUploader({ uploadImageHandler }) {
  const [cropper, setCropper] = useState();
  const [image, setImage] = useState();
  const { showSnack } = useSnackBars();
  const { t } = useTranslation();
  const acceptedImageMime = useSelector(getAcceptedImgMimeSelector);

  useEffect(() => {
    Logger.debug(
      '[ImgUploader] - attaching callback handleCrop to event ' +
        CUSTOM_EVT_IMG_UPLOADER_UPLOAD
    );
    attachEvtListener(
      '#uploadImage',
      CUSTOM_EVT_IMG_UPLOADER_UPLOAD,
      handleCrop
    );
    return () => {
      Logger.debug('[ImgUploader] -  cleanup component image uploader');
      Logger.debug(
        '[ImgUploader] - removing callback handleCrop to event ' +
          CUSTOM_EVT_IMG_UPLOADER_UPLOAD
      );
      removeEvtListener(
        '#uploadImage',
        CUSTOM_EVT_IMG_UPLOADER_UPLOAD,
        handleCrop
      );
    };
  }, [image, cropper]);
  /**
   * get uploaded files
   * @param {*} e
   */
  const onChange = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      Logger.debug('[ImgUploader] - image state setted after on load');
      setImage(reader.result);
    };
    reader.onloadend = (e) => {
      if (e.target.readyState === FileReader.DONE) {
        const blob = atob(e.target.result.split(',')[1]);
        const bytes = Uint8Array.from(blob, (c) => c.charCodeAt(0));
        const arr = new Uint8Array(bytes).slice(0, 4);
        let header = '';
        for (let i = 0; i < arr.length; i++) {
          header += arr[i].toString(16);
        }
        if (!checkIfMimeAccepted(acceptedImageMime, header)) {
          document.querySelector('#uploadImage').value = '';
          showSnack(
            format(t('feedback.NotExpectedFileType'), ['image']),
            'error'
          );
          setImage(null);
          document.querySelector('#uploadImage').value = '';
        }
      }
    };
    if (files[0]) reader.readAsDataURL(files[0]);
  };

  /**
   * update the cropped cropped image as dataUrl
   */
  const getCropData = () => {
    if (typeof cropper !== 'undefined') {
      return {
        data: cropper.getCroppedCanvas().toDataURL(),
        name: document
          .querySelector('#uploadImage')
          .value.split(/(\\|\/)/g)
          .pop(),
      };
    }
    return null;
  };

  /**
   * display cropper only when a file is selected
   */
  const displayCropperIfImageSet = () => {
    if (image) {
      return (
        <Cropper
          style={{ height: 'auto', width: '100%' }}
          zoomTo={1}
          initialAspectRatio={0.5}
          src={image}
          viewMode={1}
          guides={true}
          minCropBoxHeight={10}
          minCropBoxWidth={10}
          background={false}
          responsive={true}
          autoCropArea={1}
          checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
          onInitialized={(instance) => {
            setCropper(instance);
          }}
        />
      );
    }
    return <></>;
  };

  /**
   * handle click on crop
   */
  const handleCrop = () => {
    Logger.debug('[ImgUploader] - handle crop triggered !');
    const data = getCropData();
    uploadImageHandler(data, () => {
      setImage(null);
    });
  };
  /**
   * render function
   */
  return (
    <div>
      <input type="file" id="uploadImage" onChange={onChange} />
      {displayCropperIfImageSet()}
    </div>
  );
}
