import React, { useState } from 'react';
import Gallery from '../../images/gallery/gallery';
import ShopService from '../../../service/shop.service';
import { Fab, Grid } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useTranslation } from 'react-i18next';
import { format } from '../../../utils/utils';
import { useSelector } from 'react-redux';
import { getMaxImageForShopSelector } from '../../../redux/selector/shop.selector';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import './shop.admin.css';
import { ROLE_PROFESSIONAL } from '../../../utils/roles.constants';
import Secured from '../../../security/secured.wrapper';
import ImgUploader from '../../images/img-uploader/img-uploader';
import ContentDialog from '../../dialog/content.dialog';
import { useParams } from 'react-router-dom';
import useSnackBars from '../../snackbar/use-snackbar';

export default function ShopAdminGallery(props) {
  const { t } = useTranslation();
  // indicate when dialog add image should pop
  const [open, setOpen] = useState(false);
  // notify cropper to crop actual state and update croppedImg props with actual data
  const [crop, setCrop] = useState(false);
  // get max authorized image from redux store
  const maxImageForShop = useSelector(getMaxImageForShopSelector);
  const { id } = useParams();
  const { showSnack } = useSnackBars();

  // handle alert according to how many image are uploaded
  //and how many more user can upload
  const handleAlert = () => {
    console.info(props.metadata.length);
    console.info(maxImageForShop);

    if (maxImageForShop - props.metadata.length > 0) {
      return (
        <Alert severity="info">
          {format(
            t('feedback.shopRemainingImage'),
            (maxImageForShop - props.metadata.length).toString()
          )}
        </Alert>
      );
    }

    return (
      <Alert severity="warning">{t('feedback.shopNoRemainingImage')}</Alert>
    );
  };

  const proceed = () => {
    if (document.querySelector('#uploadImage').value) {
      setCrop(true);
      const cropped = JSON.parse(sessionStorage.getItem('cropped'));
      ShopService.addImage(id, cropped).then((res) =>
        showSnack('Image ajoutée avec succès', 'success')
      );
    }
  };
  return (
    <>
      <Grid container className="m-t-alt1 jc-center">
        {handleAlert()}
        <div className="m-t-alt1">
          <Grid item>
            <Gallery
              metadata={props.metadata}
              buildSrc={ShopService.buildImagePath}
            />
          </Grid>
        </div>
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
      </Grid>

      {/*
         add image dialog (needs role professional.)
         show dialog when add image button is hit
      */}
      <div>
        <Secured requiredRoles={[ROLE_PROFESSIONAL]}>
          <ContentDialog
            title="Ajouter une image"
            isOpen={open}
            onClose={() => setOpen(false)}
            proceed={() => proceed()}
          >
            <ImgUploader crop={crop} />
          </ContentDialog>
        </Secured>
      </div>
    </>
  );
}
