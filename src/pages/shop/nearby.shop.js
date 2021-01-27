import { CircularProgress, Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ShopCard from '../../components/shop/card/shop.card';
import useSnackBars from '../../components/snackbar/use-snackbar';
import ShopService from '../../service/shop.service';

export default function NearbyShop() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { showSnack } = useSnackBars();
  const { t } = useTranslation();

  useEffect(() => {
    ShopService.search()
      .then((res) => {
        setItems(res.data);
      })
      .catch((_err) => {
        showSnack(t('feedback.searhShopFetchError'), 'error');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const buildItems = () => {
    const res = [];
    for (let i in items) {
      const built = <ShopCard item={items[i]} />;
      console.log(items[i]);
      res.push(built);
    }
    return res;
  };
  return (
    <>
      {(() => {
        if (!loading) {
          return (
            <Grid container alignItems="stretch">
              {buildItems()}
            </Grid>
          );
        } else {
          return (
            <div className="jc-center flex m-t-alt1">
              <CircularProgress color="secondary" />
            </div>
          );
        }
      })()}
    </>
  );
}
