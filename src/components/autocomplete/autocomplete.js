import React from 'react';
import { MenuItem, Paper, Popper } from '@material-ui/core';
import './autocomplete.css';
/**
 *
 * @param props {
 * open : {is the poper visible or not}
 * } props
 */
export default function Autocomplete(props) {
  return (
    <Popper
      open={props.open}
      anchorEl={props.anchorEl}
      container={props.container}
      className={props.className}
    >
      <Paper elevation={8} className="ac-paper">
        {props.children}
      </Paper>
    </Popper>
  );
}
