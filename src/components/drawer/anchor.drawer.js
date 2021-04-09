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
import { navigateToAnchor } from '../../utils/utils';
import { HashLink } from 'react-router-hash-link';

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
    //navigateToAnchor(id);
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
                <HashLink
                  to={`${document.location.pathname}#${item.text}`}
                  className="unstyle-link"
                >
                  <ListItemText>{item.text}</ListItemText>
                </HashLink>
              </ListItem>
            );
          })}
        </List>
      </div>
    );
  };

  return (
    <React.Fragment>
      <SwipeableDrawer
        anchor={props.direction}
        open={open}
        hideBackdrop={true}
        onClick={() => dispatch(toolbarMenuIconHandled())}
        onOpen={() => {}}
      >
        {list()}
      </SwipeableDrawer>
    </React.Fragment>
  );
}
