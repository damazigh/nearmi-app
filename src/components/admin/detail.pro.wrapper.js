import { Grid } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import CategoryIcon from '@material-ui/icons/Category';
import ImageIcon from '@material-ui/icons/Image';
import ListIcon from '@material-ui/icons/List';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import ShopService from '../../service/shop.service';
import { LoadingWrapper } from '../loading/loading';
import ListProduct from '../product/list.product';
import ShopCategoryProduct from '../shop/detail/category-product.shop.detail';
import ShopAdminGallery from '../shop/detail/gallery.shop.detail';

export default function DetailProWrapper({ detail }) {
  const [value, setValue] = useState(0);
  const history = useHistory();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const displayContent = () => {
    switch (value) {
      case 0:
        return <ListProduct detail={detail} />;
      case 1:
        return (
          <ShopAdminGallery
            metadata={detail.metadata}
            buildSrc={ShopService.buildImagePath}
          />
        );
      case 2:
        return <ShopCategoryProduct detail={detail} />;
    }
  };

  return (
    <LoadingWrapper loading={!detail} className="container">
      <Grid container md={12} xs={12}>
        <Grid item md={12} xs={12}>
          <Paper square className="m-t-alt2 full-width">
            <Tabs
              value={value}
              onChange={handleChange}
              variant="fullWidth"
              indicatorColor="primary"
              textColor="primary"
              aria-label="icon tabs example"
            >
              <Tab icon={<ListIcon />} aria-label="phone" />
              <Tab icon={<ImageIcon />} aria-label="favorite"></Tab>
              <Tab icon={<CategoryIcon />} aria-label="person" />
            </Tabs>
          </Paper>
        </Grid>
        <Grid item xs={12} md={12}>
          {displayContent()}
        </Grid>
      </Grid>
    </LoadingWrapper>
  );
}
