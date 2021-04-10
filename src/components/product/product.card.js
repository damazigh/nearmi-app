import { Card, CardContent, Grid } from '@material-ui/core';
import React from 'react';

export default function ProductCard({ role }) {
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card variant="outlined">
        <CardContent>
          <p>salut merde, merde, fiote fiote...</p>
        </CardContent>
      </Card>
    </Grid>
  );
}
