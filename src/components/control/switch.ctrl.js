import React from 'react';
import { Controller } from 'react-hook-form';
import { Switch } from '@material-ui/core';
export default function SwitchControl(props) {
  const changeHandler = (e) => {
    if (props.onChange) {
      props.onChange(e);
    }
    // do nothing
  };
  return (
    <Controller
      name={props.name}
      rules={props.rules}
      render={(p) => (
        <Switch
          onChange={(e) => {
            p.onChange(e);
            changeHandler(e);
          }}
          {...p}
          {...props}
        />
      )}
    />
  );
}
