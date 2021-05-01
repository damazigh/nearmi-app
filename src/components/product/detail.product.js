import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Paper,
  Typography,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Carousel from 'react-material-ui-carousel';
import { useParams } from 'react-router-dom';
import { LoadingHiddenWrapper, LoadingWrapper } from '../loading/loading';
import ProductService from '../../service/product.service';
import './detail.product.css';
import { getVisitedShopSelector } from '../../redux/selector/shop.selector';

export default function ProductDetail() {
  const { id, productName } = useParams();
  const [product, setProduct] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);
  const visitedShop = useSelector(getVisitedShopSelector);

  //
  const ITEM_PER_ROW = 3;
  const RESERVED_GRID_SIZE = 12 / ITEM_PER_ROW;

  useEffect(() => {
    ProductService.getProductByName(id, productName)
      .then((res) => {
        setProduct(res.data);
        console.info(res.data);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const buildBannerItems = () => {
    const totalWidth = product.metadata.reduce((a, b) => a.width + b.width);
    const groups = [];
    for (let i = 0; i <= product.metadata.length - 2; i = i + 2) {
      const group = {};
      group.name = product.name;
      group.caption = product.description;
      group.price = product.price;
      group.items = [];
      for (let j = 0; j < 2; j++) {
        const meta = product.metadata[i + j];
        const item = {};
        item.name = meta.name;
        item.caption = 'Goku san !';
        item.gridSize = (meta.width * (12.0 - RESERVED_GRID_SIZE)) / totalWidth;
        item.image = ProductService.buildProductImgSrc(
          id,
          productName,
          meta.name
        );
        group.items.push(item);
      }
      groups.push(group);
    }
    return groups;
  };

  return (
    <LoadingWrapper loading={isLoading}>
      <Grid container>
        <Grid item xs={12} sm={12} md={12}>
          <Carousel
            animation="slide"
            timeout={1000}
            autoPlay={false}
            indicators={true}
            cycleNavigation={true}
          >
            {product &&
              product.metadata &&
              buildBannerItems().map((item) => (
                <Banner
                  group={item}
                  contentPosition="right"
                  reservedGridSize={RESERVED_GRID_SIZE}
                />
              ))}
          </Carousel>
          <p>qsdqsd</p>
        </Grid>
      </Grid>
    </LoadingWrapper>
  );
}

function Banner({ group, contentPosition = 'left', reservedGridSize }) {
  let items = [];
  const content = (
    <Grid item xs={reservedGridSize} md={reservedGridSize} key="content">
      <CardContent className="Content">
        <Typography className="Title">
          {group.name} - {group.price} €
        </Typography>
        <Typography className="Title">{}</Typography>
        <Typography className="Caption">{group.caption}</Typography>

        <Button variant="outlined" className="ViewButton">
          Add to panel
        </Button>
      </CardContent>
    </Grid>
  );

  for (let i = 0; i < group.items.length; i++) {
    const item = group.items[i];

    const media = (
      <Grid item xs={4} key={item.name}>
        <CardMedia class="Media" image={item.image}>
          <Typography className="MediaCaption">{item.caption}</Typography>
        </CardMedia>
      </Grid>
    );

    items.push(media);
  }

  if (contentPosition === 'left') {
    items.unshift(content);
  } else if (contentPosition === 'right') {
    items.push(content);
  } else if (contentPosition === 'middle') {
    items.splice(items.length / 2, 0, content);
  }

  return (
    <Card raised className="Banner">
      <Grid container spacing={0} className="BannerGrid">
        {items}
      </Grid>
    </Card>
  );
}
