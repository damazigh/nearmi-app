import { Grid } from '@material-ui/core';
import React, { useEffect } from 'react';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { useParams } from 'react-router-dom';

export default function Gallery(props) {
  const { id } = useParams();
  return (
    <div>
      <Grid container xs={12} md={12}>
        {props.metadata.map((m) => (
          <Grid item xs={12} md={m.root ? 9 : 6}>
            <img src={props.buildSrc(id, m.name)} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
