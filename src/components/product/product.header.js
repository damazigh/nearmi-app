import { makeStyles, Paper, useTheme } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import MobileStepper from '@material-ui/core/MobileStepper';
import ShopService from '../../service/shop.service';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: '100%',
    flexGrow: 1,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    height: 50,
    paddingLeft: theme.spacing(4),
    backgroundColor: theme.palette.background.default,
  },
  img: {
    height: 200,
    display: 'block',
    minWidth: '100%',
    overflow: 'hidden',
    width: '100%',
  },
}));

export default function ProductHeader(props) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = props.shop.metadata.length;
  const history = useHistory();
  const theme = useTheme();
  const { id } = useParams();
  const loadedImage = [];

  useEffect(() => {
    if (!props.shop) {
      history.push('/profile');
    }
  }, []);
  const loadImage = (id, meta) => {
    if (loadedImage.some((cached) => cached.meta === meta)) {
      return loadedImage.find((cached) => cached.meta === meta).image;
    } else {
      const img = (
        <img
          className={classes.img}
          src={ShopService.buildImagePath(id, meta)}
        />
      );
      loadedImage.push({ meta: meta, image: img });
      return img;
    }
  };

  return <div></div>;
}
