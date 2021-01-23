import { Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import ShopCard from '../../components/shop/card/shop.card';
import ShopService from '../../service/shop.service';

export default function NearbyShop() {
  let [items, setItems] = useState([]);

  useEffect(() => {
    ShopService.search()
      .then((res) => {
        console.log(res);
        setItems(res.data);
      })
      .catch((err) => {
        console.log(err);
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
      <Grid container>{buildItems()}</Grid>
      <span>toto</span>
    </>
  );
}
