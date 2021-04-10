import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AnchorDrawer from '../../components/drawer/anchor.drawer';
import { toolbarMenuIconDisplay } from '../../redux/action/account.action';
import { shouldDisplaytoolbarMenuIcon } from '../../redux/selector/account.selector';
import { useParams } from 'react-router-dom';
import ShopService from '../../service/shop.service';
import { LoadingWrapper } from '../../components/loading/loading';
import ProductHeader from '../../components/product/product.header';
import { Grid, Typography } from '@material-ui/core';
import './shop.css';
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

  const buildCat = () => {
    if (
      detail &&
      detail.productCategories &&
      detail.productCategories.length > 0
    ) {
      console.log(detail.productCategories);
      return detail.productCategories
        .sort((a, b) => (a.order < b.order ? -1 : a.order === b.order ? 0 : 1))
        .map((a) => ({ text: a.name }));
    }

    return [];
  };
  return (
    <>
      <LoadingWrapper loading={loading}>
        <div id="content" className="flex full-width hdr-txt-tm">
          <header className="full-width">
            <ProductHeader detail={detail} />
          </header>
        </div>
        <Grid
          container
          md={12}
          sm={12}
          className="m-t-alt1 header-side-margin container"
        >
          <Grid item md={12} xs={12} className="flex jc-center m-t-alt2">
            <DetailProWrapper detail={detail} />
          </Grid>
        </Grid>
        <AnchorDrawer direction="bottom" items={buildCat()} />
      </LoadingWrapper>
    </>
  );
}
