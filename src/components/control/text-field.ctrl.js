import { TextField } from '@material-ui/core';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

/**
 * @param props :
 * <pre>
 *   <code>
 *     {
 *       "name": "input name attribute",
 *       "props": "other props passed to target textfield"
 *     }
 *   </code
 * </pre>
 */
export default function TextFieldControl(props) {
  const { errors } = useFormContext();
  const { name } = props;
  const hasError = () => {
    return !!errors[name];
  };
  const errorMsg = () => {
    console.log(errors);
    if (errors[name] && errors[name].type && props.messages) {
      return props.messages[errors[name].type];
    }
  };

  const changeHandler = (e) => {
    if (props.onChange) {
      props.onChange(e);
    }
    //
  };

  return (
    <Controller
      name={props.name}
      rules={props.rules}
      defaultValue={props.defaultValue ? props.defaultValue : ''}
      render={(p) => (
        <TextField
          {...props}
          error={hasError()}
          helperText={errorMsg()}
          {...p}
          onChange={(e) => {
            p.onChange(e);
            changeHandler(e);
          }}
          value={props.value ? props.value : p.value}
        />
      )}
    />
  );
}
