import { Grid, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ShopService from '../../service/shop.service';

export default function ProductHeader({ detail }) {
  const { id } = useParams();

  return (
    <Grid container>
      <Grid item xs={12} md={12} sm={12}>
        {detail &&
          detail.metadata &&
          detail.metadata
            .filter((m) => m.root === true)
            .map((m) => (
              <img
                src={ShopService.buildImagePath(id, m.name)}
                className="full-height full-width"
              />
            ))}
      </Grid>
      <Grid>
        <Typography gutterBottom variant="h5" component="h1">
          {detail?.name}
        </Typography>

        <Typography variant="body2" color="textSecondary" component="p">
          {detail?.description}
        </Typography>
      </Grid>
    </Grid>
  );
}
