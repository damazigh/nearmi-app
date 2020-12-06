import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import PersonIcon from '@material-ui/icons/Person';
import { Grid } from '@material-ui/core';
import Account from '../account/account';
import NavItem from './navitem';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    color: 'var(--color-primary)',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function Navbar() {
  const classes = useStyles();
  const buildIconBtn = (icon) => {
    return <IconButton>{icon}</IconButton>;
  };
  return (
    <div className={classes.root}>
      <AppBar
        position="static"
        style={{ backgroundColor: 'var(--color-appbar)' }}
      >
        <Toolbar>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <IconButton
                edge="start"
                className={classes.menuButton}
                aria-label="menu"
              >
                <MenuIcon />
              </IconButton>
            </Grid>

            <Grid item xs={6} className="flex justify-end">
              <NavItem icon={buildIconBtn(<PersonIcon />)}>
                <Account />
              </NavItem>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;
