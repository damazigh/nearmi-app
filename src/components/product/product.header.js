import { Grid, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ShopService from '../../service/shop.service';
import './product.css';
export default function ProductHeader({ detail }) {
  const { id } = useParams();

  return (
    <Grid container>
      <Grid item xs={12} md={12} sm={12} className="img-header-wrapper">
        {detail &&
          detail.metadata &&
          detail.metadata
            .filter((m) => m.root === true)
            .map((m) => (
              <div
                style={{
                  backgroundImage: `url(${ShopService.buildImagePath(
                    id,
                    m.name
                  )})`,
                  minWidth: '100%',
                  height: '100%',
                  backgroundRepeat: 'round',
                }}
              >
                {/** container for image loaded with backgroud-img css directive */}
              </div>
            ))}
      </Grid>
      <Grid item className="container">
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
