import React from 'react';

import {
  Divider,
  InputBase,
  makeStyles,
  Paper,
  IconButton,
  Grid,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import LocationOn from '@material-ui/icons/LocationOn';
import './main.css';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: '50%',
  },
  input: {
    margin: theme.spacing(2),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

export default function Main() {
  const classes = useStyles();
  return (
    <Grid xs={12}>
      <Paper elevation={5} className="flex root addr">
        <InputBase
          className={classes.input}
          placeholder="Search address"
          inputProps={{ 'aria-label': 'search address' }}
        />
        <IconButton type="submit" color="primary" aria-label="search">
          <LocationOn />
        </IconButton>
        <Divider className="divider" orientation="vertical" />

        <IconButton type="submit" color="primary" aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
    </Grid>
  );
}
