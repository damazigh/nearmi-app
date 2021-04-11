import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Fab, Grid } from '@material-ui/core';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import { Alert } from '@material-ui/lab';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getMaxImageForShopSelector } from '../../../redux/selector/shop.selector';
import Secured from '../../../security/secured.wrapper';
import {
  GALLERY_EDITION_MODE,
  GALLERY_VISUALIZATION_MODE,
} from '../../../utils/constants';
import { ROLE_PROFESSIONAL } from '../../../utils/roles.constants';
import { format } from '../../../utils/utils';
import ContentDialog from '../../dialog/content.dialog';
import ImgUploader from '../../images/img-uploader/img-uploader';
import MyGallery from '../../images/my-gallery/my-gallery';
import './shop.admin.css';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { AlertDialog } from '../../dialog/alert.dialog';
import { LoadingWrapper } from '../../loading/loading';
import ShopService from '../../../service/shop.service';
import { useHistory, useParams } from 'react-router-dom';
import useSnackBars from '../../snackbar/use-snackbar';
import { dispatchCustomEvent } from '../../../utils/utils';
import { CUSTOM_EVT_IMG_UPLOADER_UPLOAD } from '../../../utils/events-custom.constants';
import { updateVistedShop } from '../../../redux/action/shop.actions';
import './shop.admin.css';
import DoneAllIcon from '@material-ui/icons/DoneAll';

