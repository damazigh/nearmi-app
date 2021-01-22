import Address from '../../address/address';
import React from 'react';
import { Grow } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { addressSelector } from '../../../redux/selector/shop.selector';
import { useFormContext } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';

export default function AddressStep(props) {
  const methods = useFormContext();
  const address = useSelector(addressSelector);
  const { register, control } = methods;

  /***
   * update input label
   */
  const updateAddress = () => {
    if (address) {
      sessionStorage.setItem('step_2', JSON.stringify(address));
    }
    return address?.line1;
  };
  return (
    <Grow in={true}>
      <form>
        <DevTool control={control} />
        <Address />
        <input
          className="d-none"
          name="address"
          value={updateAddress()}
          ref={register({ required: true })}
        />
      </form>
    </Grow>
  );
}
