import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@material-ui/core';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import './shop.card.css';

export default function ShopCard(props) {
  const [expanded, setExpanded] = useState(false);
  const { t } = useTranslation();

  return (
    <Grid item xs={12} md={4} sm={4}>
      <Card className="m-top m-right">
        <CardActionArea>
          <CardMedia
            title="presentation image"
            image="/image-test.jpg"
            className="img-height"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {props.item.name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {props.item.description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
}
