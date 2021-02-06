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

export default function DetailShop() {
  const [detail, setDetail] = useState(null);
  const dispatch = useDispatch();
  const menuIconDisplayed = useSelector(shouldDisplaytoolbarMenuIcon);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const { t } = useTranslation();

  useEffect(() => {
    if (!menuIconDisplayed) {
      dispatch(toolbarMenuIconDisplay(true));
    }
    ShopService.proShopDetail(id)
      .then((res) => setDetail(res.data))
      .finally(() => setLoading(false));
  }, []);

  const build = (txt, id) => {
    return { text: txt, id: id };
  };
  return (
    <>
      <LoadingWrapper loading={loading}>
        <div id="content" className="flex">
          <header>
            <Grid container className="dir-row-reverse">
              <Grid item xs={12} sm={5} md={5} className="flex-end">
                <ProductHeader shop={detail} />
              </Grid>
              <Grid
                item
                xs={12}
                md={7}
                sm={7}
                className="header-side-margin hdr-txt-tm hdr-txt-mx-h"
              >
                <Typography gutterBottom variant="h5" component="h1">
                  {detail?.name}
                </Typography>

                <Typography variant="body2" color="textSecondary" component="p">
                  {detail?.description}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={12} className="m-t-alt1">
                <Divider />
              </Grid>
            </Grid>
          </header>
        </div>
        <Grid container className="m-t-alt1">
          <Grid item xs={12} md={6} className="flex jc-center">
            <Alert severity="info">
              <p>{t('feedback.shopAdminAlert_1')}</p>
            </Alert>
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