export default function ShopAdminGallery(props) {
  const { t } = useTranslation();
  // indicate when dialog add image should pop
  const [open, setOpen] = useState(false);
  // get max authorized image from redux store
  const maxImageForShop = useSelector(getMaxImageForShopSelector);
  // gallery mode
  const [mode, setMode] = useState(GALLERY_VISUALIZATION_MODE);
  // track selected images in parent component
  const [selected, setSelected] = useState(() => []);
  // deletion popup opening flag
  const [isDeletionPopupOpen, setIsDeletionPopupOpen] = useState(false);
  // loading flag
  const [isLoading, setIsLoading] = useState(false);
  // shop id
  const { id } = useParams();
  // snackbar
  const { showSnack } = useSnackBars();
  // dispatch action to redux store
  const dispatch = useDispatch();
  // history hook (for redirection)
  const history = useHistory();

  useEffect(() => {
    if (!props.metadata || props.metadata.length === 0) {
      setMode(GALLERY_EDITION_MODE);
    }
  });
  // handle alert according to how many image are uploaded
  //and how many more user can upload
  const handleAlert = () => {
    if (maxImageForShop - props.metadata.length > 0) {
      return (
        <Alert severity="info">
          {format(t('feedback.shopRemainingImage'), [
            (maxImageForShop - props.metadata.length).toString(),
          ])}
        </Alert>
      );
    }

    return (
      <Alert severity="warning">{t('feedback.shopNoRemainingImage')}</Alert>
    );
  };

  /**
   * upload the image to backend
   */
  const proceed = () => {
    if (document.querySelector('#uploadImage').value) {
      dispatchCustomEvent('#uploadImage', CUSTOM_EVT_IMG_UPLOADER_UPLOAD);
    }
  };

  /**
   * switch between visualization mode and edition mode
   * edition allows you to upload photo, delete photos..
   *
   */
  const switchMode = () => {
    setMode(
      mode === GALLERY_VISUALIZATION_MODE
        ? GALLERY_EDITION_MODE
        : GALLERY_VISUALIZATION_MODE
    );
    setSelected((prev) => []);
  };

  /**
   *
   * @param {boolean} add flag set true when update operation is addition of
   * new image to selected list
   * @param {string} image name to add
   */
  const updateSelected = (add, imgName) => {
    console.info('valeur d avant' + selected);
    if (add) {
      setSelected((prev) => [...prev, imgName]);
    } else {
      setSelected((prev) => prev.filter((i) => i !== imgName));
    }
  };

  /**
   * delete selected image list
   * and update the detail object after refreshing
   */
  const deleteImage = () => {
    setIsLoading(true);
    ShopService.deleteImages(id, selected)
      .then(() => {
        setSelected((old) => []);
        ShopService.proShopDetail(id)
          .then((res) => {
            dispatch(updateVistedShop(res.data));
            setIsLoading(false);
            showSnack(t('feedback.operationSucceded'), 'success');
          })
          .catch((err) => history.push('/profile'));
      })
      .catch((err) => {
        showSnack(t('feedback.operationFailed'), 'error');
        setIsLoading(false);
      });
  };

  /**
   * handle image submission to backend and handle return status
   * by giving adequate feedback to user
   * @param {*} data image as data url
   * @param {*} internalCleanup these method is passed by ImgUploader component to do internal
   * cleanup processing
   */
  const uploadImageHandler = (data, internalCleanup) => {
    setIsLoading(true);
    ShopService.addImage(id, data)
      .then(() => {
        ShopService.proShopDetail(id)
          .then((res) => {
            dispatch(updateVistedShop(res.data));
            setIsLoading(false);
            showSnack(t('feedback.imageUploaded'), 'success');
          })
          .catch((err) => history.push('/profile'));
      })
      .catch((err) => {
        showSnack(t('feedback.imageUploadFailed'), 'error');
        setIsLoading(false);
      })
      .finally(() => {
        if (internalCleanup) {
          internalCleanup();
        }
        setOpen(false);
      });
  };

  const updateRootImage = () => {
    setIsLoading(true);
    if (selected && selected.length === 1) {
      ShopService.markAsRoot(id, selected[0]).then(() => {
        ShopService.proShopDetail(id)
          .then((res) => dispatch(updateVistedShop(res.data)))
          .finally(() => setIsLoading(false));
      });
    }
  };

  const handleActions = () => {
    return props.metadata && props.metadata.length > 0 ? (
      <Secured requiredRoles={[ROLE_PROFESSIONAL]}>
        <Grid item className="flex" xs={12} md={12} sm={12}>
          <Button variant="outlined" color="secondary" onClick={switchMode}>
            {mode === GALLERY_VISUALIZATION_MODE
              ? t('components.gallery.editionMode')
              : t('components.gallery.visualizationMode')}
          </Button>
          {mode === GALLERY_EDITION_MODE && selected && selected.length > 0 ? (
            <Button
              variant="outlined"
              color="secondary"
              className="btn-spacing"
              endIcon={<DeleteForeverIcon />}
              onClick={(e) => {
                setIsDeletionPopupOpen(true);
                console.info('normalement oui');
              }}
            >
              {t('actions.delete')}
            </Button>
          ) : null}
          {mode === GALLERY_EDITION_MODE &&
          selected &&
          selected.length === 1 ? (
            <Button
              variant="outlined"
              color="secondary"
              className="btn-spacing"
              endIcon={<DoneAllIcon />}
              onClick={updateRootImage}
            >
              Image de fond
            </Button>
          ) : null}
        </Grid>
      </Secured>
    ) : null;
  };
  return (
    <LoadingWrapper loading={isLoading}>
      <Grid container class="m-t-alt1 jc-center flex">
        {handleAlert()}
      </Grid>
      <Grid container>
        <div className="m-t-alt1 full-width">
          {handleActions()}
          <div className="m-t-alt1">
            <Grid item>
              <MyGallery
                metadata={props.metadata}
                mode={mode}
                updateSelected={updateSelected}
              />
            </Grid>
          </div>
        </div>
        {mode === GALLERY_EDITION_MODE ? (
          <Secured requiredRoles={[ROLE_PROFESSIONAL]}>
            <div className="m-t-alt1 full-width flex jc-f-end">
              <Grid item>
                <Fab
                  color="primary"
                  aria-label="add"
                  className="flex"
                  onClick={(e) => setOpen(true)}
                  disabled={maxImageForShop === props.metadata.length}
                >
                  <AddAPhotoIcon />
                </Fab>
              </Grid>
            </div>
          </Secured>
        ) : null}
      </Grid>

      {/*
         add image dialog (needs role professional.)
         show dialog when add image button is hit
      */}
      {mode === GALLERY_EDITION_MODE ? (
        <Secured requiredRoles={[ROLE_PROFESSIONAL]}>
          <div id="addImagePopup">
            <ContentDialog
              title="Ajouter une image"
              isOpen={open}
              onClose={() => setOpen(false)}
              proceed={proceed}
            >
              <ImgUploader uploadImageHandler={uploadImageHandler} />
            </ContentDialog>
          </div>
          <div id="deleteImagesPopup">
            <AlertDialog
              isOpen={isDeletionPopupOpen}
              onCancel={() => setIsDeletionPopupOpen(false)}
              onContinue={deleteImage}
              textContent={format(t('feedback.imgDeletionWarning'), [
                selected.length,
              ])}
            />
          </div>
        </Secured>
      ) : null}
    </LoadingWrapper>
  );
}
