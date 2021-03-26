import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AnchorDrawer from '../../components/drawer/anchor.drawer';
import { toolbarMenuIconDisplay } from '../../redux/action/account.action';
import { shouldDisplaytoolbarMenuIcon } from '../../redux/selector/account.selector';
import { useParams } from 'react-router-dom';
import ShopService from '../../service/shop.service';
import { LoadingWrapper } from '../../components/loading/loading';
import ProductHeader from '../../components/product/product.header';
import { Divider, Grid, Paper, Typography } from '@material-ui/core';
import './shop.css';
import { Alert } from '@material-ui/lab';
import { useTranslation } from 'react-i18next';
import DetailProWrapper from '../../components/admin/detail.pro.wrapper';
import useSnackBars from '../../components/snackbar/use-snackbar';
import { updateVistedShop } from '../../redux/action/shop.actions';
import { getVisitedShopSelector } from '../../redux/selector/shop.selector';

export default function DetailShop() {
  const dispatch = useDispatch();
  const menuIconDisplayed = useSelector(shouldDisplaytoolbarMenuIcon);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const { t } = useTranslation();
  const { showSnack } = useSnackBars();
  const detail = useSelector(getVisitedShopSelector);

  useEffect(() => {
    if (!menuIconDisplayed) {
      dispatch(toolbarMenuIconDisplay(true));
    }
    ShopService.proShopDetail(id)
      .then((res) => dispatch(updateVistedShop(res.data)))
      .catch((err) => showSnack(t('feedback.fetchDataInternalError'), 'error'))
      .finally(() => setLoading(false));
  }, []);

  const build = (txt, id) => {
    return { text: txt, id: id };
  };
  return (
    <>
      <LoadingWrapper loading={loading}>
        <div id="content" className="flex hdr-txt-tm">
          <header>
            <Grid container className="dir-row-reverse">
              <Grid item xs={12} sm={4} md={4} className="flex-end">
                <ProductHeader shop={detail} />
              </Grid>
              <Grid
                item
                xs={12}
                md={8}
                sm={8}
                className="header-side-margin hdr-txt-mx-h"
              >
                <Typography gutterBottom variant="h5" component="h1">
                  {detail?.name}
                </Typography>

                <Typography variant="body2" color="textSecondary" component="p">
                  {detail?.description}
                </Typography>
              </Grid>
            </Grid>
          </header>
        </div>
        <Grid container md={12} sm={12} className="m-t-alt1 header-side-margin">
          <Grid item md={12} xs={12} className="flex jc-center m-t-alt2">
            <DetailProWrapper detail={detail} />
          </Grid>
        </Grid>
        <AnchorDrawer
          direction="bottom"
          items={[
            build('Catégorie 1', 'id1'),
            build('Catégorie 2', 'id2'),
            build('Catégorie 3', 'id3'),
            build('Catégorie 4', 'id4'),
          ]}
        />
      </LoadingWrapper>
    </>
  );
}
