import React from 'react';
import Gallery from '../../images/gallery/gallery';
import ShopService from '../../../service/shop.service';
import { Grid } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useTranslation } from 'react-i18next';
import { format } from '../../../utils/utils';
import { useSelector } from 'react-redux';
import { getMaxImageForShopSelector } from '../../../redux/selector/shop.selector';

export default function ShopAdminGallery(props) {
  const { t } = useTranslation();
  const maxImageForShop = useSelector(getMaxImageForShopSelector);

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
      <Alert severity="warning">
        vous ne pouvez plus ajouter d'image, pour pouvoir en ajouter supprimer
        d'abord une de vos anciennes images
      </Alert>
    );
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
      </Grid>
    </>
  );
}
