import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Cropper from 'react-cropper';
import './img-uploader.css';
import 'cropperjs/dist/cropper.css';
import { IMAGE_JPEG_MIME_HEADER } from '../../../utils/mime.constants';
import useSnackBars from '../../snackbar/use-snackbar';
import { checkIfMimeAccepted, format } from '../../../utils/utils';
import { useTranslation } from 'react-i18next';
import { getAcceptedImgMimeSelector } from '../../../redux/selector/shop.selector';
/**
 * Cropper component for resizing image and pre-visualize them
 * base on library react-cropper
 * @param { object } props {}
 */
export default function ImgUploader(props) {
  const [cropper, setCropper] = useState();
  const [image, setImage] = useState();
  const { showSnack } = useSnackBars();
  const { t } = useTranslation();
  const acceptedImageMime = useSelector(getAcceptedImgMimeSelector);

  useEffect(() => {
    setImage(null);
  }, []);
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
      const cropped = {
        data: cropper.getCroppedCanvas().toDataURL(),
        name: document
          .querySelector('#uploadImage')
          .value.split(/(\\|\/)/g)
          .pop(),
      };
      sessionStorage.setItem('cropped', JSON.stringify(cropped));
    }
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
    if (image && props.crop) {
      getCropData();
    }
  };
  /**
   * render function
   */
  return (
    <div>
      <input type="file" id="uploadImage" onChange={onChange} />
      {handleCrop()}
      {displayCropperIfImageSet()}
    </div>
  );
}
