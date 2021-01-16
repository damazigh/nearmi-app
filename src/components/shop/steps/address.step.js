import Address from '../../address/address';
import React from 'react';
import { Grow } from '@material-ui/core';

export default function AddressStep(props) {
  return (
    <Grow>
      <Address />
    </Grow>
  );
}
