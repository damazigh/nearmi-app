import {
  List,
  ListItem,
  ListItemText,
  makeStyles,
  SwipeableDrawer,
} from '@material-ui/core';
import React, { useState } from 'react';
import clsx from 'clsx';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toolbarMenuIconClick } from '../../redux/selector/account.selector';
import { toolbarMenuIconHandled } from '../../redux/action/account.action';

const useStyles = makeStyles({
  fullList: {
    width: 'auto',
  },
});

export default function AnchorDrawer(props) {
  const classes = useStyles();
  const history = useHistory();
  const open = useSelector(toolbarMenuIconClick);
  const dispatch = useDispatch();

  const handleOnClick = (id) => {
    history.push(`#${id}`);
    dispatch(toolbarMenuIconHandled());
  };

  const list = () => {
    return (
      <div
        role="presentation"
        onClick={(e) => dispatch(toolbarMenuIconHandled())}
      >
        <List>
          {props.items.map((item, i) => {
            return (
              <ListItem
                button
                key={i}
                onClick={(e) => handleOnClick(item.text)}
              >
                <ListItemText>{item.text}</ListItemText>
              </ListItem>
            );
          })}
        </List>
      </div>
    );
  };

  return (
    <React.Fragment>
      <SwipeableDrawer anchor={props.direction} open={open}>
        {list()}
      </SwipeableDrawer>
    </React.Fragment>
  );
}
