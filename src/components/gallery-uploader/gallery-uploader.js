import { Button, Grid } from '@material-ui/core';
import React, { useState, useEffect, useCallback } from 'react';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import { dispatchCustomEvent } from '../../utils/utils';
import ImgUploaderDialog from '../dialog/img-uploader.dialog';
import { CUSTOM_EVT_DIALOG_UPLOADER_DISPLAY } from '../../utils/events-custom.constants';
import MyGallery from '../images/my-gallery/my-gallery';
import {
  GALLERY_EDITION_MODE,
  GALLERY_VISUALIZATION_MODE,
} from '../../utils/constants';
import { useTranslation } from 'react-i18next';
import ProductService from '../../service/product.service';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Logger from 'js-logger';

/**
 *
 * @param {boolean} inMemory `true` image are loaded from memory
 * @param {boolean} trackMetadata `true` metadata are tracked and stored in sessionStorage
 *
 */
export default function GalleryAndUploader({
  inMemory,
  providedMeta,
  trackMetadata = false,
}) {
  // translation hook
  const { t } = useTranslation();
  // in memory metadata
  const [metadata, setMetadata] = useState([]);
  // selected
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    if (inMemory && trackMetadata && metadata && metadata.length > 0) {
      sessionStorage.setItem(
        'productGalleryMetadata',
        JSON.stringify(metadata)
      );
      return () => {
        delete sessionStorage.productGalleryMetadata;
      };
    }
  }, [metadata]);

  const inMemoryUploadHandler = (data) => {
    const res = ProductService.createInMemoryImage(data);
    setMetadata((old) => [...old, res]);
  };

  /**
   * callback
   * @param {*} add flag to distinguish selection and unselection
   * @param {*} imgName img name to add / remove from tracked selected images
   */
  const updateSelected = useCallback((add, imgName) => {
    Logger.debug((add ? 'add ' : 'false ') + imgName);
    if (add) {
      setSelected((prev) => [...prev, imgName]);
    } else {
      setSelected((prev) => prev.filter((i) => i !== imgName));
    }
  });

  const deleteSelected = () => {
    selected.forEach((url) => {
      Logger.debug('revoke url ' + url);
      URL.revokeObjectURL(url);
    });
    setMetadata((prev) => prev.filter((m) => !selected.includes(m.url)));
    setSelected([]);
  };

  return (
    <>
      <Grid container>
        <Grid item xs={12} md={12} sm={12}>
          <div
            className={`${
              !metadata || metadata.length === 0 ? 'flex jc-center' : ''
            } full-width`}
          >
            <MyGallery
              mode={GALLERY_EDITION_MODE}
              updateSelected={updateSelected}
              metadata={metadata}
              inMemory={inMemory}
            />
          </div>
        </Grid>
        <Grid
          item
          xs={12}
          md={12}
          sm={12}
          className="flex dir-row-reverse m-t-alt1"
        >
          <Button
            color="secondary"
            variant="outlined"
            endIcon={<AddAPhotoIcon />}
            onClick={() =>
              dispatchCustomEvent(
                '#popupUploader',
                CUSTOM_EVT_DIALOG_UPLOADER_DISPLAY
              )
            }
          >
            {t('actions.add')}
          </Button>
          {selected && selected.length > 0 ? (
            <Button
              color="secondary"
              variant="outlined"
              endIcon={<DeleteForeverIcon />}
              onClick={() => deleteSelected()}
              className="m-r-alt1"
            >
              {t('actions.delete')}
            </Button>
          ) : null}
        </Grid>
        {/**img upload dialog */}
      </Grid>
      <ImgUploaderDialog
        uploadHandler={
          inMemory ? inMemoryUploadHandler : () => console.log('handler')
        }
      />
    </>
  );
}
